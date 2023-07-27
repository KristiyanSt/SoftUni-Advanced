import { clearUserData, getUserData } from "./utils.js";

let baseUrl = 'http://localhost:3030';


export async function request(url, method = 'get', body) {

    let options = {
        method,
        headers:{}
    };

    let user = await getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (body) {
        options.headers['Content-type'] = 'application/json';

        options.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(baseUrl + url, options);

        if (response.status == 204) {
            return response;
        }else if(response.status == 403){
            clearUserData();
        }

        let data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
