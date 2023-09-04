const jwt = require('jsonwebtoken');

const secret = "secretNote";

async function authUser(req, res, next) {

    if(req.cookies.token) {
        try{
            const user = await jwt.verify(req.cookies.token, secret);
            req.user = user;
            res.locals.hasUser = true;
        } catch(err) {

            req.clearCookie('token');
            //TODO
        }
    }
    next();
}

function signJwt(payload) {
    return jwt.sign(payload, secret);
}



module.exports = {
    authUser,
    signJwt
}