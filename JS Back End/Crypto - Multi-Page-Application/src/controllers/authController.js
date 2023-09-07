const { register, login } = require('../services/authService.js');

const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/errorParser.js');
const { hasUser } = require('../middlewares/guards.js');


const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register',
    body(['username', 'email', 'password', 'repass']).trim(),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required').bail()
        .custom((value, { req }) => {
            if (value != req.body.repass) {
                return false;
            }
            return true;
        }).withMessage('Passwords don\'t match'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length != 0) {
                throw errors;
            }

            const payload = await register(req.body.username, req.body.email, req.body.password);
            const token = req.signJwt(payload);

            res.cookie('token', token);
            res.redirect('/');

        } catch (err) {

            res.render('register', {
                title: 'Register',
                error: parseError(err),
                body: {
                    username: req.body.username,
                    email: req.body.email
                }
            });
        }
    });

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});
authController.post('/login',
    body(['email', 'password']).trim(),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length != 0) {
                throw errors;
            }

            const payload = await login(req.body.email, req.body.password);
            const token = req.signJwt(payload);

            res.cookie('token', token);
            res.redirect('/');

        } catch (err) {
            res.render('login', {
                title: 'Login',
                error: parseError(err),
                body: {                    
                    email: req.body.email
                }
            });
        }
    });
authController.get('/logout', hasUser(), (req,res) => {

    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;
