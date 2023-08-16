const { getAll } = require('../services/cubeService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query;
    const cubes = await getAll(search);

    const user = req.user;
    console.log(user);

    res.render('index', { cubes, search });
});
router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;