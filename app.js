require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const recognitionRoutes = require('./routes/recognitionRoutes');
const config = require('./config/config');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/recognition', recognitionRoutes); // Add this line

// Start the server
const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
