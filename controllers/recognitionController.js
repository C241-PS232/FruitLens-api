const { spawn } = require('child_process');

exports.recognizeFruit = (req, res) => {
    const imagePath = req.file.path;

    // Call the Python script to process the image
    const process = spawn('python', ['recognize_fruit.py', imagePath]);

    let result = '';
    let errorOccurred = false;

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        if (!errorOccurred) {
            errorOccurred = true;
            res.status(500).json({ error: 'Error processing image' });
        }
    });

    process.on('close', (code) => {
        if (!errorOccurred) {
            // Trim the result to remove any trailing newlines
            result = result.trim();
            res.status(200).json({ result });
        }
    });
};
