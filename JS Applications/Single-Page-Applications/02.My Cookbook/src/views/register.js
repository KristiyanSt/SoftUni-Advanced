import { register } from '../api/users.js';

let section = document.querySelector('#register');
let navElement = document.querySelector('#registerNav');
section.querySelector('form').addEventListener('submit', registerHandler);
let context = undefined;

export function showRegister(ctx) {
    ctx.setActiveNav(navElement);
    ctx.showSection(section);
    context = ctx;
}

async function registerHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    if (formData.get('password') !== formData.get('rePass')) {
        return console.error('Passwords do not match');
    }
    let body = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    await register(body);

    e.target.reset();
    context.updateNav();
    context.goto('/catalog');
}

