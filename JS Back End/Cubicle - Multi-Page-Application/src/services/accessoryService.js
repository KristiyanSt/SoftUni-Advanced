const Accessory = require('../models/Accessory.js');
const Cube = require('../models/Cube.js');

async function getAllAccessories() {
    return Accessory.find({}).lean();
}

async function addAccessory(cubeId,accessoryId){
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
}
async function createAccessory(name, description, imageUrl) {
    return Accessory.create({
        name,
        description,
        imageUrl
    });
}

module.exports = {
    getAllAccessories,
    createAccessory,
    addAccessory
}