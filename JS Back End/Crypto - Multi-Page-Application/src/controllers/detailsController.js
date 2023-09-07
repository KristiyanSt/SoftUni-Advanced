const { buyCrypto, editCrypto, deleteById } = require('../services/cryptoService.js');
const { parseError } = require('../utils/errorParser.js');
const preload = require('../middlewares/preload.js');
const { hasUser, isOwner } = require('../middlewares/guards.js');

const { paymentMethods } = require('../utils/constants.js');

const detailsController = require('express').Router();

detailsController.get('/:id/details', preload(), async (req, res) => {

    let userData;

    if (req.user) {
        userData = {};

        if (req.user._id == req.crypto.owner.toString()) {
            userData.isOwner = true;
        } else if (req.crypto.buyCrypto.some(x => x == req.user._id)) {
            userData.hasBought = true;
        }
    }

    res.render('details', {
        title: 'Details',
        crypto: req.crypto,
        userData,
    });
});

detailsController.get('/purchase/:id', hasUser(), preload(), async (req, res) => {

    if (req.crypto.owner == req.user._id || req.crypto.buyCrypto.some(x => x == req.user._id)) {
        return res.redirect('/');
    }

    await buyCrypto(req.user._id, req.params.id);

    res.redirect(`/${req.params.id}/details`);
});

detailsController.get('/edit/:id', preload(), isOwner(), async (req, res) => {

    const select =  paymentMethods[req.crypto.paymentMethod];
    req.crypto[select] = true;

    res.render('edit', {
        title: 'Edit',
        body: req.crypto
    });
});

detailsController.post('/edit/:id', preload(), isOwner(), async (req, res) => {

    try {
        await editCrypto(req.params.id, req.body);
        res.redirect(`/${req.crypto._id}/details`);

    } catch (err) {
        req.body._id = req.params.id;

        res.render('edit', {
            title: 'Edit',
            body: req.body,
            error: parseError(err)
        });
    }
});
detailsController.get('/delete/:id', preload(), isOwner(), async (req, res) => {

    try {
        await deleteById(req.params.id, req.body);

        res.redirect('/catalog');

    } catch (err) {
        req.body._id = req.params.id;

        res.render('edit', {
            title: 'Edit',
            body: req.body,
            error: parseError(err)
        });
    }
});

module.exports = detailsController;