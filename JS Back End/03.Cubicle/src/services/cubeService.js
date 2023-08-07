const Cube = require('../models/Cube.js');

function getAll(search) {
    return Cube.find({}).lean();
}

async function getById(id) {
    return Cube.findById(id).lean();
}

async function createCube(cubeData) {
    const cube = {
        name: cubeData.name,
        imageUrl: cubeData.imageUrl,
        description: cubeData.description,
        difficultyLevel: cubeData.difficultyLevel
    }
    const missing = Object.entries(cube).filter(([k, v]) => !v);

    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }
    const result = await Cube.create(cube);
    return result;
}

module.exports = {
    getAll,
    getById,
    createCube
}