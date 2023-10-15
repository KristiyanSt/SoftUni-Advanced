const authService = require('../services/authService.js');
const parseError = require('../utils/errorParser.js');

const loginController = require('express').Router();

loginController.get('/login', (req, res) => {
    res.render('login');
});

loginController.post('/login', async (req, res) => {

    const { username, password } = req.body;
    try {
        const user = await authService.login(username, password);

        const payload = {
            username,
            _id: user._id
        }
        res.signJwt(payload, res);

        res.redirect('/');

    } catch (err) {
        res.render('login', {
            error: parseError(err),
            username
        });
    }

});

module.exports = loginController;