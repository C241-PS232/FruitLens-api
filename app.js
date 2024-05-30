require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Start the server
const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
