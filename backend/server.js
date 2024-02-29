require('dotenv').config()

const express = require('express');

const cors = require('cors')

const path = require('path')

const db = require('./models');

const commentsCtrl = require('../controllers/comments')

const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.use('/api/comments', commentsCtrl)

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});