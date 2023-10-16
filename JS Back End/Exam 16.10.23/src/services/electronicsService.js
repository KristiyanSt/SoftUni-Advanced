const Electronics = require("../models/Electronics.js");

async function getAll() {
    return Electronics.find({}).lean();
}

async function getById(id) {
    return Electronics.findById(id).lean();
}

async function create(payload) {
    return Electronics.create(payload);
}

async function addToBuyingList(electronicsId, userId) {
    const electronics = await Electronics.findById(electronicsId);
    electronics.buyingList.push(userId);
    await electronics.save();
}

async function edit(electronicsId, editedElectronics) {
    const electronics = await Electronics.findById(electronicsId);
    Object.assign(electronics, editedElectronics);
    await electronics.save();
}

async function deleteItem(electronicsId) {
    return Electronics.findByIdAndDelete(electronicsId);
}
async function searchItems(name,type) {
    return Electronics.find(
    { 
        name: { $regex: name, $options: 'i' },
        type: { $regex: type, $options: 'i' } 
    }).lean();
}

const electronicsService = {
    getAll,
    getById,
    create,
    addToBuyingList,
    edit,
    deleteItem,
    searchItems
}
module.exports = electronicsService;