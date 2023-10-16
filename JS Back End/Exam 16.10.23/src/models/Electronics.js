const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_REGEX = /^https?:\/\/.+/;

const electronicsSchema = new Schema({

    name: { type: String, required: true, minlength: [10, 'Name must be at least 10 characters long'] },
    type: { type: String, required: true, minlength: [2, 'Type must be at least 2 characters long'] },
    damages: { type: String, required: true, minlength: [10, 'Damages must be at least 10 characters long'] },
    image: {
        type: String, required: true, validate: {
            validator: (value) => {
                return URL_REGEX.test(value);
            },
            message: 'Crypto Image must starts with http:// or https://'
        }
    },
    description: {
        type: String, required: true, valie: {
            validator: (value) => {
                if (isNaN(value) || value < 10 && value > 200) {
                    return false;
                }
                return true;
            },
            message: 'Description must be a between 10 and 200 characters'
        }
    },
    production: {
        type: Number, required: true, validate: {
            validator: (value) => {
                if (isNaN(value) || value < 1900 && value > 2023) {
                    return false;
                }
                return true;
            },
            message: 'Production must be between 1900 and 2023'
        }
    },
    exploitation: {
        type: Number, required: true, validate: {
            validator: (value) => {
                if (isNaN(value) || value <= 0) {
                    return false;
                }
                return true;
            },
            message: 'Exploitation must be a positive number'
        }
    },
    price: {
        type: Number, required: true, validate: {
            validator: (value) => {
                if (isNaN(value) || value <= 0) {
                    return false;
                }
                return true;
            },
            message: 'Price must be a positive number'
        }
    },
    buyingList: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User' }

});

const Electronics = model('Course', electronicsSchema);

module.exports = Electronics;

