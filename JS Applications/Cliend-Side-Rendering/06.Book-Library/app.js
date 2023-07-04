import { render, createBookFormTemplate, bookTemplate, editBookTemplate } from './templates.js';

let books = [];

let formsContainer = document.getElementById('forms');
render(createBookFormTemplate(onCreate), formsContainer);

let tbody = document.getElementById('tbody');
let submitButton = document.getElementById('loadBooks');
submitButton.addEventListener('click', loadBooks);

async function loadBooks() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');
    books = Object.entries(await response.json());
    render(books.map(b => bookTemplate(b, editBook, deleteBook)), tbody);
}
async function editBook(e) {
    let id = e.target.closest('.book').id;
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`);
    let book = await response.json();
    book._id = id;
    render(editBookTemplate(book, onEdit), formsContainer);
}
async function deleteBook(e) {
    let id = e.target.closest('.book').id;
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    });

    let bookIndex = books.findIndex(b => b.includes(id));
    books.splice(bookIndex, 1);
    render(books.map(b => bookTemplate(b, editBook, deleteBook)), tbody);
}
async function onEdit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let id = formData.get('id');
    let book = {
        author: formData.get('author'),
        title: formData.get('title')
    }
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'put',
        body: JSON.stringify(book)
    });
    await loadBooks();
    render(createBookFormTemplate(onCreate), formsContainer);
}
async function onCreate(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let author = formData.get('author');
    let title = formData.get('title');

    if (author.trim() !== "" && title.trim() !== "") {
        let body = {
            title: title,
            author: author
        }
        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let book = await response.json();
        let bookEntry = [book._id, { title: book.title, author: book.author }];
        books.push(bookEntry);
        render(books.map(b => bookTemplate(b, editBook, deleteBook)), tbody);
        e.target.reset();
    }
}
