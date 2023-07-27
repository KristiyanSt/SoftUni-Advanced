import { logout } from './data.js';
import { page, render } from './lib.js';
import { clearUserData, getUserData } from './utils.js';
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

const root = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/index.html', homePage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = getUserData();
    if (user) {
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = "none");
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = "list-item");
    } else {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = "none");
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = "list-item");
    }
}
function onLogout() {
    logout();
    clearUserData();
    updateNav();
    page.redirect('/');
}