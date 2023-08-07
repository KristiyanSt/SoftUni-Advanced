const homeController = require('../controllers/homeController.js');
const createController = require('../controllers/createController.js');
const accessoryController = require('../controllers/accessoryController.js');
const detailsController = require('../controllers/detailsController.js');
const defaultController = require('../controllers/defaultController.js');

module.exports = (app) => {
    app.use(homeController);
    app.use('/create', createController);
    app.use('/create', accessoryController);
    app.use('/accessories', accessoryController);
    app.use('/details', detailsController);
    app.all('*', defaultController);
}