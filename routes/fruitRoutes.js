const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { initializeFirebase, admin } = require('../firebase/firebase');
const authenticateToken = require('../middlewares/authMiddleware');
const { getFruitInfo } = require('../controllers/fruitController');

const router = express.Router();
const storage = new Storage();
const bucketName = 'fruitlens-testing';
const modelPath = 'models/model.json';
const weightsPath = 'models/weights.bin';
const metadataPath = 'models/metadata.json';

let model;
let labels = [];

/**
 * Function to download and load the model and metadata from Google Cloud Storage (GCS).
 * The model will be stored in a temporary directory and loaded into the application.
 */
const loadModelFromGCS = async () => {
    try {
        const modelDir = path.join(__dirname, '..', 'tmp', 'models');
        const modelFilePath = path.join(modelDir, 'model.json');
        const weightsFilePath = path.join(modelDir, 'weights.bin');
        const metadataFilePath = path.join(modelDir, 'metadata.json');

        // Ensure the model directory exists
        if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, { recursive: true });
        }

        console.log('Downloading model files from GCS...');
        await storage.bucket(bucketName).file(modelPath).download({ destination: modelFilePath });
        await storage.bucket(bucketName).file(weightsPath).download({ destination: weightsFilePath });
        await storage.bucket(bucketName).file(metadataPath).download({ destination: metadataFilePath });

        console.log('Loading model...');
        model = await tf.loadLayersModel(`file://${modelFilePath}`);
        console.log('Model successfully loaded from GCS');

        console.log('Loading metadata...');
        const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
        labels = metadata.labels;
        console.log('Metadata successfully loaded');
    } catch (error) {
        console.error('Error loading model from GCS:', error);
    }
};

// Load the model at startup
loadModelFromGCS().catch(console.error);

// Multer setup to store files temporarily in memory
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Function to classify an uploaded image.
 * @param {string} filePath - Path of the image file to be classified.
 * @returns {string} - Label of the classification result.
 */
const classifyImage = async (filePath) => {
    if (!model) {
        throw new Error('Model not loaded');
    }

    try {
        const imageBuffer = fs.readFileSync(filePath);
        const imageTensor = tf.node.decodeImage(imageBuffer);

        // Convert image to 3 channels if it has 4 channels
        let rgbImageTensor;
        if (imageTensor.shape[2] === 4) {
            rgbImageTensor = imageTensor.slice([0, 0, 0], [-1, -1, 3]);  // Slice out the first 3 channels (R, G, B)
        } else {
            rgbImageTensor = imageTensor;
        }

        const resizedImage = tf.image.resizeBilinear(rgbImageTensor, [224, 224]);
        const normalizedImage = resizedImage.div(255.0).expandDims(0);

        console.log('Classifying image...');
        const predictions = await model.predict(normalizedImage).data();
        const maxIndex = predictions.indexOf(Math.max(...predictions));
        return labels[maxIndex];
    } catch (error) {
        console.error('Error classifying image:', error);
        throw error;
    }
};

// Protect the route with authenticateToken middleware
router.post('/classify', authenticateToken, upload.single('image'), async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        console.error('User ID not found in token');
        return res.status(400).send('User ID not found in token');
    }

    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send('No file uploaded');
    }

    const tempFilePath = path.join(__dirname, '..', 'tmp', `${uuidv4()}_${req.file.originalname}`);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    try {
        console.log('Classifying uploaded image...');
        const classificationResult = await classifyImage(tempFilePath);
        const fruitInfo = getFruitInfo(classificationResult) || {};

        const db = await initializeFirebase();

        console.log('Storing classification result in Firestore...');
        const uploadId = uuidv4();
        const uploadRef = db.collection('users').doc(userId).collection('uploads').doc(uploadId);

        await uploadRef.set({
            fileName: req.file.originalname,
            classification: classificationResult,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            fruitInfo: {
                ...fruitInfo
            }
        });

        res.json({ result: classificationResult, fruitInfo, uploadId });

        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error('Error processing upload:', error);
        console.error(error.stack);
        res.status(500).send('Error processing upload');
    }
});

module.exports = router;
