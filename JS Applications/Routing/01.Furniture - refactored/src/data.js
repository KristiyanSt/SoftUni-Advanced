import { request } from './api.js';
import { setUserData, getUserData } from './utils.js';

const pageSize = 4;

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    create: '/data/catalog',
    getAll: `/data/catalog?pageSize=${pageSize}&offset=`,
    countAll: `/data/catalog?count`,
    getMine: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    getDetails: '/data/catalog/',
    update: '/data/catalog/',
    delete: '/data/catalog/'
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

async function getAllFurniture(page, search) {
    const offset = (page * pageSize) - pageSize;
    let allUrl = endpoints.getAll + offset;
    let countUrl = endpoints.countAll;

    if(search) {
        allUrl += '&where=' + encodeURIComponent(`make LIKE "${search}"`)
        countUrl += '&where=' + encodeURIComponent(`make LIKE "${search}"`)
    }

    const [data, count] = await Promise.all([
        request(allUrl),
        request(countUrl)
    ])

    return {
        data,
        pages: Math.ceil(count / pageSize)
    };
}
async function getMine() {
    let user = getUserData();
    if (user) {

        return request(endpoints.getMine(user._id))
    }
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