// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to parse x-www-form-urlencoded
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

// Route to get all users (protected)
router.get('/', authenticateToken, userController.getAllUsers);

// Route to create a new user (public)
router.post('/', userController.createUser);

// Route to login a user (public)
router.post('/login', userController.loginUser);

// Route to logout a user (protected)
router.post('/logout', authenticateToken, userController.logoutUser);

module.exports = router;
