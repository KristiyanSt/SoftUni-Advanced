const searchController = require('express').Router();

const { getAll } = require('../services/cryptoService.js');
const { paymentMethods } = require('../utils/constants.js');

searchController.get('/search', async (req, res) => {
    const search = {};

    if (req.query) {
        Object.assign(search, req.query);
        
        if (req.query.paymentMethod) {
            const select = paymentMethods[req.query.paymentMethod];
            search[select] = true;
        }
    }
    const coins = await getAll(req.query.name, req.query.paymentMethod);

    res.render('search', {
        title: 'Search',
        search,
        coins
    });
});

module.exports = searchController;