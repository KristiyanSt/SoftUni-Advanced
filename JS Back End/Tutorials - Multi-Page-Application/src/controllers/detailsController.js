const courseService = require('../services/courseService.js');

const detailsController = require('express').Router();

const { hasUser, isOwner, hasEnrolled, canEnroll } = require('../middlewares/guards.js');
const parseError = require('../utils/errorParser.js');

detailsController.get('/course/details/:id', hasUser(), async (req, res) => {

    const course = await courseService.getById(req.params.id);
    res.render('details', {
        course,
        isOwner: req.user._id == course.ownerId,
        isEnrolled: course.enrolled.some(id => id == req.user._id)
    });
});

detailsController.get('/course/edit/:id', isOwner(), async (req, res) => {
    const course = await courseService.getById(req.params.id);
    res.render('edit', {
        course
    });
});

detailsController.post('/course/edit/:id', isOwner(), async (req, res) => {
    const { title, description, imageUrl, isPublic } = req.body;
    const payload = {
        title, description, imageUrl, isPublic: isPublic != undefined
    }
    try {
        await courseService.editCourse(req.params.id, payload);
    
        res.redirect('/course/details/' + req.params.id);
        
    } catch (err) {
        res.render('edit',{
            error: parseError(err),
            course: { title, description, imageUrl, isPublic, _id: req.params._id }
        });
    }
});
detailsController.get('/course/delete/:id', isOwner(), async (req, res) => {
    await courseService.deleteCourse(req.params.id);
    res.redirect('/');
});

detailsController.get('/course/enroll/:id', canEnroll(),hasEnrolled(), async (req, res) => {
    await courseService.enrollUser(req.params.id, req.user._id);
    res.redirect('/course/details/' + req.params.id);
});

module.exports = detailsController;