const authController = require('express').Router();
const jwt = require('jsonwebtoken');
const { login, register } = require('../services/authService.js');

const secret = 'wad2a2da2ddd';

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username.trim() == "" || req.body.password == "") {
            throw new Error('All fields are required!');
        }
        if (req.body.password.trim() != req.body.repeatPassword.trim()) {
            throw new Error('Passwords must match!');
        }

        const result = await register(req.body.username.trim(), req.body.password.trim());

        const token = req.signJwt(result);

        res.cookie('jwt', token);
        res.redirect('/');
    } catch (err) {
        res.render('register', { error: err.message.split('\n') });
    }
});

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {

    try {
        if (req.body.username.trim() == "" || req.body.password == "") {
            throw new Error('All fields are required!');
        }

        const result = await login(req.body.username, req.body.password);
        const token = req.signJwt(result);

        res.cookie('jwt', token);
        res.redirect('/');
    } catch (err) {
        res.render('login', { error: err.message.split('\n') });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = authController;
