const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { createCube } = require('../services/cubeService.js');
const { parseError } = require('../util/parser.js');
const urlRegex = /^https?:\/\/.+/;
router.get('/', (req, res) => {

    res.render('create');
});

router.post('/',
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long').bail()
        .isAlphanumeric().withMessage('Name must include only digits and english letters'),
    body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long').bail()
        .isAlphanumeric().withMessage('Description must include only digits and english letters'),
    body('imageUrl').custom((value, { req }) => {
        return urlRegex.test(value);
    }).withMessage('ImageUrl must starts with http:// or https://'),
    async (req, res) => {
        try {

            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await createCube(req.body, req.user._id);
            res.redirect('/details/' + result._id)
        } catch (err) {
            res.render('create', {
                error: parseError(err),
                body: req.body
            });
        }
    });

module.exports = router;