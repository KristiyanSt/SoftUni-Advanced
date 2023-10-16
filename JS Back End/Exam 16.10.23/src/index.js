const express = require('express');

const expressConfig = require('./config/expressConfig.js');
const databaseConfig = require('./config/databaseConfig.js');
const routesConfig = require('./config/routesConfig.js');


(async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig();
    routesConfig(app);

    app.listen(3000, () => console.log('Server is listening on port 3000'));
}());
