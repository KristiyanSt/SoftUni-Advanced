import { html, render, nothing } from 'http://unpkg.com/lit-html?module';
import {towns} from './towns.js';

let townsDiv = document.getElementById('towns');
let searchBtn = document.querySelector('button');
let inputField = document.querySelector('#searchText');

searchBtn.addEventListener('click', searchHandler);

function searchHandler(){
    let input = inputField.value;
    let townsList = Array.from(townsDiv.querySelectorAll('ul li'));
    let result = 0;
    townsList.forEach(li => {
        let substr = li.textContent.substring(0,input.length)
        if(substr.toLowerCase() == input.toLowerCase() ){
            li.classList.add('active');
            result++;
        }else{
            li.classList.remove('active');
        }
    });
    document.querySelector('#result').textContent = `${result} matches found`;
}

let listTemplate = (towns) => html`<ul>
${towns.map(t => html`<li>${t}</li>`)}
</ul>`;

render(listTemplate(towns),townsDiv);

