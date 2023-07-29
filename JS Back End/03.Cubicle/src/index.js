const express = require('express');
const setupViewEngine = require('./config/viewEngine.js');
const config = require('./config/config.js');

const app = express();
setupViewEngine(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/static'));

const homeController = require('./controllers/homeController.js');
const createController = require('./controllers/createController.js');
const detailsController = require('./controllers/detailsController.js');
const defaultController = require('./controllers/defaultController.js');

app.use(homeController);
app.use('/create', createController);
app.use('/details',detailsController)
app.all('*', defaultController);


app.listen(config.port);