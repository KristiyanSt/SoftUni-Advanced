import { editMeme, getMemeById, postMeme } from '../data.js';
import { html, until } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (editPromise) => html`
<section id="edit-meme">
    ${until(editPromise, html`<h3 class="loading">Loading &hellip;</h3>`)}
</section>`

const formTemplate = (meme, eventHandler,message,errors) => html`
<form id="edit-form" @submit=${eventHandler}>
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input .value=${meme.title} class=${errors.title ? 'is-invalid' : null} id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea class=${errors.description ? 'is-invalid' : null} id="description" placeholder="Enter Description" name="description">
            ${meme.description}
        </textarea>
        <label for="imageUrl">Image Url</label>
        <input class=${errors.imageUrl ? 'is-invalid' : null} .value=${meme.imageUrl} id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
        ${message ? html`<div><p class="error">${message}</p></div>` : null}
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    update(meme);

    async function loadMeme(data, message,errors) {

        return formTemplate(data, createSubmitHandler(onEdit),message,errors);
    }

    async function onEdit(data) {
        let errors = {};

        let entries = Object.entries(data);
        let errorsEntries = entries.filter(([type, val]) => val.trim() == "");
        Object.assign(errors, errorsEntries.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {}));

        try {
            if (Object.keys(errors).length > 0) {
                throw {
                    error: new Error('All fields are required!'),
                    errors
                }
            }
            await editMeme(id, data);
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            let message = err.message || err.error.message;
            update(data ,message, errors);
        }
    }
    function update(data, message = undefined, errors = {}) {
        ctx.render(editTemplate(loadMeme(data, message,errors)))
    }

}