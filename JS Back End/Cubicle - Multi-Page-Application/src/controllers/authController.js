const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { login, register } = require('../services/authService.js');
const { parseError } = require('../util/parser.js');
const { isExisting } = require('../middlewares/auth.js');

const secret = 'wad2a2da2ddd';

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', isExisting(),
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required').bail()
        .isAlphanumeric().withMessage('Username can only consist of numbers and english letters'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .custom((value, { req }) => {
            if (req.body.repeatPassword.trim() != value) {
                return false;
            }
            return true;
        }).withMessage('Passwords must match'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const result = await register(req.body.username, req.body.password);

            const token = req.signJwt(result);

            res.cookie('jwt', token);
            res.redirect('/');
        } catch (err) {
            res.render('register',
                {
                    error: parseError(err),
                    body: {
                        username: req.body.username
                    }
                });
        }
    });

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login',
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required'),
    async (req, res) => {

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await login(req.body.username, req.body.password);
            const token = req.signJwt(result);

            res.cookie('jwt', token);
            res.redirect('/');
        } catch (err) {
            res.render('login',
                {
                    error: parseError(err),
                    body:{
                        username: req.body.username
                    }
                });
        }
    });

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = authController;
