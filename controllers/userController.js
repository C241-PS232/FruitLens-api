const db = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');

exports.getAllUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const id = uuidv4();
        await db.collection('users').doc(id).set(req.body);
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
