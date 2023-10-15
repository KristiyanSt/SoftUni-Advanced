const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const homeController = require('../controllers/homeController.js');
const logoutController = require('../controllers/logoutController.js');
const courseCreateController = require('../controllers/courseCreateController.js');
const detailsController = require('../controllers/detailsController.js');


module.exports = (app) => {
    app.use(loginController);
    app.use(registerController);
    app.use(homeController);
    app.use(logoutController);
    app.use(courseCreateController);
    app.use(detailsController);
}