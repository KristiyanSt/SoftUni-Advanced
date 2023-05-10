function attachGradientEvents() {
    let divElement = document.getElementById('gradient-box');
    let resultElement = document.getElementById('result');
    divElement.addEventListener('mousemove',(e)=>{
        let currentPosition = e.offsetX;
        let width = e.target.clientWidth;
        let percent = Math.floor(currentPosition / width * 100);
        resultElement.textContent = percent + "%";
    });
}