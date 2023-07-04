import { html, render } from 'http://unpkg.com/lit-html?module';

let root = document.getElementById('root');
let form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = formData.get('towns');
    let towns = input.split(',');
    render(listTemplate(towns),root);
    e.target.reset();
}

let listTemplate = (towns) => {
    return html`<ul>${towns.map(t => html`<li>${t.trim()}</li>`)}</ul>`;
}
