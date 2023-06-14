let form = document.querySelector('form');
let formData = new FormData(form);

form.addEventListener('submit', loginHandler);

function loginHandler(e){
    e.preventDefault();

    let formData = new FormData(form);
    let body = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    fetch(`http://localhost:3030/users/login`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data=> {
        if(data.code){
            throw new Error(data.message);
        }
        sessionStorage.authToken = data.accessToken;
        window.location.pathname = 'index.html';
    })
    .catch(err=>console.error(err.message));
}