const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/tutorials';

module.exports = async() => {
    try {
        mongoose.connect(connectionString,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('database connected successfully');
    } catch (err) {
        console.log('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
}