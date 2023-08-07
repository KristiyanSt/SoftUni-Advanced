const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const routesConfig = require('./config/routes.js');
const databaseConfig = require('./config/database.js');

start();

async function start() {

    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(5000);   
}