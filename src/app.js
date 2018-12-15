const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const newsRouter = require('./news').newsRouter;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, '..', 'client/build')))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news', newsRouter())

module.exports = app;
