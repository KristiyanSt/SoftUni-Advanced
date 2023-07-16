function setUserData(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function clearUserData() {
    sessionStorage.removeItem('user');
}
function parseQueryString(string) {
    let params = string.split('&')
        .map(s => s.split('='))
        .reduce((acc, [k, v]) => Object.assign(acc, { [k]: v }), {});
    return params;
}
function createSubmitHandler(callback){
    return function(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let entries = [...formData.entries()];
        let data = entries.reduce((a,[key,val]) => Object.assign(a,{[key]:val}),{});
        callback(data);
    }
}

export { setUserData, getUserData, clearUserData, parseQueryString, createSubmitHandler }