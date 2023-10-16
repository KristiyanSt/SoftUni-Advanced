const logoutController = require('express').Router();
const { hasUser } = require('../middlewares/guards.js');

logoutController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = logoutController;