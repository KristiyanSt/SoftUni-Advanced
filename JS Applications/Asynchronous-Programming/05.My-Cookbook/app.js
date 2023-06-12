window.onload = loadRecipes;

function loadRecipes(){
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        .then(response => response.json())
        .then(recipes => {
            let main = document.querySelector('main');
            main.innerHTML = "";
            for (const recipe of Object.values(recipes)) {
                createPreviewArticle(recipe);
            }
        });
}

function createPreviewArticle(recipe){
    let main = document.querySelector('main');

    let article = document.createElement('article');
    article.classList.add('preview');

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    let h2 = document.createElement('h2');
    h2.textContent = recipe.name;

    let smallDiv = document.createElement('div');
    smallDiv.classList.add('small');

    let img = document.createElement('img');
    img.src = recipe.img;

    titleDiv.appendChild(h2);
    smallDiv.appendChild(img);

    article.appendChild(titleDiv);
    article.appendChild(smallDiv);
    main.appendChild(article);
    article.addEventListener('click',()=>{
        fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`)
        .then(response => response.json())
        .then(fullRecipe => {
            article.replaceWith(updateArticle(fullRecipe));
        });
    });

}
function updateArticle(fullRecipe){
    let article = document.createElement('article');

    let title = document.createElement('h2');
    title.textContent = fullRecipe.name;

    let bandDiv = document.createElement('div');
    bandDiv.classList.add('band');

    let thumbDiv = document.createElement('div');
    thumbDiv.classList.add('thumb');

    let img = document.createElement('img');
    img.src = fullRecipe.img;

    let ingredientsDiv = document.createElement('div');
    ingredientsDiv.classList.add('ingredients');

    let ingredientsH3 = document.createElement('h3');
    ingredientsH3.textContent = 'Ingredients:';

    let ingredientsUl = document.createElement('ul');
    fullRecipe.ingredients.forEach(el => {
        let li = document.createElement('li');
        li.textContent = el;
        ingredientsUl.appendChild(li);
    });

    let descDiv = document.createElement('div');
    descDiv.classList.add('description');

    let descH3 = document.createElement('h3');
    descH3.textContent = 'Preparation:';


    thumbDiv.appendChild(img);
    ingredientsDiv.appendChild(ingredientsH3);
    ingredientsDiv.appendChild(ingredientsUl);

    bandDiv.appendChild(thumbDiv);
    bandDiv.appendChild(ingredientsDiv);
    
    descDiv.appendChild(descH3);
    fullRecipe.steps.forEach(el => {
        let p = document.createElement('p');
        p.textContent = el;
        descDiv.appendChild(p);
    });

    article.appendChild(title);
    article.appendChild(bandDiv);
    article.appendChild(descDiv);

    return article;
}
