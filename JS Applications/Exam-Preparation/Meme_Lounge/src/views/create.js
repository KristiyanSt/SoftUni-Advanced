import { postMeme } from '../data.js';
import { html} from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const createTemplate = (eventHandler, errMessage, errors) => html`
<section id="create-meme">
            <form id="create-form" @submit=${eventHandler}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input class=${errors.title ? 'is-invalid' : null} id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea class=${errors.description ? 'is-invalid' : null} id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input class=${errors.imageUrl ? 'is-invalid' : null} id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    ${errMessage ? html`<div><p class="error">${errMessage}</p></div>` : null}
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`;

export async function createPage(ctx) {
    update();

    async function onCreate(data) {
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
            const meme = await postMeme(data);
            ctx.page.redirect(`/details/${meme._id}`);
        } catch (err) {
            let message = err.message || err.error.message;
            update(message, errors);
        }
    }
    function update(errMessage = undefined, errors = {}) {
        ctx.render(createTemplate(createSubmitHandler(onCreate), errMessage, errors))
    }
}