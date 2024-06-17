// firebase.js
const admin = require('firebase-admin');

let db;

/**
 * Initializes Firebase Admin SDK and Firestore.
 * This function ensures that Firebase is initialized only once and returns the Firestore database instance.
 * @returns {Promise<Firestore>} - Firestore database instance.
 */
async function initializeFirebase() {
    if (!db) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://(default).firebaseio.com' // Ensure this URL is correct
        });
        db = admin.firestore();
    }
    return db;
}

module.exports = {
    initializeFirebase,
    admin
};
