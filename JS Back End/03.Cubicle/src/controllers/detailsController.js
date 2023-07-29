const { getById } = require('../services/cubeService.js');

const router = require('express').Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cube = getById(id);
    
    if(cube) {
        res.render('details', { cube });
    } else {
        res.render('404');
    }
});

module.exports = router;