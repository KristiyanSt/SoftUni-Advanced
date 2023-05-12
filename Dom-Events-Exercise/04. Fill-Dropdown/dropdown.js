function addItem() {
    let inputTextElement = document.getElementById('newItemText');
    let inputValueElement = document.getElementById('newItemValue');
    let selectElement = document.getElementById('menu');
    let optionElement = document.createElement('option');
    optionElement.value = inputValueElement.value;
    optionElement.textContent = inputTextElement.value;
    inputTextElement.value = "";
    inputValueElement.value = "";
    selectElement.appendChild(optionElement);
    console.log(optionElement);
}