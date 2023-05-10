function addItem() {
    let inputElement = document.getElementById('newItemText');
    let inputTextValue = inputElement.value;
    inputElement.value = "";
    let liElement = document.createElement('li');
    liElement.textContent = inputTextValue;
    let aElement = document.createElement('a');
    aElement.href = "#";
    aElement.textContent = "[Delete]";
    aElement.addEventListener('click',deleteElement);
    function deleteElement(e){
        let currLiElement = e.target.parentNode;
        currLiElement.remove();
    }
    liElement.appendChild(aElement);
    let listElement = document.getElementById('items');
    listElement.appendChild(liElement);
}