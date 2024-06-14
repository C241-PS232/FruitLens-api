// firebase.js
const admin = require('firebase-admin');

let db;

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

module.exports = initializeFirebase;
