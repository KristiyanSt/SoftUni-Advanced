const registerController = require('express').Router();
const authService = require('../services/authService.js');
const parseError = require('../utils/errorParser.js');


registerController.get('/register', (req, res) => {
    res.render('register');
});

registerController.post('/register', async (req, res) => {
    //validate pass with repass
    const { username, password, repeatPassword } = req.body;

    try {
        const result = await authService.register(username, password, repeatPassword);
        res.signJwt({ username, _id: result._id }, res);
        res.redirect('/');
        
    } catch (err) {
        res.render('register',{
            username,
            error: parseError(err)
        });
    }
});


module.exports = registerController;
