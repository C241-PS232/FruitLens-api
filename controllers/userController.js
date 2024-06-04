const db = require('../firebase/firebase');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { ...req.body, password: hashedPassword };
        await db.collection('users').doc(id).set(user);
        res.status(201).json({ id, ...user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({ email, logged: false, message: 'Invalid email or password' });
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ email, logged: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: userDoc.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ email: user.email, logged: true, token });
    } catch (error) {
        res.status(500).json({ email: req.body.email, logged: false, message: error.message });
    }
};

exports.logoutUser = (req, res) => {
    res.status(200).json({ message: 'User logged out' });
};
