const jwt = require('jsonwebtoken');
const User = require('../models/User.js');


function authenticate(secret) {
    return (req, res, next) => {

        const token = req.cookies.jwt;
        if (token) {
            try {
                const data = jwt.verify(token, secret);
                req.user = data;

            } catch (err) {
                res.clearCookie('jwt');
                return res.redirect('/auth/login');
            }
        }

        req.signJwt = (data) => {
            return jwt.sign(data, secret);
        };

        next();
    }
}

function isExisting() {
    return async (req, res, next) => {
        const existing = await User.findOne({ username: req.body.username }).collation({ locale: 'en', strength: 2 });

        if (existing) {
            return res.render('register',
                {
                    error: ['Username is taken'],
                    body: {
                        username: req.body.username
                    }
                });
        }

        next();
    }
}
module.exports = {
    authenticate,
    isExisting
}