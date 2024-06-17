const { initializeFirebase, admin } = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Create a new user and save it to the 'users' collection in Firestore.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.createUser = async (req, res) => {
    try {
        const db = await initializeFirebase();
        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { ...req.body, password: hashedPassword };
        await db.collection('users').doc(id).set(user);
        res.status(201).json({ id, ...user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Authenticate a user based on email and password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.loginUser = async (req, res) => {
    try {
        const db = await initializeFirebase();
        const { email, password } = req.body;
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({ email, logged: false, message: 'Email atau kata sandi tidak valid' });
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ email, logged: false, message: 'Email atau kata sandi tidak valid' });
        }
        const token = jwt.sign({ id: userDoc.id, email: user.email }, process.env.JWT_SECRET);

        // Save the token in Firestore
        await db.collection('tokens').doc(token).set({
            valid: true,
            userId: userDoc.id
        });

        res.status(200).json({ email: user.email, logged: true, token });
    } catch (error) {
        res.status(500).json({ email: req.body.email, logged: false, message: error.message });
    }
};

/**
 * Logout a user by deleting the token from Firestore.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.logoutUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    try {
        const db = await initializeFirebase();
        await db.collection('tokens').doc(token).delete(); // Delete the token from Firestore
        res.status(200).json({ message: 'Pengguna berhasil logout' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
