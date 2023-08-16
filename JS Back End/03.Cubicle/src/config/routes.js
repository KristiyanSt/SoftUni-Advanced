const homeController = require('../controllers/homeController.js');
const createController = require('../controllers/createController.js');
const accessoryController = require('../controllers/accessoryController.js');
const detailsController = require('../controllers/detailsController.js');
const defaultController = require('../controllers/defaultController.js');
const authController = require('../controllers/authController.js');
const { hasUser, hasRole} = require('../middlewares/guards.js');
const cubeController = require('../controllers/cubeController.js');


module.exports = (app) => {
    app.use(homeController);
    app.use('/create', hasUser, createController);
    app.use('/create', hasRole('admin'), accessoryController);
    app.use('/accessories', accessoryController);
    app.use('/details', detailsController);
    app.use('/auth', authController);
    app.use('/cube', cubeController);
    app.all('*', defaultController);
}