import { identifier } from "./navigation.js";
import { createMoviePreview, getMovies } from "../utils.js";


let homePage = undefined;
let moviesPage = undefined;
let addMovieSection = undefined;
let main = undefined;

export function setupHome(homeSection,moviesSection,container){
    homePage = homeSection;
    moviesPage = moviesSection;
    main = container;
    addMovieSection = moviesPage.querySelector('#add-movie-button');
}

export async function homeView(){
    let moviesContainer = moviesPage.querySelector('.card-deck.d-flex.justify-content-center');
    let moviesData = await getMovies();
    moviesContainer.replaceChildren(...moviesData.map(createMoviePreview))

    Array.from(container.children).forEach((el,i) => {
        if(i !== 0){
            el.remove();
        }
    });

    identifier();
    let section = moviesPage.querySelector('#add-movie-button');
    if(!localStorage.getItem('user')){
       if(section){
           section.remove();
       }
    }else{
        if(!section){
            moviesPage.appendChild(addMovieSection);
        }
    }

    main.append(homePage,moviesPage);
}