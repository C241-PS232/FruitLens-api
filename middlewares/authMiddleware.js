const jwt = require('jsonwebtoken');
const { initializeFirebase } = require('../firebase/firebase');

/**
 * Middleware to authenticate JWT tokens.
 * This middleware checks the token in the Authorization header and verifies it.
 * If the token is valid and present in Firestore, the user is allowed to proceed to the next middleware or route handler.
 * Otherwise, an appropriate status response is sent.
 */
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    try {
        // Verify token using secret key
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        // Initialize Firebase and check token in Firestore
        const db = await initializeFirebase();
        const tokenDoc = await db.collection('tokens').doc(token).get();

        // If token is not in Firestore or invalid, forbidden
        if (!tokenDoc.exists || !tokenDoc.data().valid) return res.sendStatus(403);

        // Store verified user information in request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.sendStatus(403); // If invalid token, forbidden
    }
};

module.exports = authenticateToken;
