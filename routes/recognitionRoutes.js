const express = require('express');
const recognitionController = require('../controllers/recognitionController'); // Correct path
const upload = require('../middlewares/uploadMiddleware'); // Correct path

const router = express.Router();

// Route to handle image upload and recognition
router.post('/recognize', upload.single('image'), recognitionController.recognizeFruit);

module.exports = router;
