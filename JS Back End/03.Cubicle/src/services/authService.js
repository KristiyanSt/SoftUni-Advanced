const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const secret = 'wad2a2da2ddd';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    return {
        username: user.username,
        roles: user.roles
    }
}
async function login(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!existing) {
        throw new Error('Incorrent username or password!');
    }

    const match = await bcrypt.compare(password, existing.hashedPassword);
    if (!match) {
        throw new Error('Passwords don\'t match!');
    }

    return {
        _id: existing._id,
        username: existing.username,
        roles: existing.roles
    }
}

module.exports = {
    login,
    register
}