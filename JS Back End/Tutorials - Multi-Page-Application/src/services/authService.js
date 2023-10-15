const User = require("../models/User.js");
const bcrypt = require('bcrypt');

async function login(username, password) {
    const user = await User.findOne({ username });
    if (user) {
        const match = await bcrypt.compare(password, user.hashedPassword);
        if(!match) {
            throw new Error('Username or password don\'t match');
        }

        return user;

    } else {
        throw new Error('Username or password don\'t match');
    }
}

async function register(username, password, repeatPassword) {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error('Username is taken');
    }

    const payload = {
        username,
        hashedPassword: await bcrypt.hash(password, 10)
    }
    return User.create(payload);
}
const authService = {
    login,
    register
}

module.exports = authService;