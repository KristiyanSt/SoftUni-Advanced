import { html, render} from 'http://unpkg.com/lit-html?module';

let menu = document.querySelector('#menu');
let form = document.querySelector('form');
form.addEventListener('submit', onCreate);

let optionsTemplate = (options) => html`${options.map(el => html`<option .value=${el._id}>${el.text}</option>`)}`;
let data = [];
data = Object.values(await getData());
render(optionsTemplate(Object.values(data)), menu);

async function onCreate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: formData.get('text')
        })
    });
    if (response.ok) {
        let option = await response.json();
        data.push(option);
        render(optionsTemplate(Object.values(data)), menu);
        e.target.reset();
    }
}

async function getData() {
    try {
        let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
        if (response.ok) {
            return await response.json();
        } else {
            let error = await response.json();
            throw error(response.message);
        }

    } catch (error) {
        console.error(error.message);
    }
}