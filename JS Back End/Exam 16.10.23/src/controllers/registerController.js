const registerController = require('express').Router();
const authService = require('../services/authService.js');
const parseError = require('../utils/errorParser.js');


registerController.get('/register', (req, res) => {
    res.render('register');
});

registerController.post('/register', async (req, res) => {
    //validate pass with repass
    const { email, username, password, repeatPassword } = req.body;

    try {
        if(password.trim() == "" || password.trim() !== repeatPassword.trim() || password.length < 4) {
            throw new Error('Passwords don`/t match');
        }

        const result = await authService.register(email, username, password, repeatPassword);
        res.signJwt({ email, username, _id: result._id }, res);
        res.redirect('/');
        
    } catch (err) {
        res.render('register',{
            email,
            username,
            error: parseError(err)
        });
    }
});


module.exports = registerController;
