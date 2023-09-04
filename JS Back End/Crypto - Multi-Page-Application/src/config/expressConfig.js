const hbs = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const { authUser } = require('../middlewares/auth.js');

module.exports = (app) => {
    app.engine('.hbs', hbs.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    app.use(express.urlencoded({ extended: false}));
    app.use('/static', express.static('./src/static'));

    app.use(cookieParser());
    app.use(authUser);
}