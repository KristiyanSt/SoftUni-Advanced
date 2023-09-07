const homeController = require("../controllers/homeController.js");
const catalogController = require("../controllers/catalogController.js");
const searchController = require("../controllers/searchController.js");
const authController = require("../controllers/authController.js");
const createController = require("../controllers/createController.js");
const detailsController = require("../controllers/detailsController.js");


module.exports = (app) => {
    app.use(homeController);
    app.use(catalogController);
    app.use(searchController);
    app.use(authController);
    app.use(createController);
    app.use(detailsController);
    app.use('*', (req, res) => {
        res.render('404');
    });
}