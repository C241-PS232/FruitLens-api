const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Route to handle fruit image upload and classification (protected)
router.post('/classify', authenticateToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const pythonScriptPath = path.join(__dirname, '../scripts/classify_fruit.py');

    // Execute the Python script
    exec(`python ${pythonScriptPath} ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Handle potential warnings or other non-JSON outputs in stderr
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
        }

        try {
            // Extract the JSON part from stdout
            const jsonOutput = stdout.split('\n').filter(line => {
                try {
                    JSON.parse(line);
                    return true;
                } catch (e) {
                    return false;
                }
            })[0];
            const result = JSON.parse(jsonOutput);
            res.status(200).json(result);
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            console.error(`Python script output: ${stdout}`);
            res.status(500).json({ error: 'Error parsing response from Python script' });
        } finally {
            // Delete the uploaded file after processing
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                }
            });
        }
    });
});

module.exports = router;
