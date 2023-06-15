let loadBooksBtn = document.getElementById('loadBooks');
loadBooksBtn.addEventListener('click', getBooks);
let form = document.querySelector('form');
let inputTitle = form.querySelector('input[name="title"]');
let inputAuthor = form.querySelector('input[name="author"]');
let submitBtn = form.querySelector('button');
submitBtn.addEventListener('click', createBook);

async function createBook(e) {
    e.preventDefault();

    if (e.currentTarget.textContent == 'Submit') {
        if (inputTitle.value.trim() != "" && inputAuthor.value.trim() != "") {
            let body = {
                author: inputAuthor.value,
                title: inputTitle.value
            }
            let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
                'method': 'post',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify(body)
            });
            let bookData = await response.json();
            let tr = createTableRow(bookData);
            tr.dataset.id = bookData._id;
            document.querySelector('tbody').appendChild(tr);
        }
    } else {
        let body = {
            author: inputAuthor.value,
            title: inputTitle.value
        }
        console.log('ha')
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${form.dataset.id}`, {
            'method': 'put',
            'headers': {
                'content-type': 'application/json',
            },
            'body': JSON.stringify(body)
        })
        let data = await response.json();
    }
    let h3 = form.querySelector('h3');
    if (submitBtn.textContent != 'Submit') {
        h3.textContent = 'FORM';
        submitBtn.textContent = 'Submit';
        inputTitle.value = "";
        inputAuthor.value = "";
    }
}
async function getBooks() {
    let trs = Array.from(document.querySelectorAll('tbody tr'));
    trs.forEach(tr => tr.remove());

    let response = await fetch('http://localhost:3030/jsonstore/collections/books')
    let data = await response.json();

    Object.entries(data).forEach(([id, bookData]) => {
        let tr = createTableRow(bookData);
        tr.dataset.id = id;
        document.querySelector('tbody').appendChild(tr);
    });
}
async function editItem(e) {
    let h3 = form.querySelector('h3');
    h3.textContent = 'Edit FORM';

    submitBtn.textContent = 'Save';

    let currentTr = e.currentTarget.parentElement.parentElement;
    form.dataset.id = currentTr.dataset.id;

    inputTitle.value = currentTr.querySelector('#title').textContent;
    inputAuthor.value = currentTr.querySelector('#author').textContent;

}
async function deleteItem(e) {
    let currentTr = e.currentTarget.parentElement.parentElement;

    let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${currentTr.dataset.id}`,{
        'method':'delete'
    });
    let data = await response.json();
    currentTr.remove();
}
function createTableRow(bookData) {
    let book = ce('td', { 'id': 'title' }, bookData.title);
    let author = ce('td', { 'id': 'author' }, bookData.author);
    let buttonsTd = ce('td', undefined, ce('button', { 'onClick': editItem }, 'Edit'), ce('button', { 'onClick': deleteItem }, 'Delete'));
    let tr = ce('tr', undefined, book, author, buttonsTd);
    return tr;
}
function ce(type, attributes, ...content) {

    let element = document.createElement(type);

    if (content.length === 1) {
        if (['input', 'textarea'].includes(type)) {
            element.value = content[0];
        } else {
            element.textContent = content[0];
        }
    } else {
        content.forEach(el => element.appendChild(el));
    }
    if (attributes != undefined) {
        Object.keys(attributes).forEach(key => {
            if (key.slice(0, 2) == 'on') {
                element.addEventListener(key.slice(2,).toLowerCase(), attributes[key]);
            } else {
                element[key] = attributes[key]
            }
        });
    }
    return element;
}