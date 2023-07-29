const { getAll } = require('../services/cubeService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query;
    console.log(search);
    const cubes = getAll(search);

    res.render('index', { cubes, search });
});
router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;