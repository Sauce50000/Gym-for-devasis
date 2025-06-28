const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for form data

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node.js + Express!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
