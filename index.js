require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.use(expressLayouts);

// Points to views/layouts/layout.ejs
// app.set('layout', 'layouts/layout');
app.set('layout',false);


// Serve static files from 'public' folder
app.use(express.static('public'));

//connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

//Middleware
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for form data

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }//set to true if using HTTPS
    // cookie: {
    //     secure: false, // Set to true if using HTTPS
    //     maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // }
}));

//Routes

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);



//set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    //  res.send('Hello from Node.js + Express!');
    // res.render('index2', { title: 'GoFit', user: req.session.user || null });
    // res.render('index', {
    //     title: 'Home',
    //     user: req.session.user || null,
    //     layout: 'layout' // uses views/layout.ejs
    // });

    res.render('index2', { 
    title: 'GoFit', 
    user: req.session.user || null, 
    page: 'Home', 
    layout: 'layouts/layout'
});
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
