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
        }
    });
});

router.post('/classify-urlencoded', authenticateToken, (req, res) => {
    const imageUrl = req.body.image_url;
    const pythonScriptPath = path.join(__dirname, '../scripts/classify_fruit.py');

    if (!imageUrl) {
        return res.status(400).json({ error: 'No image URL provided' });
    }

    const imagePath = path.join(__dirname, '../uploads', `${Date.now()}-temp.jpg`);

    // Download the image to a temporary file
    const download = (url, path, callback) => {
        const https = require('https');
        const file = fs.createWriteStream(path);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(callback);
            });
        }).on('error', (err) => {
            fs.unlink(path);
            console.error(`Error downloading image: ${err}`);
            callback(err);
        });
    };

    download(imageUrl, imagePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error downloading image' });
        }

        // Execute the Python script
        exec(`python ${pythonScriptPath} ${imagePath}`, (error, stdout, stderr) => {
            fs.unlink(imagePath, () => {});  // Delete the temporary file

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
            }
        });
    });
});

module.exports = router;
