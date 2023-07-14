import { homeView } from "./home.js";


let loginPage = undefined;
let main = undefined;

export function setupLogin(section,container){
    loginPage = section;
    main = container;
    let form = loginPage.querySelector('form');
    form.addEventListener('submit', onSubmit);

}
async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');

    try{
        let body = JSON.stringify({
            email,
            password,
        });

        let response = await fetch(`http://localhost:3030/users/login`, {
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
export async function loginView(){
    Array.from(container.children).forEach((el,i) => {
        if(i !== 0){
            el.remove();
        }
    });
    main.appendChild(loginPage);
}