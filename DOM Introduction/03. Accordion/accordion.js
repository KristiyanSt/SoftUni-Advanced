function toggle() {
    let buttonEl = document.getElementsByClassName('button')[0];
    let extraEl = document.getElementById('extra');
    if (buttonEl.textContent == 'More') {
        extraEl.style.display = 'block';
        buttonEl.textContent = 'Less';
    } else {
        extraEl.style.display = 'none';
        buttonEl.textContent = 'More';
    }
}