import { contacts } from './contacts.js';
import {html, render} from 'https://unpkg.com/lit-html?module'

const root = document.querySelector('#contacts');

const createContactCard = (contact) => {
    return html` <div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn" @click=${toggleDetails}>Details</button>
        <div class="details" id=${contact.id}>
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
    </div>
</div>`
}

render(contacts.map(createContactCard), root);

async function toggleDetails(e){
    let details = e.target.nextElementSibling;
    details.style.display = details.style.display == 'block'
    ? 'none'
    : 'block';
}