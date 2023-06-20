import { setupYearlyView } from "./src/yearly.js";
import { hideElement } from "./src/visibility.js";

showYearsCalendar();

function showYearsCalendar(){
    let sections = document.querySelector('body').querySelectorAll('section');

    sections.forEach((el, index) => {
        el.style.display = index !== 0
            ? 'none'
            : 'display';
    });
}

let yearsCalendar = document.getElementById('years');

let years = [...yearsCalendar.querySelectorAll('.day .date')]
.map(el => el.textContent);


yearsCalendar.addEventListener('click', (e) => {

    let year = (e.target.textContent).trim();

    if (years.includes(year)) {
        hideElement(e.currentTarget);
        setupYearlyView(year, yearsCalendar);
    }
});