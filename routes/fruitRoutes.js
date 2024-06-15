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

let model;

const loadModelFromGCS = async () => {
    try {
        const modelDir = path.join('/tmp', 'models');
        const modelFilePath = path.join(modelDir, 'model.json');
        const weightsFilePath = path.join(modelDir, 'weights.bin');

        // Ensure the model directory exists
        if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir);
        }

        console.log('Downloading model files from GCS...');
        await storage.bucket(bucketName).file(modelPath).download({ destination: modelFilePath });
        await storage.bucket(bucketName).file(weightsPath).download({ destination: weightsFilePath });

        console.log('Loading model...');
        model = await tf.loadLayersModel(`file://${modelFilePath}`);
        console.log('Model loaded successfully from GCS');
    } catch (error) {
        console.error('Error loading model from GCS:', error);
    }
};

// Load the model at startup
loadModelFromGCS().catch(console.error);

// Multer setup to store files temporarily in memory
const upload = multer({ storage: multer.memoryStorage() });

const classifyImage = async (filePath) => {
    if (!model) {
        throw new Error('Model not loaded');
    }

    try {
        const imageBuffer = fs.readFileSync(filePath);
        const imageTensor = tf.node.decodeImage(imageBuffer);
        const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
        const normalizedImage = resizedImage.div(255.0).expandDims(0);

        console.log('Classifying image...');
        const predictions = await model.predict(normalizedImage).data();
        const labels = ['Apple', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Cucumber', 'Date', 'Grape',
            'Kiwi', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Orange', 'Papaya', 'Pineapple',
            'Rambutan', 'Salak', 'Watermelon', 'Coconut', 'Durian', 'Unknown']; // Updated with Durian
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

    const tempFilePath = path.join('/tmp', `${uuidv4()}_${req.file.originalname}`);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    try {
        console.log('Classifying uploaded image...');
        const classificationResult = await classifyImage(tempFilePath);
        const fruitInfo = getFruitInfo(classificationResult);
        const db = await initializeFirebase();

        console.log('Storing classification result in Firestore...');
        const uploadId = uuidv4();
        const uploadRef = db.collection('users').doc(userId).collection('uploads').doc(uploadId);

        await uploadRef.set({
            fileName: req.file.originalname,
            classification: classificationResult,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            fruitInfo
        });

        const translatedResult = {
            hasil: classificationResult,
            informasi_buah: fruitInfo,
            id_upload: uploadId
        };

        res.json(translatedResult);

        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error('Error processing upload:', error);
        console.error(error.stack);
        res.status(500).send('Error processing upload');
    }
});

module.exports = router;
