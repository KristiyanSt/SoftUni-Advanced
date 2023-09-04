const { getById, buyCrypto } = require('../services/cryptoService.js');

const detailsController = require('express').Router();

detailsController.get('/:id/details', async (req, res) => {

    const crypto = await getById(req.params.id);

    if (!crypto) {
        return res.render('404', {
            title: '404'
        });
    }
    let userData;

    if (req.user) {
        userData = {};

        if (req.user._id == crypto.owner.toString()) {
            userData.isOwner = true;
        } else if (crypto.buyCrypto.some(x => x == req.user._id)) {
            userData.hasBought = true;
        }
    }

    res.render('details', {
        title: 'Details',
        crypto,
        userData,
    });
});

detailsController.get('/purchase/:id', async (req, res) => {
    // TODO check if user already bought the crypto

    await buyCrypto(req.user._id, req.params.id);


    // if (!crypto) {
    //     return res.render('404', {
    //         title: '404'
    //     });
    // }
    res.redirect(`/${req.params.id}/details`);
});

module.exports = detailsController;