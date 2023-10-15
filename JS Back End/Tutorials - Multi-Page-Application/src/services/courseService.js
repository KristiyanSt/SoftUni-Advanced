const Course = require("../models/Course.js");

async function getAll(sorted) {
    if (sorted) {
        const courses = await Course.find({ isPublic: true }).lean();
        return courses.sort((a,b) => b.enrolled.length - a.enrolled.length).splice(0,3);
    }
    return Course.find({ isPublic: true }).lean();
}

async function getById(id) {
    return Course.findById(id).lean();
}
async function enrollUser(courseId, userId) {
    const course = await Course.findById(courseId);
    course.enrolled.push(userId);
    await course.save();
}
async function editCourse(courseId, editedCourse) {
    const course = await Course.findById(courseId);
    Object.assign(course, editedCourse);
    await course.save();
}
async function deleteCourse(courseId) {
    return Course.findByIdAndDelete(courseId);
}

const courseService = {
    getAll,
    getById,
    enrollUser,
    editCourse,
    deleteCourse
}
module.exports = courseService;