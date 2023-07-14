import { deleteFurniture, getDetails } from '../data.js';
import { html, until, nothing } from '../lib.js';
import { getUserData } from '../utils.js';

const editTemplate = (itemPromise) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
${until(itemPromise(), html`<h2>Loading &hellip;</h2>`)}
</div>`

const detailsCardTemplate = (item, isOwner, onDelete) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${(item.img).substring(1)} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${item.make}</span></p>
    <p>Model: <span>${item.model}</span></p>
    <p>Year: <span>${item.year}</span></p>
    <p>Description: <span>${item.description}</span></p>
    <p>Price: <span>${item.price}</span></p>
    <p>Material: <span>${item.material}</span></p>
    ${isOwner
        ? html`<div>
    <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
    </div>`
        : nothing}
</div>`

export async function detailsPage(ctx) {

    ctx.renderView(editTemplate(loadItem));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this furniture?');
        if(choice){
            await deleteFurniture(id);
            ctx.page.redirect('/');
        }
    }
    async function loadItem() {
        let id = ctx.params.id;
        let item = await getDetails(id);
        let user = getUserData();
        let isOwner;
        
        if(user){
            isOwner = user._id == item._ownerId;

        }
        return detailsCardTemplate(item, isOwner, onDelete);

    }
}
