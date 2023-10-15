const courseService = require("../services/courseService.js");

function hasUser() {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login')
        }
        next();
    }
}

function isOwner() {
    return async (req, res, next) => {
        const course = await courseService.getById(req.params.id)
        if (!req.user || course.ownerId != req.user._id) {
            return res.redirect('/');
        }
        next();
    }
}
function canEnroll () {
    return async (req, res, next) => {
        const course = await courseService.getById(req.params.id)
        if (!req.user || course.ownerId == req.user._id) {
            return res.redirect('/');
        }
        next();
    }
}
function hasEnrolled() {
    return async (req,res,next) => {
        const course = await courseService.getById(req.params.id);

        if(course.enrolled.some(id => id == req.user._id)){
            return res.redirect('/');
        }
        next();
    }
}

module.exports = {
    hasUser,
    isOwner,
    hasEnrolled,
    canEnroll,
}