import { request } from './api.js';
import { setUserData, getUserData} from './utils.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    create: '/data/catalog',
    getAll: '/data/catalog',
    getDetails: '/data/catalog/',
    update: '/data/catalog/',
    delete: '/data/catalog/',
    getMine: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`
}

async function login(data) {
    let user = await request(endpoints.login, 'post', data);
    setUserData(user);
}

async function register(data) {
    let user = await request(endpoints.register, 'post', data);
    setUserData(user);
}

async function createFurniture(data) {
    return await request(endpoints.create, 'post', data);
}

async function getAllFurniture() {
    return await request(endpoints.getAll);
}

async function getDetails(id) {
    return await request(endpoints.getDetails + id);
}

async function updateFurniture(id, data) {
    return await request(endpoints.update + id, 'put', data);
}

async function deleteFurniture(id) {
    return await request(endpoints.delete + id, 'delete');
}

async function getMine() {
    let user = getUserData();
    if(user._id){
        return await request(endpoints.getMine(user._id),'get');
    }
}

export {
    login,
    register,
    createFurniture,
    getAllFurniture,
    getDetails,
    updateFurniture,
    deleteFurniture,
    getMine
}