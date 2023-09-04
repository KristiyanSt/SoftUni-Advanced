const cryptoController = require('express').Router();

const { createCrypto, getAll } = require('../services/cryptoService.js');
const { parseError } = require('../utils/errorParser.js');

cryptoController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    });
});
cryptoController.post('/create', async (req, res) => {
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

cryptoController.get('/catalog', async (req, res) => {


    const coins = await getAll();

    res.render('catalog', {
        title: 'Trade Catalog',
        coins
    });

});

module.exports = cryptoController;
