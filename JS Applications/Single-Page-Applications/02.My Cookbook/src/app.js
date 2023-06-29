import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showLogin } from "./views/login.js";
import { logoutUser } from "./api/users.js";
import { showRegister } from './views/register.js';
import { initialize } from "./router.js";

let router = {
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/logout': logoutUser,
}

let context = initialize(router);
context.updateNav();
context.goto('/catalog');

