const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const databaseConfig = require('./config/database.js');
const routesConfig = require('./config/routesConfig.js');

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);
    
    app.listen(3000);
}

start();

