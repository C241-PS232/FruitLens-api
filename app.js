require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const fruitRoutes = require('./routes/fruitRoutes');
const config = require('./config/config');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the user routes
app.use('/api/users', userRoutes);

// Use the fruit routes
app.use('/api/fruits', fruitRoutes);

// Start the server
const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
