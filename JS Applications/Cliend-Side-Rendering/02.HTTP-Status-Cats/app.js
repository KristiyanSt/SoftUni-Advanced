import { html, render, nothing } from 'http://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';

let section = document.getElementById('allCats');

cats.forEach((cat) => cat.clicked = false);

let listTemplate = (cats) => {
    return html`<ul>
    ${cats.map(itemTemplate)}
    </ul>`
}

let itemTemplate = (cat) => html`<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap"></img>
<div class="info">
    <button class="showBtn" @click=${() => toggleStatus(cat)}>Show status code</button>
    ${cat.clicked 
    ? html`<div class="status" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>`
    : nothing }
</li>`;

function toggleStatus(cat){
    cat.clicked = !cat.clicked;
    render(listTemplate(cats), section);
}

render(listTemplate(cats), section);