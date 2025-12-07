const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');
const setRole = require('../middlewares/setRole');

// router.use((req, res, next) => {
//     res.locals.layout = false;
//     console.log('Setting layout to false for:', req.originalUrl);
//     next();
// });

// Registration routes
router.get('/register', authController.getRegister);
router.post('/registerUser', authController.postRegister); //role = 'user'
router.post('/registerTrainer', setRole('trainer'), authController.postRegister); //role = 'trainer'

// router.get('/register', authController.getRegister);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


//adjust later 🥲
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