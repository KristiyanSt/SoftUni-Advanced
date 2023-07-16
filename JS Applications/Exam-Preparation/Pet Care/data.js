import { request } from './api.js';
import { setUserData, getUserData, clearUserData } from './utils.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAll: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',
    getPetById: '/data/pets/',
    editPet: '/data/pets/',
    delete: '/data/pets/',
    donationCount: (id) => `/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`,
    donate: '/data/donation',
    userDonation: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export function logout() {
    request('/users/logout');
}
export async function getAllPets() {
    return request(endpoints.getAll);
}
export async function getPet(id) {
    return request(endpoints.getPetById + id);
}
export async function getDonationCount(id) {
    return request(endpoints.donationCount(id));
}
export async function donate(petId) {
    return request(endpoints.donate, 'post', { petId });
}
export async function getUserDonation(petId,userId) {
    return request(endpoints.userDonation(petId,userId));
}
export async function editPet(id, data) {
    return await request(endpoints.editPet + id, 'put', data);
}
export async function deletePet(id) {
    return await request(endpoints.delete + id, 'delete');
}
export async function create(data) {
    return request(endpoints.create, 'post', data);
}
export async function login(data) {
    const user = await request(endpoints.login, 'post', data);
    setUserData(user);
}
export async function register(data) {
    const user = await request(endpoints.register, 'post', data);
    setUserData(user);
}

