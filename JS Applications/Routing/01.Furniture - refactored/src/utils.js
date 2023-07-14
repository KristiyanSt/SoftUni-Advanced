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

export { setUserData, getUserData, clearUserData, parseQueryString }