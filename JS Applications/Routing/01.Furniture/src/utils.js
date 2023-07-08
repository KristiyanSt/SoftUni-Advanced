function setUserData(user) {
    sessionStorage.setItem('user',JSON.stringify(user));
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function clearUserData() {
    sessionStorage.removeItem('user');
}

export { setUserData, getUserData, clearUserData }