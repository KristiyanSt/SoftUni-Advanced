function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', displayPhonebookData);
    createBtn.addEventListener('click', createPhonebookEntry);

    async function displayPhonebookData() {
        let data = await getPhonebookData();
        let phonebook = document.getElementById('phonebook');

        Object.entries(data).forEach(([key, personData]) => {
            let li = document.createElement('li');
            li.textContent = `${personData.person}: ${personData.phone}`;
            li.setAttribute('key', key);
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            li.appendChild(deleteBtn);
            phonebook.appendChild(li);
        });
        let deleteButtons = Array.from(document.querySelectorAll('li button'));
        deleteButtons.forEach(b => b.addEventListener('click', deleteEntryHandler));
    }
    async function getPhonebookData() {
        let response = await fetch('http://localhost:3030/jsonstore/phonebook');
        let data = await response.json();
        return data;
    }
    async function createPhonebookEntry() {
        let inputPerson = document.getElementById('person');
        let inputPhone = document.getElementById('phone');

        postPersonData(inputPerson.value, inputPhone.value);
    }
    async function postPersonData(person, phone) {
        let response = fetch('http://localhost:3030/jsonstore/phonebook', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                person,
                phone
            })
        });

        let data = await response.json();
        console.log(data);

    }
    async function deleteEntryHandler(e) {
        let li = e.target.parentElement;
        let response = await fetch(`http://localhost:3030/jsonstore/phonebook/${li.getAttribute('key')}`);
        if (response.status == 200) {
            li.remove();
        }
    }
}

attachEvents();