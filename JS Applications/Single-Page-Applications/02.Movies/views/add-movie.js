import { homeView } from "./home.js";

let addPage = undefined;
let main = undefined

export function setupAddMovie(section, container) {
    addPage = section;
    main = container;
    let form = addPage.querySelector('form');
    form.addEventListener('submit', onSubmit);
}
async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');

    if (title.trim() !== "" && description.trim() !== "" && img.trim() !== "") {

        let token = (JSON.parse(localStorage.getItem('user'))).accessToken;

        let body = JSON.stringify({
            title,
            description,
            img
        });

        await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });
        e.target.reset();
        homeView();
    }
}
export async function addMovieView() {
    Array.from(main.children).forEach((el, i) => {
        if (i !== 0) {
            el.remove();
        }
    });

    main.appendChild(addPage);
}