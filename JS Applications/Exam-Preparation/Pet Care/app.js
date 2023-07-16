import { page, render } from './lib.js';
import { homePage } from './views/home.js';
import { clearUserData, getUserData } from './utils.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { logout } from './data.js';

const root = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('index.html', homePage);
page('/home', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/create', createPage);
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