import { html, until } from "../lib.js";
import { getUserData } from "../utils.js";
import { getProfileMemes, getProfileMemesCount } from "../data.js"

const profileTemplate = (profilePromise) => html`
<section id="user-profile-page" class="user-profile">
        ${until(profilePromise(), html`<h3 class="loading">Loading &hellip;</h3>`)}
        </section>`;

const profileInfoTemplate = (user, count, memes) => html`
<article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src=${user.gender == 'male' ? '/images/male.png' : '/images/female.png'}>
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${count}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
               ${count > 0 ? memes.map(userMemeTemplate) : html`<p class="no-memes">No memes in database.</p>`}
            </div>`

const userMemeTemplate = (meme) => html`
<div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
                    <a class="button" href="/details/${meme._id}">Details</a>
</div>`

export async function profilePage(ctx) {
    ctx.render(profileTemplate(profilePromise));

    async function profilePromise() {
        const user = getUserData();

        if (user) {
            const [memes, count] = await Promise.all([
                getProfileMemes(user._id),
                getProfileMemesCount(user._id)]);

            return profileInfoTemplate(user, count, memes);
        }
    }
}