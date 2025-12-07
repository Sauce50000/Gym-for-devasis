const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null, username: ''}); 
};

exports.getRegister = (req, res) => {
    res.render('auth/register', { error: null, username: '', email: ''});
    // res.render('auth/register', {
    // error: 'Some error',
    // formData: req.body
// });
};

exports.postRegister = async (req, res) => {
    const { email, username, password, password_confirm } = req.body;
    const role = req.role || 'user';

    if (password !== password_confirm) {
        return res.render('auth/register', {
            error: 'Passwords do not match',
            email,
            username
        });
    }

    try {

        const userexist = await User.findOne({ $or: [{ username }, { email }] });

        if (userexist) {
            return res.render('auth/register', {
                error: 'This username or email already exists',
                email,
                username
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            email: email,
            username: username,
            password: hashedPassword,
            role
        });

        res.redirect('/auth/login'); 
    } catch (err) {
        console.error('Registration error:', err);
        res.render('auth/register', {
            error: 'Registration failed. Please try again.',
            email,
            username
        });
    }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Find user
        //const user = await User.findOne({ username });
        
        const user = await User.findOne({
            $or: [{username},{email: username}]
        });
        
        if (!user) {
            return res.render('auth/login', {
                error: 'Invalid credentials',
                username// Preserve username on failed attempt
                
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
        // const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/user';
        // res.redirect(redirectPath);
        res.redirect('/');

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).render('auth/login', {
            error: 'Server error. Please try again later.',
            username
        });
    }
};