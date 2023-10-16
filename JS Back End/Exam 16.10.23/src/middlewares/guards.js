const electronicsService = require("../services/electronicsService.js");

function hasUser() {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login')
        }
        next();
    }
}

function isOwner() {
    return async (req, res, next) => {
        
        try {
            const electronics = await electronicsService.getById(req.params.id);
            
            if (!req.user || electronics.owner != req.user._id) {
                return res.redirect('/');
            }
            next();
        }catch(err) {
            return res.render('404');
        }
    }
}
function canBuy () {
    return async (req, res, next) => {

        try {
            const electronics = await electronicsService.getById(req.params.id);

            if (!req.user || electronics.owner == req.user._id) {
                return res.redirect('/');
            }
            next();
        } catch (err) {
            return res.render('404');
        }
    }
}
function hasBought() {
    return async (req,res,next) => {

        try {
            const electronics = await electronicsService.getById(req.params.id);
            
            if(electronics.buyingList.some(id => id == req.user._id)){
                return res.redirect('/');
            }
            next();
        }catch(err) {
            return res.render('404');
        }
    }
}

module.exports = {
    hasUser,
    isOwner,
    canBuy,
    hasBought,
}