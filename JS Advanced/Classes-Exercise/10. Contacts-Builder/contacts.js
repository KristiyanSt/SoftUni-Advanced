class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    }
    get online() {
        return this._online;
    }
    set online(boolean) {
        if (boolean) {
            this.divTitle.setAttribute('class', 'title online');
            this._online = true;
        } else {
            this.divTitle.setAttribute('class', 'title');
            this._online = false;
        }
    }
    render(id) {
        let mainDiv = document.getElementById(id);
        let article = document.createElement('article');

        let divTitle = document.createElement('div');
        this.divTitle = divTitle;
        divTitle.setAttribute('class', "title");
        divTitle.textContent = `${this.firstName} ${this.lastName}`;
        let button = document.createElement('button');
        button.innerHTML = '&#8505';
        divTitle.appendChild(button);

        let divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'info');
        divInfo.style.display = 'none';
        let spanPhone = document.createElement('span');
        spanPhone.textContent = `${this.phone}`;
        spanPhone.innerHTML = `&#9742 ${this.phone}`
        let spanEmail = document.createElement('span');
        spanEmail.innerHTML = `&#9993; ${this.email}`;
        divInfo.appendChild(spanPhone);
        divInfo.appendChild(spanEmail);

        article.appendChild(divTitle);
        article.appendChild(divInfo);
        mainDiv.appendChild(article);

        button.addEventListener('click', () => {
            divInfo.style.display = divInfo.style.display === 'none'
                ? 'block'
                : 'none'
        })
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);
