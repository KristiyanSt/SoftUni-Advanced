const { getAll } = require('../services/cubeService.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query.search || "";
    const fromDifficulty = Number(req.query.from) || 1;
    const toDifficulty = Number(req.query.to) || 6;

    const cubes = await getAll(search, fromDifficulty, toDifficulty);

    res.render('index', { cubes, search: req.query.search, fromDifficulty: req.query.from, toDifficulty: req.query.to });
});
router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;