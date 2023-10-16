const createController = require('express').Router();

const { hasUser } = require('../middlewares/guards.js');
const parseError = require('../utils/errorParser.js');
const electronicsService = require('../services/electronicsService.js');

createController.get('/create', hasUser(), (req, res) => {
    res.render('create')
});

createController.post('/create', hasUser(), async (req, res) => {
    const {
        name, type, production, exploitation, damages, image, price, description
    } = req.body;

    const payload = { name, type, production, exploitation, damages, image, price, description, owner: req.user._id };

    try {
        await electronicsService.create(payload);
        res.redirect('/');

    } catch (err) {
        res.render('create', {
            error: parseError(err),
            body: {
                name, type, production, exploitation, damages, image, price, description
            }
        });
    }

});

module.exports = createController;
