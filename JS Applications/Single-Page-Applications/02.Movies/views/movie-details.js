let detailsPage = undefined;
let movieContent = undefined;
let deleteBtn = undefined;
let editBtn = undefined;
let likeBtn = undefined;
let main = undefined;

export function setupDetails(section,container){
    detailsPage = section;
    movieContent = detailsPage.querySelector('.row.bg-light.text-dark');
    deleteBtn = movieContent.querySelector('.btn.btn-danger');
    editBtn = movieContent.querySelector('.btn.btn-warning');
    likeBtn = movieContent.querySelector('.btn.btn-primary');
    main = container;
}

async function getLikes(id){
    let response = fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    return await response.json();
    
}

export async function proccessDetailsPage(movie){
    let likes = await getLikes(movie._id)
    console.log(likes);
    movieContent.innerHTML = `<h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}"
            alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-primary" href="#">Like</a>
        <span class="enrolled-span">Liked 1</span>
    </div>`;

    let user = JSON.parse(localStorage.getItem('user'));

    let currentLikeButton = movieContent.querySelector('.btn.btn-primary');
    let currentEditButton = movieContent.querySelector('.btn.btn-warning');
    let currentDeleteButton = movieContent.querySelector('.btn.btn-danger');

    if(user._id == movie._ownerId){
        currentLikeButton.remove();
    }else{
        currentEditButton.remove();
        currentDeleteButton.remove();
    }


}
export function detailsPageView(){
    Array.from(main.children).forEach((el,i) => {
        if(i !== 0){
            el.remove();
        }
    });
    main.appendChild(detailsPage);
}