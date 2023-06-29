import { editRecipe } from './edit.js';
import { getFullRecipe, getRecipes } from '../api/data.js';
import { deleteRecipe } from './delete.js';

let section = document.querySelector('#catalog');
let navElement = document.querySelector('#catalogNav');
let context = undefined;

export async function showCatalog(ctx){
    context = ctx;
    await loadRecipes();
    context.setActiveNav(navElement);
    context.showSection(section);
}
async function loadRecipes() {
    let recipes = await getRecipes();
    
    let fragment = new DocumentFragment();
    
    for (const recipe of Object.values(recipes)) {
        fragment.appendChild(createPreviewArticle(recipe));
    }
    section.replaceChildren(fragment);
}
function createPreviewArticle(recipe) {
    let article = ce('article', { className: 'preview', 'onClick': async () => article.replaceWith(await createFullArticle(recipe._id)) },
        ce('div', { className: 'title' }, ce('h2', undefined, recipe.name)),
        ce('div', { className: 'small' }, ce('img', { src: recipe.img })));

    return article;
}
async function createFullArticle(id) {

    let fullRecipe = await getFullRecipe(id);

    let article = ce('article', undefined,
        ce('h2', undefined, fullRecipe.name),
        ce('div', { className: 'band' },
            ce('div', { className: 'thumb' },
                ce('img', { src: fullRecipe.img })),
            ce('div', { className: 'ingredients' },
                ce('h3', undefined, 'Ingredients:'),
                ce('ul', undefined, fullRecipe.ingredients.map(ingr => ce('li', undefined, ingr))))),
        ce('div', { className: 'description' },
            ce('h3', undefined, 'Preparation:'),
            fullRecipe.steps.map(step => ce('p', undefined, step))));

    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && fullRecipe._ownerId == user._id ) {
        article.appendChild(ce('div', { className: 'controls' }, ce('button', { 'onClick': () => editRecipe(context, fullRecipe._id) }, '\u270E Edit'), ce('button', {'onClick': () => deleteRecipe(context, id,fullRecipe.name)}, '\u2716 Delete')));
    }

    return article;
}
function ce(type, attributes, ...content) {

    let element = document.createElement(type);

    if (content !== undefined) {

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(el => {
            if (typeof el == 'string' || typeof el == 'number') {
                const node = document.createTextNode(el);
                element.appendChild(node);
            } else {
                element.appendChild(el);
            }
        });
    }

    if (attributes != undefined) {
        Object.keys(attributes).forEach(key => {
            if (key.slice(0, 2) == 'on') {
                element.addEventListener(key.slice(2,).toLowerCase(), attributes[key]);
            } else {
                element[key] = attributes[key]
            }
        });
    }
    return element;
}
