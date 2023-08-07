const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    description: { type: String, required: true },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory'}
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube; 