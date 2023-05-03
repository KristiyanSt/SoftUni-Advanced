function calc() {
   let sumElement = document.getElementById('sum');
   let firstNum = Number(document.getElementById('num1').value);
   let secondNum = Number(document.getElementById('num2').value);
   sumElement.value = firstNum+secondNum;
}
