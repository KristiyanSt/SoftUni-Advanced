const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/crypto';

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Error initializing database');
        console.error(err.message);
        proccess.exit(1);
    }
}