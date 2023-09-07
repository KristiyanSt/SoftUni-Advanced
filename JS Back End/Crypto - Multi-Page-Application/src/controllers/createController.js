const createController = require('express').Router();

const { hasUser } = require('../middlewares/guards.js');
const { createCrypto } = require('../services/cryptoService.js');
const { parseError } = require('../utils/errorParser.js');

createController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create'
    });
});
createController.post('/create', hasUser(), async (req, res) => {
    try {
        await createCrypto(req);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create',
            error: parseError(err),
            body: req.body
        });
    };
});


module.exports = createController;
