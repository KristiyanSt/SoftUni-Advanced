const Cube = require('../models/Cube.js');

function getAll(search) {
    return Cube.find({}).lean();
}

async function getById(id) {
    return Cube.findById(id).lean();
}

async function createCube(cubeData, userId) {

    const cube = {
        name: cubeData.name,
        imageUrl: cubeData.imageUrl,
        description: cubeData.description,
        difficultyLevel: cubeData.difficultyLevel,
        owner: userId
    }
    const missing = Object.entries(cube).filter(([k, v]) => !v);

    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    const result = await Cube.create(cube);
    return result;
}

async function update(cubeData, cubeId){
    const cube = await Cube.findById(cubeId);

    const missing = Object.entries(cubeData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    cube.name = cubeData.name;
    cube.imageUrl = cubeData.imageUrl;
    cube.description = cubeData.description;
    cube.difficultyLevel = cubeData.difficultyLevel

    await cube.save();
    return cube;
}
async function deleteById(cubeId) {
    return Cube.findByIdAndRemove(cubeId);
}

module.exports = {
    getAll,
    getById,
    createCube,
    update,
    deleteById
}