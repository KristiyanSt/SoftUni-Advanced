const bcrypt = require('bcrypt');
const User = require("../models/User.js");



async function register(username, email, password) {

    // TODO check if username or email exist
    try {

        const existing = await User.findOne({ username });

        if (existing) {
            throw new Error('Username is taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, hashedPassword });

        return {
            username: user.username,
            email: user.email,
            _id: user._id
        };

    } catch (err) {
        throw err;
    }
}
async function login(email, password) {
    try {
        const user = await User.findOne({ email });
    
        if(!user) {
            throw new Error('Incorrect username or password');
        }

        const match = await bcrypt.compare(password, user.hashedPassword);

        if(!match) {
            throw new Error('Incorrect username or password');
        }

        return {
            username: user.username,
            email: user.email,
            _id: user._id
        };

    } catch(err) {
        throw err;
    }
}

module.exports = {
    register,
    login
}