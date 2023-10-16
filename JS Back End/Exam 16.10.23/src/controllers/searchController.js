const electronicsService = require('../services/electronicsService.js');

const searchController = require('express').Router();

searchController.get('/search', async (req,res) => {
    let electronics;

    if(req.query.name || req.query.type) {
        electronics = await electronicsService.searchItems(req.query.name || "", req.query.type || "");
    }else {
        electronics = await electronicsService.getAll();
    }

    res.render('search',{
        search : req.query || {},
        electronics
    });
});



module.exports = searchController;