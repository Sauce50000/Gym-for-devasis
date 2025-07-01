const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('User routes');
    res.render('index', {
        title: 'GoFit',
        page: 'User',
        user: req.session.user || null
    });
});

module.exports = router;