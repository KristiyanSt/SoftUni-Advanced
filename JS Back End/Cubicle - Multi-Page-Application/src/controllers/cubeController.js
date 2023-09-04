const { getById, update, deleteById } = require('../services/cubeService.js');

const editController = require('express').Router();

editController.get('/edit/:id', async (req, res) => {

    const cube = await getById(req.params.id);
    res.render('edit', { cube });
});

editController.post('/edit/:id', async (req, res) => {

    try {
        const result = await update(req.body, req.params.id);
        res.redirect('/details/' + result._id)
    } catch (err) {
        req.body._id = req.params.id;
        res.render('edit', {
            cube: req.body,
            error: err.message.split('\n')
        })
    }

});

editController.get('/delete/:id', async (req, res) => {
    const cube = await getById(req.params.id);

    res.render('delete', { cube });
});
editController.post('/delete/:id', async (req, res) => {
    const cube = await getById(req.params.id);

    try {
        await deleteById(req.params.id);
        res.redirect('/');
    } catch (err) {
        req.body._id = req.params.id;
        res.render('edit', {
            cube: req.body,
            error: err.message.split('\n')
        })
    }
    res.render('delete', { cube });
});

module.exports = editController;