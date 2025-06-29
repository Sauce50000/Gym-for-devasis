exports.getDashboard = (req, res) => {
    if (req.session.user?.role !== 'admin') return res.redirect('auth/login');
    res.render('admin/dashboard', {user: req.session.user});
};