import api from './api.js';

const endpoints = {
    login:'users/login',
    register:'users/register',
    logout:'users/logout',
}
export async function register(body){
    let user = await api.post(endpoints.register, body);
    sessionStorage.setItem('user', JSON.stringify(user));
}
export async function login(body){
    let user = await api.post(endpoints.login, body );
    sessionStorage.setItem('user', JSON.stringify(user));
}
export async function logoutUser(ctx) {
    api.get(endpoints.logout);
    
    sessionStorage.removeItem('user');
    
    ctx.updateNav();
    ctx.goto('/catalog');
};