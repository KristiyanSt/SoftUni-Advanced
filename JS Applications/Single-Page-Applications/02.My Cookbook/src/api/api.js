const baseUrl = 'http://localhost:3030/';

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    }

    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    try {
        let response = await fetch(baseUrl + url, options);

        if (response.ok) {
            if (response.status == 204) {
                return response;
            }
            return response.json();
        }
        if(response.status == 403){
            sessionStorage.removeItem('user');
        }
        let error = await response.json();
        throw new Error(error.message);

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
let get = request.bind(null, 'get');
let post = request.bind(null, 'post');
let del = request.bind(null, 'delete');
let put = request.bind(null,'put');

let api = { get, post, del, put };

export default api;