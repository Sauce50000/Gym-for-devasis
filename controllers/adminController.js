exports.getDashboard = (req, res) => {
    if (req.session.user?.role !== 'admin') return res.redirect('auth/login');
    //res.render('admin/dashboard', {user: req.session.user});
    res.render('admin/stats', {
        title: 'Dashboard',
        user: req.session.user,
        layout: 'layouts/dashboard'
    });
};
exports.getUsers = (req, res) => {
    if (req.session.user?.role !== 'admin') return res.redirect('auth/login');
    res.render('admin/users', {
        title: 'Users',
        user: req.session.user,
        layout: 'layouts/dashboard'
    });
};