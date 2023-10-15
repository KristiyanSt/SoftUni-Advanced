const courseCreateController = require('express').Router();
const Course = require('../models/Course.js');

const { hasUser } = require('../middlewares/guards.js');
const parseError = require('../utils/errorParser.js');

courseCreateController.get('/course/create', hasUser(), (req, res) => {
    res.render('create')
});

courseCreateController.post('/course/create', hasUser(),async (req, res) => {
    const {
        title, description, imageUrl, isPublic
    } = req.body;

    const payload = { title, description, imageUrl, isPublic: isPublic != undefined, ownerId: req.user._id };

    try {
        const course = await Course.create(payload);
        res.redirect('/course/details/' + course._id);

    } catch (err) {
        res.render('create', {
            error: parseError(err),
            body: {
                title, description, imageUrl, isPublic
            }
        });
    }

});

module.exports = courseCreateController;
