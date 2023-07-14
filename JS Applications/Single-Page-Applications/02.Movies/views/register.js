import { homeView } from "./home.js";

let registerPage = undefined;
let main = undefined;

export function setupRegister(section, container) {
    registerPage = section;
    main = container;

    let form = registerPage.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    if (password !== repeatPassword) {
        return alert('Passwords don\'t match')
    }
    try{
        let body = JSON.stringify({
            email,
            password,
        });

        let response = await fetch(`http://localhost:3030/users/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        if(!response.ok){
            let error = await response.json();
            alert(error.message);
            throw new Error(`${response.status} : ${error.message}`)
        }

        let user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));

        e.target.reset();
        homeView();

    }catch(error){
        console.error(error.message);
    }
}

export async function registerView() {
    Array.from(main.children).forEach((el,i) => {
        if(i !== 0){
            el.remove();
        }
    });
    main.appendChild(registerPage);
}