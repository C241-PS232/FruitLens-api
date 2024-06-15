const jwt = require('jsonwebtoken');
const { initializeFirebase } = require('../firebase/firebase');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const db = await initializeFirebase();
        const tokenDoc = await db.collection('tokens').doc(token).get();

        if (!tokenDoc.exists || !tokenDoc.data().valid) return res.sendStatus(403); // If token is not in Firestore or is invalid, forbidden

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.sendStatus(403); // If invalid token, forbidden
    }
};

module.exports = authenticateToken;
