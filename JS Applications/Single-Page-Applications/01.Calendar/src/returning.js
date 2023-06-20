import { hideElement,showElement } from "./visibility.js";

function setupReturn(el, previousSection) {
    let title = el.querySelector('caption');

    title.addEventListener('click', () => {
        hideElement(el);
        showElement(previousSection);
    });
}

export { setupReturn }