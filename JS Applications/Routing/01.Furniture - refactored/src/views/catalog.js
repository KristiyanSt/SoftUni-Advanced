import { getAllFurniture, getMine } from "../data.js";
import { html, until } from "../lib.js";
import { parseQueryString } from "../utils.js";

const catalogTemplate = (furniturePromise, isMyFurniture, onSearch, search, page) => html` <div class="row space-top">
<div class="col-md-12">
    ${isMyFurniture ? html`<h1>My Furniture</h1>
    <p>This is a list of your publications.</p>`
        : html`<h1>Welcome to Furniture System</h1>
    <p>Select furniture from the catalog to view details.</p>`}
    <div class="search">
        <form @submit=${onSearch}>
            <input type="text" name="search" .value=${search}>
            <input type="submit" value="Search">
        </form>
    </div>
</div>
</div>
<div class="row space-top">
    ${until(furniturePromise(isMyFurniture, page, search), html`<h2>Loading &hellip;</h2>`)}
</div>`;

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
</div>`;

const pagesTemplate = (page, pages, search) => html`
<div class="page-btn">
        ${page > 1 ? html`<a class="page btn btn-info" href=${createPageHref(page,-1,search)}>&lt; Prev</a>` : null}
        ${page < pages ? html`<a class="page btn btn-info" href=${createPageHref(page, 1,search)}>Next &gt;</a>` : null}
</div>`;

function createPageHref(page, step, search) {
    return `?page=${page + step}` + (search ? `&search=${search}` : "");
}
export async function catalogPage(ctx) {
    const query = parseQueryString(ctx.querystring);
    const page = Number(query.page || 1);

    const search = query.search || "";

    const isMyFurniture = ctx.pathname == '/my-furniture';

    ctx.renderView(catalogTemplate(furniturePromise, isMyFurniture, onSearch, search, page));
    ctx.setUserNav();

    async function onSearch(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const search = formData.get('search').trim();
        if (search) {
            ctx.page.redirect(`?search=${search}`);
        } else {
            ctx.page.redirect('/');
        }
    }
}

async function furniturePromise(isMyFurniture, page, search) {
    let furniture = [];

    furniture = isMyFurniture
        ? await getMine() 
        : await getAllFurniture(page, search);

    if(furniture.data){
        return furniture.data.map(cardTemplate).concat(pagesTemplate(page, furniture.pages, search));
    }
    return furniture.map(cardTemplate);
}
