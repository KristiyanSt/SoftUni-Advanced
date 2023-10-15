const jwt = require('jsonwebtoken');
const secret = 'awraf4v32c';

function signJwt(payload, res) {
    const result = jwt.sign(payload, secret)
    res.cookie('token',result);
}

module.exports = (req, res, next) => {

    if(req.cookies.token) {
        try{
            const result = jwt.verify(req.cookies.token, secret);
            req.user = result;
            res.locals.user = result;
        } catch(err) {
            res.status(401).clearCookie('token').redirect('/login');
        }
    }
    res.signJwt = signJwt;
    next();
}