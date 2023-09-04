const Crypto = require("../models/Crypto.js");
const User = require("../models/User.js");


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

async function getAll() {
    return Crypto.find({}).lean();
}

async function getById(id) {
    return Crypto.findById(id).lean();
}

async function buyCrypto(userId, cryptoId) {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyCrypto.push(userId);
    await crypto.save();
}

module.exports = {
    createCrypto,
    getAll,
    getById,
    buyCrypto
}