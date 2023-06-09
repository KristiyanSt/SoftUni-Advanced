function sumTable() {
    let prices = Array.from(document.querySelectorAll('td:nth-of-type(2n)'));
    prices.pop();
    let sumElement = document.getElementById('sum');
    sumElement.textContent = prices.reduce((acc,a)=>{
        return acc+= Number(a.textContent);
    },0)
}