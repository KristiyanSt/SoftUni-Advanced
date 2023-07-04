import {render, html } from './../node_modules/lit-html/lit-html.js';

const  createBookFormTemplate = (onCreate) => html`<form @submit=${onCreate} id="add-form">
<h3>Add book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Submit">
</form>`;

const editBookTemplate = (book, onEdit) => html`<form id="edit-form" @submit=${onEdit}>
<input type="hidden" name="id" .value=${book._id}>
<h3>Edit book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title..." .value=${book.title}>
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author..." .value=${book.author}>
<input type="submit" value="Save" >
</form>`;

const bookTemplate = ([id,book], editBook, deleteBook) => html`<tr class="book" id=${id}>
<td>${book.title}</td>
<td>${book.author}</td>
<td>
    <button @click=${editBook}>Edit</button>
    <button @click=${deleteBook}>Delete</button>
</td>
</tr>`;

export {
    render,
    createBookFormTemplate,
    editBookTemplate,
    bookTemplate
}