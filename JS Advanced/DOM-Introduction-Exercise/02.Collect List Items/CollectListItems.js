function extractText() {
    let listElement = document.getElementById('items');
    let items = Array.from(listElement.getElementsByTagName('li'));
    let itemsContents = items.reduce((acc,a)=>{
        acc.push(a.textContent);
        return acc;
    },[])
    let textAreaElement = document.getElementById('result');
    textAreaElement.textContent = itemsContents.join('\n');
}