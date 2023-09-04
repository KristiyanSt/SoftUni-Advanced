const { createAccessory, getAllAccessories, addAccessory } = require('../services/accessoryService.js');
const { getById } = require('../services/cubeService.js');

const accessoryController = require('express').Router();

accessoryController.get('/accessory', (req, res) => {
    res.render('createAccessory');
});

accessoryController.post('/accessory', async (req, res) => {
    const {name, description, imageUrl } = req.body;

    try {
        await createAccessory(name, description, imageUrl);
        res.redirect('/');
    } catch (err) {
        // todo render errors
        res.render('createAccessory');
    }
});

accessoryController.get('/attach/:id', async (req, res) => {

    const cube = await getById(req.params.id);
    const accessories = await getAllAccessories();
    let nonExisting;

    if(cube.accessories){
        nonExisting = accessories.filter(a => cube.accessories.every(x => x._id.toString() != a._id.toString()));
    }else{
        nonExisting = accessories;
    }

    res.render('attachAccessory', {
        cube,
        nonExisting
    });
});
accessoryController.post('/attach/:id', async (req, res) => {

    await addAccessory(req.params.id, req.body.accessory);
    res.redirect('/details/' + req.params.id);
});






module.exports = accessoryController;