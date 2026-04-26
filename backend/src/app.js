const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.send({ status: 'Zoom Clone API is running' });
});

module.exports = app;
