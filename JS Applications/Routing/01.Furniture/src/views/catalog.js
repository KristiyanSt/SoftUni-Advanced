import { getAllFurniture, getMine } from "../data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (furniturePromise, isMyFurniture) => html` <div class="row space-top">
<div class="col-md-12">
    ${isMyFurniture ? html`<h1>My Furniture</h1>
                <p>This is a list of your publications.</p>`
        : html`<h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>`}
</div>
</div>
<div class="row space-top">
${until(furniturePromise(isMyFurniture), html`<h2>Loading &hellip;</h2>`)}
</div>`

const cardTemplate = (item) => html`<div class="col-md-4">
<div class="card text-white bg-primary">
    <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${item._id}" class="btn btn-info">Details</a>
            </div>
    </div>
</div>
</div>`

export async function catalogPage(ctx) {
    const isMyFurniture = ctx.pathname == '/my-furniture';
    ctx.renderView(catalogTemplate(furniturePromise, isMyFurniture));
    ctx.setUserNav();
}

async function furniturePromise(isMyFurniture) {
    if(isMyFurniture){
        let furniture = await getMine();
        return await furniture.map(cardTemplate);
    }else{
        let furniture = await getAllFurniture();
        return furniture.map(cardTemplate);
    }
}

