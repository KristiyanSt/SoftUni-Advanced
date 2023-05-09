function subtract() {
    let firstNum = Number(document.getElementById('firstNumber').value);
    let secondNum = Number(document.getElementById('secondNumber').value);
    let resultNumEl = document.getElementById('result');
    resultNumEl.textContent = firstNum - secondNum;
}