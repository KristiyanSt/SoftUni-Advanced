function solve() {
  let textAreaElements = document.querySelectorAll('#exercise  textarea');
  let inputTextArea = textAreaElements[0];
  let resultTextArea = textAreaElements[1];
  let buttons = document.querySelectorAll('#exercise button');
  let generateButton = buttons[0];
  let buyButton = buttons[1];
  let tBody = document.querySelector('.table tbody');
  generateButton.addEventListener('click', addItems);
  buyButton.addEventListener('click',buyItems);

  function buyItems(){
    let inputFields = Array.from(tBody.querySelectorAll('input'));
    let checkedInputFields = inputFields.filter(f=>f.checked);
    let rows = checkedInputFields.map(el=>el.parentElement.parentElement);
    let names = rows.map(el=>el.querySelector('td:nth-of-type(2) p').textContent)
                    .join(', ');

    let prices = rows.map(el=>el.querySelector('td:nth-of-type(3) p').textContent)
                    .map(x=>Number(x))  
                    .reduce((acc,a)=>acc + a);

    let decFactors = rows.map(el=>el.querySelector('td:nth-of-type(4) p').textContent)
                        .map(x=>Number(x))
                        .reduce((acc,a)=>acc+a) / rows.length;
    
    let boughtFurnitureString = `Bought furniture: ${names}`;
    let totalPriceString = `Total price: ${prices.toFixed(2)}`;
    let decorationFactorString = `Average decoration factor: ${decFactors}`;
    resultTextArea.value = `${boughtFurnitureString}\n${totalPriceString}\n${decorationFactorString}`;
  }
  function addItems() {
    let itemsArray = JSON.parse(inputTextArea.value);

    for (const item of itemsArray) {
      let tr = document.createElement('tr');
      
      let tdImg = document.createElement('td');
      let img = document.createElement('img');
      img.src = item.img;
      tdImg.appendChild(img);
      tr.appendChild(tdImg);

      let tdName = document.createElement('td');
      let pName = document.createElement('p');
      pName.textContent = item.name;
      tdName.appendChild(pName);
      tr.appendChild(tdName);

      let tdPrice = document.createElement('td');
      let pPrice = document.createElement('p');
      pPrice.textContent = item.price;
      tdPrice.appendChild(pPrice);
      tr.appendChild(tdPrice);

      let tdDec= document.createElement('td');
      let pDec = document.createElement('p');
      pDec.textContent = item.decFactor;
      tdDec.appendChild(pDec);
      tr.appendChild(tdDec);

      let tdInput= document.createElement('td');
      let input = document.createElement('input');
      input.type = "checkbox";
      tdInput.appendChild(input);
      tr.appendChild(tdInput);
      tBody.appendChild(tr);
    }
  }
}