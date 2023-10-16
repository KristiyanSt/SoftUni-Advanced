const catalogController = require('express').Router();

const electronicsService = require('../services/electronicsService.js');

catalogController.get('/catalog', async (req, res) => {

    res.render('catalog', {
        electronics: await electronicsService.getAll()
    });
});

module.exports = catalogController;