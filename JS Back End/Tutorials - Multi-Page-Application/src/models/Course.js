const { Schema, model, Types: { ObjectId } } = require('mongoose');

const courseSchema = new Schema({
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    isPublic: { type: Boolean },
    enrolled: {type: [ObjectId], ref:'User', default: []},
    ownerId: { type: ObjectId, ref: 'User' }
});

const Course = model('Course',courseSchema);

module.exports = Course;

