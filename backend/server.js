require('dotenv').config()

const express = require('express');

const cors = require('cors')

const path = require('path')

const db = require('./models');

const commentsCtrl = require('./controllers/comments')

const app = express();

const usersCtrl = require('./controllers/users')

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.use('/api/comments', commentsCtrl)

app.use('/api/users', usersCtrl)

// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});


app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
