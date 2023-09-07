const Crypto = require("../models/Crypto.js");


async function createCrypto(data) {

    return Crypto.create({
        name: data.body.name,
        imageUrl: data.body.imageUrl,
        price: Number(data.body.price),
        description: data.body.description,
        paymentMethod: data.body.paymentMethod,
        owner: data.user._id
    });
}

async function getAll(name, paymentMethod) {
    const options = {};
    if (name || paymentMethod) {
        options.name = {
            $regex:  name, $options: 'i'
        }
        options.paymentMethod = {
            $regex:  paymentMethod, $options: 'i' 
        }
    }

    return Crypto.find(options).lean();
}

async function getById(id) {
    return Crypto.findById(id).lean();
}

async function buyCrypto(userId, cryptoId) {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyCrypto.push(userId);
    await crypto.save();
}

async function editCrypto(id, body) {
    const crypto = await Crypto.findById(id);

    crypto.name = body.name;
    crypto.imageUrl = body.imageUrl;
    crypto.price = body.price;
    crypto.description = body.description;
    crypto.paymentMethod = body.paymentMethod;

    return crypto.save();
}

async function deleteById(id) {
    return Crypto.findByIdAndDelete(id);
}

module.exports = {
    createCrypto,
    getAll,
    getById,
    buyCrypto,
    editCrypto,
    deleteById
}