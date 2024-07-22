const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use('/emails', emailRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
