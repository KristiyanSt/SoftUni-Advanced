const homeController = require('express').Router();

const courseService = require('../services/courseService.js');

homeController.get('/', async (req, res) => {

    if (req.user) {
        res.render('user-home', {
            courses: await courseService.getAll(),
        });
    } else {
        res.render('guest-home',{
            courses: await courseService.getAll(true)
        });
    }
});

module.exports = homeController;