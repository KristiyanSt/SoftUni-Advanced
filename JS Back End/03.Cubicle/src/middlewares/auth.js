const jwt = require('jsonwebtoken');

module.exports = (secret) => (req,res, next) => {
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