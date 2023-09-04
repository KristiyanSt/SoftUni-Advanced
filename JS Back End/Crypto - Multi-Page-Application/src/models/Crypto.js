const { toString } = require('express-validator/src/utils.js');
const { model, Schema, Types: { ObjectId } } = require('mongoose');

const URL_REGEX = /^https?:\/\/.+/;

const cryptoSchema = new Schema({
    name: { type: String, minlength: [2, 'Name must be at least 2 characters long'] },
    imageUrl: {
        type: String, validate: {
            validator: (value) => {
                return URL_REGEX.test(value);
            },
            message: 'Crypto Image must starts with http:// or https://.'
        }
    },
    price: {
        type: Number, validate: {
            validator: (value) => {
                if (isNaN(value) || value <= 0.01) {
                    return false;
                }
                return true;
            },
            message: 'Price must be a positive number'
        }
    },
    description: { type: String, minlength: [10, 'Description must be at least 10 characters long'] },
    paymentMethod: { type: String },
    buyCrypto: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User' }
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;