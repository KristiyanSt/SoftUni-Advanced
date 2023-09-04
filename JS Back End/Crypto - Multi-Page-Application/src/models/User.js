const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, minlength: [5, 'Username must be at least 5 characters long']},
    hashedPassword: { type: String },
    email: { type: String, minlength: [10, 'Email must be at least 10 characters long']}
});

const User = model('User', userSchema);

module.exports = User;