import { detailsPageView, proccessDetailsPage } from "./views/movie-details.js";

export async function getMovies() {
    try {
        let response = await fetch('http://localhost:3030/data/movies')
        if (response.ok) {
            let moviesData = await response.json();
            return moviesData;
        } else {
            let data = await response.json();
            alert(`${response.status}:${data.message}`);
            throw new Error(`${response.status}:${data.message}`);
        }
    } catch (error) {
        console.error(`${response.status}:${data.message}`);
    }
}

export function createMoviePreview(movie) {
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `<img class="card-img-top" src=${movie.img}
                             alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">${movie.title}</h4>
                        </div>
                        <div class="card-footer">
                            <a href="/details/${movie._id}">
                                <button type="button" class="btn btn-info">Details</button>
                            </a>
                        </div>`
                        
    let detailsSection = element.querySelector('.card-footer');
    if(!localStorage.getItem('user')){
        detailsSection.remove();
    }else{
        detailsSection.addEventListener('click', loadDetailsPage)
    }

    return element;

    async function loadDetailsPage(e){
        e.preventDefault();
        proccessDetailsPage(movie);
        detailsPageView();
    }
}