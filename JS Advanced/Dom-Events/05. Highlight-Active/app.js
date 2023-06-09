function focused() {
    let inputElements = document.querySelectorAll('div input');
    for (const el of inputElements) {
        let currentDivEl = el.parentNode;
        el.addEventListener('focus',(e)=>{
            currentDivEl.classList.add("focused");
        });
        el.addEventListener('blur',(e)=>{
            currentDivEl.classList.remove("focused");
        });
    }
}