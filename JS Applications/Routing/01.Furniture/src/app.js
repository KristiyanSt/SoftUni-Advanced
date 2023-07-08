import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { render, page } from './lib.js';
import { clearUserData, getUserData } from './utils.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { editPage } from './views/edit.js';

let container = document.querySelector('.container');
setUserNav();

function decorateContext(ctx, next) {
    ctx.renderView = renderView;
    ctx.setUserNav = setUserNav;
    next();
}

page(decorateContext);
page('/', catalogPage);
page('/my-furniture', catalogPage);
page('/register', registerPage);
page('/login',loginPage);
page('/create', createPage);
page('/details/:id', detailsPage)
page('/logout',onLogout);
page('/edit/:id', editPage)

page.start();


function renderView(view) {
    render(view, container);
}
function setUserNav() {
    let user = getUserData();
    if (user) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}
function onLogout(){
    let choice = confirm('Are you sure you want to logout?');
    if(choice){
        clearUserData();
        setUserNav();
        page.redirect('/');
    }
}