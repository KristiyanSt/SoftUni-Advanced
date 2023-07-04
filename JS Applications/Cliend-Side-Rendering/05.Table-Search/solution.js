import { render, tableBodyTemplate } from './templates.js';

let tbody = document.querySelector('#users tbody');
let searchField = document.querySelector('#searchField');
let searchButton = document.querySelector('#searchBtn');
searchButton.addEventListener('click', searchHandler);
let users;

users = await getData();

render(tableBodyTemplate(Object.values(users)), tbody);

async function searchHandler() {
   let value = searchField.value.toLowerCase();
   if (value.trim() !== "") {
      let usersCopy = Object.values(users).map(s => Object.assign({}, s));
      let matched = usersCopy.filter(u => Object.values(u).some(v => v.toLowerCase().includes(value)));
      
      matched.forEach(m => m.class = 'select');
      render(tableBodyTemplate(usersCopy), tbody);
   }
}
async function getData() {
   let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   return await response.json();
}