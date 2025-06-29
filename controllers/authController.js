const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Missing import added

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null }); // Added error parameter
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('auth/login', { 
                error: 'Invalid credentials',
                username // Preserve username on failed attempt
            });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', {
                error: 'Invalid credentials',
                username
            });
        }

        // 3. Set session
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        // 4. Redirect based on role
        const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/user';
        res.redirect(redirectPath);

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).render('auth/login', {
            error: 'Server error. Please try again later.',
            username
        });
    }
};