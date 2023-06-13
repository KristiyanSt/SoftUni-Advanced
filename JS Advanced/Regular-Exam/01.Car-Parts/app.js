window.addEventListener('load', solve);

function solve() {
        let form = document.querySelector('.container-text form');
        let button = form.querySelector('#next-btn');
        let textLabels = {

        }
        button.addEventListener('click', (e) => {
                e.preventDefault();

                let carModelInput = form.querySelector("#car-model");
                let carYearInput = form.querySelector("#car-year");
                let partNameInput = form.querySelector("#part-name");
                let partNumberInput = form.querySelector("#part-number");
                let conditionInput = form.querySelector("#condition");

                let isInputsValid = carYearInput.value >= 1980 && carYearInput.value <= 2023
                        && carModelInput.value.trim() !== ""
                        && partNameInput.value.trim() !== ""
                        && partNumberInput.value.trim() !== ""
                        && conditionInput.value !== "";

                if (isInputsValid) {
                        let image = document.querySelector('#complete-img');
                        let p = document.querySelector("#complete-text");
                        if (image.style.visibility === 'visible') {
                                image.style.visibility = 'hidden';
                                p.textContent = "";
                        }

                        button.setAttribute('disabled', true);
                        let infoUl = document.querySelector(".info-list")

                        let li = document.createElement('li');
                        li.classList.add('part-content');

                        let article = document.createElement('article');

                        let inputs = Array.from(form.querySelectorAll('input'));
                        inputs.push(conditionInput);
                        let labels = Array.from(form.querySelectorAll('label'));

                        inputs.forEach((input, index) => {
                                let labelText = labels[index].textContent;
                                labelText += " " + input.value;

                                let p = document.createElement('p');
                                p.textContent = labelText;
                                article.appendChild(p);
                                input.value = "";
                        });

                        let editButton = document.createElement('button');
                        editButton.classList.add('edit-btn');
                        editButton.textContent = 'Edit';

                        let continueButton = document.createElement('button');
                        continueButton.classList.add('continue-btn');
                        continueButton.textContent = 'Continue';

                        li.appendChild(article);
                        li.appendChild(editButton);
                        li.appendChild(continueButton);
                        infoUl.appendChild(li);

                        editButton.addEventListener('click', () => {
                                let paragraphs = Array.from(li.querySelectorAll('article p'));
                                console.log(paragraphs);
                                inputs.forEach((input, index) => {
                                        let splittedText = paragraphs[index].textContent.split(': ');
                                        splittedText.shift();
                                        input.value = splittedText.join(': ');
                                })
                                button['disabled'] = false;
                                li.innerText = "";
                        });
                        continueButton.addEventListener('click', () => {
                                let confirmUl = document.querySelector('.confirm-list');
                                confirmUl.appendChild(li);
                                infoUl.innerText = "";
                                editButton.remove();
                                continueButton.remove();

                                let confirmButton = document.createElement('button');
                                confirmButton.textContent = 'Confirm';
                                confirmButton.classList.add('confirm-btn');

                                let cancelButton = document.createElement('button');
                                cancelButton.textContent = 'Cancel';
                                cancelButton.classList.add('cancel-btn');

                                li.appendChild(confirmButton);
                                li.appendChild(cancelButton);

                                confirmButton.addEventListener('click', () => {
                                        li.remove();
                                        button['disabled'] = false;
                                        image.style.visibility = 'visible';

                                        p.textContent = "Part is Ordered!";
                                });
                                cancelButton.addEventListener('click', () => {
                                        li.remove();
                                        button['disabled'] = false;
                                })
                        })
                }

        })


};






