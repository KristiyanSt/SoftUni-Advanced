import { deleteMeme, getMemeById } from '../data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (memePromise) => html`
<section id="meme-details">
            ${until(memePromise(), html`<h3 class="loading">Loading &hellip;</h3>`)}
        </section>`;

const memeTemplate = (meme, isOwner,onDelete) => html`
<h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>
                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${isOwner
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                            <button class="button danger" @click=${onDelete}>Delete</button>`
        : null}
                </div>
            </div>`;

export async function detailsPage(ctx) {
    let isOwner;
    let id = ctx.params.id;
    ctx.render(detailsTemplate(loadMeme, onDelete));
    
    async function onDelete() {
        deleteMeme(id);
        ctx.page.redirect('/');
    }
    async function loadMeme() {
        const user = getUserData();
        const meme = await getMemeById(id);
        if (user) {
            isOwner = meme._ownerId == user._id;
        }
        return memeTemplate(meme, isOwner,onDelete);
    }
}