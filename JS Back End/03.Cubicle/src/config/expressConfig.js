const handlebars = require('express-handlebars');
const express = require('express');

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./src/static'));
};
