const catalogController = require('express').Router();

const { getAll } = require('../services/cryptoService.js');

catalogController.get('/catalog', async (req, res) => {

    const coins = await getAll();

    res.render('catalog', {
        title: 'Trade Catalog',
        coins
    });
});

module.exports = catalogController;