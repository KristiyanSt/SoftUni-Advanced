function hasUser() {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login')
        }
        next();
    }
}

function isOwner() {
    return (req, res, next) => {
        if (!req.user || req.crypto.owner != req.user._id) {
            return res.render('404');
        }
        next();
    }
}

module.exports = {
    hasUser,
    isOwner,
}