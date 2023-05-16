function solve() {
    let onScreenButton = document.querySelector('#container button');
    onScreenButton.addEventListener('click', addMovie);
    let clearButton = document.querySelector('#archive > button');
    clearButton.addEventListener('click',clearAll);
    function addMovie(e) {
        e.preventDefault();
        let nameInputEl = document.querySelector('input[placeholder="Name"]');
        let hallInputEl = document.querySelector('input[placeholder="Hall"]');
        let priceInputEl = document.querySelector('input[placeholder="Ticket Price"]');
        let moviesOnScreenList = document.querySelector('#movies ul');

        if (nameInputEl.value !== '' && hallInputEl.value !== '' && priceInputEl.value !== '' && !(isNaN(Number(priceInputEl.value)))) {
            let li = document.createElement('li');

            let span = document.createElement('span');
            span.textContent = nameInputEl.value;

            let strong = document.createElement('strong');
            strong.textContent = `Hall: ${hallInputEl.value}`;

            let div = document.createElement('div');
            let divStrong = document.createElement('strong');
            divStrong.textContent = `${(Number(priceInputEl.value)).toFixed(2)}`;

            let divInput = document.createElement('input');
            divInput.placeholder = "Tickets Sold";

            let divButton = document.createElement('button');
            divButton.textContent = 'Archive';

            div.appendChild(divStrong);
            div.appendChild(divInput);
            div.appendChild(divButton);

            li.appendChild(span);
            li.appendChild(strong);
            li.appendChild(div);

            moviesOnScreenList.appendChild(li);
            nameInputEl.value = '';
            hallInputEl.value= '';
            priceInputEl.value= '';
            divButton.addEventListener('click',archiveMovie)
        }
    }
    function archiveMovie(e){
        let archiveButton = e.target;
        let removeLi = archiveButton.parentElement.parentElement;
        let ticketsCountInput = archiveButton.previousElementSibling;
        if(ticketsCountInput.value !== '' && !isNaN(Number(ticketsCountInput.value))){
            let archiveUl = document.querySelector('#archive ul');
            let archiveLi = document.createElement('li');

            let archiveSpan = document.createElement('span');
            archiveSpan.textContent = removeLi.firstChild.textContent;
            let price = Number(ticketsCountInput.previousElementSibling.textContent);
            let archiveStrong = document.createElement('strong');
            archiveStrong.textContent = `Total amount: ${(price*Number(ticketsCountInput.value)).toFixed(2)}`;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
             
            archiveLi.appendChild(archiveSpan);
            archiveLi.appendChild(archiveStrong);
            archiveLi.appendChild(deleteButton);
            archiveUl.appendChild(archiveLi);
            removeLi.remove();

            deleteButton.addEventListener('click',deleteElement);
        }
    }
    function deleteElement(e){
        let deleteLi = e.target.parentElement;
        deleteLi.remove();
    }
    function clearAll(){
        let archiveLis = Array.from(document.querySelectorAll('#archive ul li'));
        for(let i =0;i<archiveLis.length;i++){
            archiveLis[i].remove();
        }
    }
    
}

