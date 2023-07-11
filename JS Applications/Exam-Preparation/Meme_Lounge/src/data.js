import { request } from './api.js';
import { setUserData } from './utils.js';
const endpoints = {
    login:'/users/login',
    logout:'/users/logout',
    register:'/users/register',
    memes:'/data/memes?sortBy=_createdOn%20desc',
    memeById: '/data/memes/',
    delete:'/data/memes/',
    create:'/data/memes',
    getProfileMemes:(userId) =>`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getProfileMemesCount:(userId) =>`/data/memes?where=_ownerId%3D%22${userId}%22&count`,
}
export async function login(email, password) {
    let body = { email, password }
    try {
        let user = await request(endpoints.login, 'post', body);
        setUserData(user);
    } catch (error) {
        throw error;
    }
}
export async function register(data) {
    try {
        let user = await request(endpoints.register, 'post', data);
        setUserData(user);
    } catch (error) {
        throw error;
    }
}
export async function getMemes(){
    try {
        return await request(endpoints.memes);
    } catch (error) {
        throw error;
    }
}

export async function getMemeById(id) {
    try {
        return await request(endpoints.memeById + id);
    } catch (error) {
        throw error;
    }
}

export async function deleteMeme(id){
    try {
        return await request(endpoints.delete + id,'delete');
    } catch (error) {
        throw error;
    }
}

export async function postMeme(data){
    try {
        return await request(endpoints.create,'post',data);
    } catch (error) {
        throw error;
    }
}

export async function getProfileMemes(id){
    try {
        return await request(endpoints.getProfileMemes(id));
    } catch (error) {
        throw error;
    }
}
export async function getProfileMemesCount(id){
    try {
        return await request(endpoints.getProfileMemesCount(id));
    } catch (error) {
        throw error;
    }
}

export async function editMeme(id,data){
    try{
        return await request(endpoints.memeById + id, 'put',data)
    }catch(err){
        throw err;
    }
}

export async function logout(){
    request(endpoints.logout)
}