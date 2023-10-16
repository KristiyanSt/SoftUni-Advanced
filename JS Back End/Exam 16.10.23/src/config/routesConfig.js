const registerController = require('../controllers/registerController.js');
const loginController = require('../controllers/loginController.js');
const homeController = require('../controllers/homeController.js');
const logoutController = require('../controllers/logoutController.js');
const catalogController = require('../controllers/catalogController.js');
const createController = require('../controllers/createController.js');
const detailsController = require('../controllers/detailsController.js');
const searchController = require('../controllers/searchController.js');

module.exports = (app) => {
    app.use(registerController);
    app.use(loginController);
    app.use(homeController);
    app.use(logoutController);
    app.use(catalogController);
    app.use(createController);
    app.use(detailsController);
    app.use(searchController);
    app.use('*', (req,res) => {
        res.render('404');
    });
}