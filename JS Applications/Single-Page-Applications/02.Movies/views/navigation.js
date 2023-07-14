

let navList = undefined;
let logoutItem = undefined;
let loginItem = undefined;
let registerItem = undefined;
let welcomeItem = undefined;


export function setupNavigation(nav) {
    navList = nav.querySelector('ul');
    logoutItem = navList.querySelector('.logout');
    loginItem = navList.querySelector('.login');
    registerItem = navList.querySelector('.register');
    welcomeItem = navList.querySelector('.welcome');

}

export async function identifier() {
    let user = JSON.parse(localStorage.getItem('user'));
    Array.from(navList.children).forEach(el => el.remove());

    if (user) {

        welcomeItem.querySelector('a').textContent = `Welcome, ${user.email}`;
        navList.append(welcomeItem, logoutItem);


    } else {
        navList.append(loginItem, registerItem);

    }
}

