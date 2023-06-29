import { login } from '../api/users.js';

let section = document.querySelector('#login');
let navElement = document.querySelector('#loginNav');
section.querySelector('form').addEventListener('submit', loginHandler);
let ctx = undefined;

export function showLogin(context) {
    ctx = context;
    ctx.setActiveNav(navElement);
    ctx.showSection(section);
}

async function loginHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let body = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    await login(body);

    e.target.reset();
    ctx.updateNav();
    ctx.goto('/catalog');
}
