const detailsController = require('express').Router();

const electronicsService = require('../services/electronicsService.js');
const { isOwner, canBuy, hasBought } = require('../middlewares/guards.js');
const parseError = require('../utils/errorParser.js');

detailsController.get('/details/:id', async (req, res) => {

    try {
        const electronics = await electronicsService.getById(req.params.id);

        res.render('details', {
            electronics,
            isOwner: req.user && req.user._id == electronics.owner,
            hasBought: req.user && electronics.buyingList.some(id => id == req.user._id)
        });
    } catch (err) {
        res.render('404');
    }
});

detailsController.get('/edit/:id', isOwner(), async (req, res) => {

    const electronics = await electronicsService.getById(req.params.id);

    res.render('edit', {
        electronics
    });
});

detailsController.post('/edit/:id', isOwner(), async (req, res) => {
    const { name, type, production, exploitation, damages, image, price, description } = req.body;

    const payload = {
        name, type, production, exploitation, damages, image, price, description
    }
    try {
        await electronicsService.edit(req.params.id, payload);
        res.redirect('/details/' + req.params.id);

    } catch (err) {
        res.render('edit', {
            error: parseError(err),
            electronics: { name, type, production, exploitation, damages, image, price, description, _id: req.params.id }
        });
    }
});

detailsController.get('/delete/:id', isOwner(), async (req, res) => {
    await electronicsService.deleteItem(req.params.id);
    res.redirect('/');
});

detailsController.get('/buy/:id', canBuy(), hasBought(), async (req, res) => {
    await electronicsService.addToBuyingList(req.params.id, req.user._id);
    res.redirect('/details/' + req.params.id);
});

module.exports = detailsController;