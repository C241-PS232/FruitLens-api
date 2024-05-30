require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Start server
const port = config.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
