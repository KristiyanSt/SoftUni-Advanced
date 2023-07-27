import { deleteFact, getLikes, getUserLikes, postLike, readFactById } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (fact, onDelete, isOwner, likes, onLike, liked) => html`
<section id="details">
      <div id="details-wrapper">
            <img id="details-img" src=${fact.imageUrl} alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${fact.description}
                </p>
                <p id ="more-info">
                    ${fact.moreInfo}
                </p>
              </div>

                <h3>Likes:<span id="likes">${likes}</span></h3>

               <!--Edit and Delete are only for creator-->
               <div id="action-buttons">
                  ${isOwner != null
    ? isOwner ? controlsTemplate(fact, onDelete) : liked == 0
      ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
      : null
    : null}
                </div>
            </div>
      </div>
</section>`;

const controlsTemplate = (fact, onDelete) => html`
<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
<a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`;

export async function detailsPage(ctx) {

  const fact = await readFactById(ctx.params.id);
  fact.imageUrl = '..' + fact.imageUrl;

  let isOwner;
  let likes;
  let liked;

  const user = getUserData();
  if (user) {
    isOwner = user._id == fact._ownerId;
  }

  update();

  async function onDelete() {
    let choice = confirm("Are you sure you want to delete this article?");

    if (choice) {
      await deleteFact(ctx.params.id);
      ctx.page.redirect('/dashboard');
    }
  }
  async function onLike() {
    await postLike(ctx.params.id);
    update();
  }
  async function update() {
    if(user) {
      [likes, liked] = await Promise.all([
        getLikes(ctx.params.id),
        getUserLikes(user._id, ctx.params.id)]);
    } else {
      likes = await getLikes(ctx.params.id);
    }

    ctx.render(detailsTemplate(fact, onDelete, isOwner, likes, onLike, liked));
  }
}