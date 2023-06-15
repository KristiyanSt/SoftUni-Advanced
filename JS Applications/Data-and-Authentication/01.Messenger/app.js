function attachEvents() {
    let nameInput = document.querySelector('input[name="author"]');
    let messageInput = document.querySelector('input[name="content"]');
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', postMessage);
    refreshBtn.addEventListener('click', getMessages);

    function postMessage(){
        fetch('http://localhost:3030/jsonstore/messenger',{
            'method':'post',
            'headers':{
                'Content-Type':'application/json'
            },
            'body': JSON.stringify({
                author: nameInput.value,
                content: messageInput.value
            })
        });
    }
    function getMessages(){
        fetch('http://localhost:3030/jsonstore/messenger')
        .then(response=> response.json())
        .then(data => {
            let messages = Object.values(data).map( m => `${m.author}: ${m.content}`);
            document.getElementById('messages').textContent = messages.join('\n');
        })
    }
}

attachEvents();