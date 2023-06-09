window.addEventListener('load', solve);

function solve() {
    let formButton = document.getElementById('add');

    formButton.addEventListener('click',formButtonHandler);


    function formButtonHandler(e){
        e.preventDefault();
        
        let inputModel = document.getElementById('model');
        let inputYear = document.getElementById('year');
        let textAreaDesc = document.getElementById('description');
        let inputPrice = document.getElementById('price');

        if(inputModel.value === "" 
        || inputYear.value === "" 
        || textAreaDesc.value === "" 
        || inputPrice.value === "" 
        || Number(inputYear.value) <= 0 
        || Number(inputPrice.value) <= 0){
             return
        }

        let tBody = document.getElementById('furniture-list');

        let tRow = document.createElement('tr');
        tRow.classList.add('info');

        let modelTd = document.createElement('td');
        modelTd.textContent = inputModel.value;
        tRow.appendChild(modelTd);

        let priceTd = document.createElement('td');
        priceTd.textContent =  Number(inputPrice.value).toFixed(2);
        tRow.appendChild(priceTd);

        let buttonsTd = document.createElement('td');

        let infoButton = document.createElement('button');
        infoButton.classList.add('moreBtn');
        infoButton.textContent = 'More Info';

        let buyButton = document.createElement('button');
        buyButton.classList.add('buyBtn');
        buyButton.textContent = 'Buy it';

        buttonsTd.appendChild(infoButton);
        buttonsTd.appendChild(buyButton);

        tRow.appendChild(modelTd);
        tRow.appendChild(priceTd);
        tRow.appendChild(buttonsTd);

        let tRowHide = document.createElement('tr');
        tRowHide.classList.add('hide');

        let yearTd = document.createElement('td');
        yearTd.textContent = `Year: ${inputYear.value}`;

        let descTd = document.createElement('td');
        descTd.setAttribute('colspan',3);
        descTd.textContent = `Description: ${textAreaDesc.value}`;

        tRowHide.appendChild(yearTd);
        tRowHide.appendChild(descTd);

        tBody.appendChild(tRow);
        tBody.appendChild(tRowHide);

        inputModel.value = "";
        inputPrice.value = "";
        textAreaDesc.value = "";
        inputYear.value = "";

        infoButton.addEventListener('click', infoButtonHandler);
        buyButton.addEventListener('click', buyButtonHandler);
    }
    function infoButtonHandler(e){
        let tRow = e.currentTarget.parentElement.parentElement;
        let tRowHide = tRow.nextElementSibling;

        if(tRowHide.style.display === "contents"){
            e.target.textContent = 'More Info';
            tRowHide.style.display = "none";
        }else{
            e.target.textContent = 'Less Info'; 
            tRowHide.style.display = "contents";
        }
    }
    function buyButtonHandler(e){
        let tRow = e.currentTarget.parentElement.parentElement;
        let tRowHide = tRow.nextElementSibling;
        let price = e.currentTarget.parentElement.previousElementSibling.textContent;
        let totalPriceTd = document.querySelector('.total-price');
        totalPriceTd.textContent = (Number(totalPriceTd.textContent) + Number(price)).toFixed(2);

        tRow.remove();
        tRowHide.remove();
    }
}
