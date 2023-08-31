const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const { authenticate } = require('../middlewares/auth.js');
const userNav = require('../middlewares/userNav.js');

const secret = 'wad2a2da2ddd';

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./src/static'));
    app.use(cookieParser());
    app.use(authenticate(secret));
    app.use(userNav());
};
