import { getMemes } from '../data.js'
import { html, until } from '../lib.js'

const homeTemplate = (memesPromise) => html`
<section id="meme-feed">
    ${until(memesPromise(), html`<h3 class="loading">Loading &hellip;</h3>`)}
</section>`;

const memesTemplate = (memes) => html`
            ${memes.length > 0 ? html`<h1>All Memes</h1>` : null}
            <div id="memes">
            ${memes.length > 0 ? memes.map(memeCard) : html`<p class="no-memes">No memes in database.</p>`}
			</div>`;


const memeCard = (meme) => html`
<div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${meme.title}</p>
                            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${meme._id}">Details</a>
                        </div>
                    </div>
                </div>`

export async function homePage(ctx) {
    ctx.render(homeTemplate(loadMemes));
}
async function loadMemes() {
    return memesTemplate(await getMemes());
}