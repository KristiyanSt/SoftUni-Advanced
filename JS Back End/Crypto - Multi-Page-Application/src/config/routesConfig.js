const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const cryptoController = require("../controllers/cryptoController.js");
const detailsController = require("../controllers/detailsController.js");


module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(cryptoController);
    app.use(detailsController);
}