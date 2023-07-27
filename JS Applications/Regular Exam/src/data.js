import { request } from './api.js';
import { setUserData } from './utils.js';

const endpoints = {
    logout: '/users/logout',
    login: '/users/login',
    register: '/users/register',
    getAllFacts: '/data/facts?sortBy=_createdOn%20desc',
    createFact: '/data/facts',
    readFact: '/data/facts/',
    deleteFact: '/data/facts/',
    editFact: `/data/facts/`,
    getLikes: (id) => `/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`,
    postLike: '/data/likes',
    getUserLikes: (userId, factId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export function logout() {
    request(endpoints.logout);
}
export async function login(data) {
    const user = await request(endpoints.login, 'post', data);
    setUserData(user);
}
export async function register(data) {
    const user = await request(endpoints.register, 'post', data);
    setUserData(user);
}
export async function getAll() {
    return request(endpoints.getAllFacts);
}
export async function createFact(data) {
    return request(endpoints.createFact, 'post', data);
}
export async function readFactById(id) {
    return request(endpoints.readFact + id);
}
export async function deleteFact(id) {
    return request(endpoints.deleteFact + id, 'delete');
}
export async function editFact(id, data) {
    return request(endpoints.editFact + id, 'put', data);
}
export async function getLikes(id) {
    return request(endpoints.getLikes(id));
}
export async function postLike(id) {
    return request(endpoints.postLike, 'post', { factId: id });
}
export async function getUserLikes(userId, factId) {
    return request(endpoints.getUserLikes(userId, factId))
}