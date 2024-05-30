const admin = require('firebase-admin');
const serviceAccount = require('./testing-424909-aea2d847cce7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://(default).firebaseio.com'
});

const db = admin.firestore();
module.exports = db;
