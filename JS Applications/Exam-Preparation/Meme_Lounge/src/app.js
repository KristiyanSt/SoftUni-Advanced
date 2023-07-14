import { logout } from './data.js';
import { render, page } from './lib.js';
import { clearUserData, getUserData } from './utils.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage} from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';
import { welcomePage } from './views/welcome.js';

const main = document.querySelector('main')
const logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click',onLogout);
updateNav();

page(decorateContext);
page('/',welcomePage);
page('index.html', welcomePage);
page('/catalog',homePage)
page('/login',loginPage);
page('/register', registerPage);
page('/details/:id',detailsPage);
page('/create',createPage)
page('/my-profile', profilePage)
page('/edit/:id',editPage)

page.start();

function decorateContext(ctx, next) {
    ctx.updateNav = updateNav;
    ctx.render = (content) => render(content, main);
    next();
}

function onLogout() {
    logout();
    clearUserData();
    updateNav();
    page.redirect('/');
}
function updateNav() {
    let user = getUserData();
    if (user) {
        document.querySelector('.user').style.display = "block";
        document.querySelector('.greeting').textContent = `Welcome, ${user.email}`;
        document.querySelector('.guest').style.display = "none";
    } else {
        document.querySelector('.guest').style.display = "block";
        document.querySelector('.user').style.display = "none";
    }
}
