import { addMovieView, setupAddMovie } from "./views/add-movie.js";
import { setupEdit } from "./views/edit-movie.js";
import { homeView, setupHome } from "./views/home.js";
import { loginView, setupLogin } from "./views/login.js";
import { setupDetails } from "./views/movie-details.js";
import { identifier, setupNavigation } from "./views/navigation.js";
import { registerView, setupRegister } from "./views/register.js";

let nav = document.querySelector('nav');
nav.addEventListener('click', viewHandler);

let addMovieButton = document.querySelector('.btn.btn-warning ');
addMovieButton.addEventListener('click',viewHandler);

let container = document.querySelector('#container');

let views = {
    '/movies': homeView,
    '/login': loginView,
    '/register': registerView,
    '/add-movie': addMovieView,
    '/logout': logoutUser,
}

setupNavigation(nav);
setupHome(document.querySelector('#home-page'), document.querySelector('#movie'), container);
setupAddMovie(document.querySelector('#add-movie'), container);
setupRegister(document.querySelector('#form-sign-up'), container);
setupLogin(document.querySelector('#form-login'), container);
setupEdit(document.querySelector('#edit-movie'), container);
setupDetails(document.querySelector('#movie-example'), container);


Array.from(container.children).forEach((el,i) => {
    if(i !== 0){
        el.remove();
    }
});

async function viewHandler(e){
    e.preventDefault();

    if(e.target.href){
        let url = new URL(e.target.href);

        if(views.hasOwnProperty(url.pathname)){
            let view = views[url.pathname];
            view();
        }
    }
}
async function logoutUser(){
    let user = JSON.parse(localStorage.getItem('user'));

    let response = await fetch('http://localhost:3030/users/logout',{
        method:'get',
        headers:{
            'X-Authorization': user.accessToken
        }
    });

    localStorage.removeItem('user');
    identifier();
    homeView();
}

identifier();
homeView();
