const { getAllAccessories } = require('../services/accessoryService.js');
const { getById } = require('../services/cubeService.js');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await getById(id);
    const accessories = await getAllAccessories();

    let existing;

    if(cube.accessories) {
        existing = accessories.filter(x => cube.accessories.some(a => a._id.toString() == x._id.toString()));
    }

    if(cube) {
        res.render('details', { cube, existing, isOwner: req.user._id == cube.owner });
    } else {
        res.render('404');
    }
});

module.exports = router;