const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to create a new user
router.post('/', userController.createUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to logout a user
router.post('/logout', userController.logoutUser);

module.exports = router;
