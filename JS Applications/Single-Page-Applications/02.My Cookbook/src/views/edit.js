import { getFullRecipe, refactorRecipe } from '../api/data.js';

let section = document.querySelector('#edit');
section.querySelector('form').addEventListener('submit', onSubmit);
let context = undefined;
let currentId = undefined;

async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const body = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: formData.get('steps').split('\n').map(l => l.trim()).filter(l => l != '')
    };
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        return alert('You\'re not logged in!');
    }

    await refactorRecipe(currentId, body);

    context.goto('/catalog');
}

export async function editRecipe(ctx, id) {
    context = ctx;
    currentId = id;
    context.showSection(section);

    let fullRecipe = await getFullRecipe(id);
    fillEditSection(fullRecipe);
}

function fillEditSection(fullRecipe) {
    section.querySelector('input[name="name"]').value = fullRecipe.name;
    section.querySelector('input[name="img"]').value = fullRecipe.img;
    section.querySelector('[name="ingredients"]').value = fullRecipe.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = fullRecipe.steps.join('\n');
}
