/**
 * This file handles routing for user operations.
 * Uses Express to set up routes and connects them to the user controller.
 */

const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to parse x-www-form-urlencoded
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Route to create a new user (public).
 * Does not require token authentication.
 */
router.post('/register', userController.createUser);

/**
 * Route for user login (public).
 * Does not require token authentication.
 */
router.post('/login', userController.loginUser);

/**
 * Route for user logout (protected).
 * Requires token authentication to access.
 */
router.post('/logout', authenticateToken, userController.logoutUser);

module.exports = router;
