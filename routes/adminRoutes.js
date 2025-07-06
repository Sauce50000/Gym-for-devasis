const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.get('/users', (req, res) => {
  res.render('dashboard/users', { title: 'Users', user: req.session.user });
});
module.exports = router;