const bcrypt = require('bcrypt');
const User = require("../models/User.js");



async function register(username, email, password) {

    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
        throw new Error('Username is taken.');
    } else if (existingEmail) {
        throw new Error('Email is taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    return {
        username: user.username,
        email: user.email,
        _id: user._id
    };
}
async function login(email, password) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return {
        username: user.username,
        email: user.email,
        _id: user._id
    };
}

module.exports = {
    register,
    login
}