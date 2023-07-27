function setUserData(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}
function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}
function clearUserData() {
    sessionStorage.removeItem('user');
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

export { setUserData, getUserData, clearUserData, createSubmitHandler }