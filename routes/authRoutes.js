const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');

// Registration routes
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// router.get('/register', authController.getRegister);

router.post('/login', authController.postLogin);
router.get('/login', authController.getLogin);
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
// Check if username exists
router.post('/check-username', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        res.json({ exists: !!user });
    } catch (err) {
        console.error('Username check error:', err);
        res.status(500).json({ exists: false, error: 'Server error' });
    }
});

// Check if email exists
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        res.json({ exists: !!user });
    } catch (err) {
        console.error('Email check error:', err);
        res.status(500).json({ exists: false, error: 'Server error' });
    }
});
module.exports = router;