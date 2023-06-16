let form = document.querySelector('form');
let formData = new FormData(form);

form.addEventListener('submit', loginHandler);

function loginHandler(e){
    e.preventDefault();

    let formData = new FormData(form);
    let body = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n').map(l => l.trim()).filter(l => l != ''),
        steps: formData.get('steps').split('\n').map(l => l.trim()).filter(l => l != '')
    }

    fetch('http://localhost:3030/data/recipes',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-Authorization' : sessionStorage.authToken
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data=> {
        if(data.code){
            throw new Error(data.message);
        }
        window.location.pathname = 'index.html';
    })
    .catch(err=>console.error(err.message));
}