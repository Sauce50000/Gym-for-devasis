
const User = require('../models/User'); // Adjust the path as needed

exports.getDashboard = (req, res) => {
    if (req.session.user?.role !== 'admin') return res.redirect('auth/login');
    //res.render('admin/dashboard', {user: req.session.user});
    res.render('admin/stats', {
        title: 'Dashboard',
        user: req.session.user,
        layout: 'layouts/dashboard'
    });
};
// exports.getUsers = (req, res) => {
//     if (req.session.user?.role !== 'admin') return res.redirect('auth/login');
// //extract all users here
//     res.render('admin/users', {
//         title: 'Users',
//         user: req.session.user,
//         layout: 'layouts/dashboard'
//     });
// };
exports.getUsers = async (req, res) => {
    if (req.session.user?.role !== 'admin') {
        return res.redirect('/auth/login');
    }

    try {
        const users = await User.find();
        // Fetch all users from MongoDB
        res.render('admin/users', {
            title: 'Users',
            user: req.session.user,
            users,
            layout: 'layouts/dashboard'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
};

exports.getTrainers = async (req, res) => {
    if (req.session.user?.role !== 'admin') {
        return res.redirect('/auth/login');
    }

    try {
        const trainers = await User.find({ role: 'trainer' });
        res.render('admin/trainers', {
            title: 'Trainers',
            user: req.session.user,
            trainers,
            layout: 'layouts/dashboard'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching trainers');
    }
};
