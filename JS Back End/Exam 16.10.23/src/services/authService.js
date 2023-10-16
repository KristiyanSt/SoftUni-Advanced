const User = require("../models/User.js");
const bcrypt = require('bcrypt');

async function login(email, password) {
    const user = await User.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            throw new Error('Username or password don\'t match');
        }

        return user;

    } else {
        throw new Error('Username or password don\'t match');
    }
}

async function register(email, username, password, repeatPassword) {
    const user = await User.findOne({ email });

    // potentially can register with same email and username

    if (user) {
        throw new Error('Email is already registered');
    }

    const payload = {
        email,
        username,
        password: await bcrypt.hash(password, 10)
    }
    return User.create(payload);
}
const authService = {
    login,
    register
}

module.exports = authService;