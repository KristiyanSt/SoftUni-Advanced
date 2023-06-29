import api from '../api/api.js';

let section = document.querySelector('#create');
let navElement = document.querySelector('#createNav');
section.querySelector('form').addEventListener('submit', createHandler);
let goto = undefined;

export function showCreate(ctx){
    ctx.setActiveNav(navElement);
    ctx.showSection(section);
    goto = ctx.goto;
}

async function createHandler(e){
    e.preventDefault();

    let formData = new FormData(e.target);
    let body = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: formData.get('steps').split('\n').map(l => l.trim()).filter(l => l != '')
    }

    await api.post('data/recipes', body);
    goto('/catalog');
}

