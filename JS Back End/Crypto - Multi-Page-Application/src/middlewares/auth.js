const jwt = require('jsonwebtoken');

const secret = "secretNote";

async function authUser(req, res, next) {

    if(req.cookies.token) {
        try{
            const user = await jwt.verify(req.cookies.token, secret);
            req.user = user;
            res.locals.hasUser = true;
        } catch(err) {
            req.status(401).clearCookie('token').redirect('/login');
        }
    }

    req.signJwt = (payload) => {
        return jwt.sign(payload, secret);
    }

    next();
}

module.exports = {
    authUser,
}