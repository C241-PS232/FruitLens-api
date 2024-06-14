const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');

// Load the model
let model;
const loadModel = async () => {
    model = await tf.loadLayersModel('file://models/model.json');
    console.log('Model loaded successfully');
};
loadModel();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// Helper function to process and classify the image
const classifyImage = async (filePath) => {
    const imageBuffer = fs.readFileSync(filePath);
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalizedImage = resizedImage.div(255.0).expandDims(0);

    const predictions = await model.predict(normalizedImage).data();
    const labels = ['Apple', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Cucumber', 'Date', 'Grape',
        'Kiwi', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Orange', 'Papaya', 'Pineapple',
        'Rambutan', 'Salak', 'Watermelon', 'Coconut', 'Unknown']; // Update with your labels
    const maxIndex = predictions.indexOf(Math.max(...predictions));
    return labels[maxIndex];
};

// Route to upload and classify image
router.post('/classify', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        const classificationResult = await classifyImage(req.file.path);
        res.json({ result: classificationResult });
    } catch (error) {
        console.error('Error classifying image:', error);
        res.status(500).send('Error classifying image');
    }
});

module.exports = router;
