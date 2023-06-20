import { setupReturn } from "./returning.js";
import { hideElement, showElement } from "./visibility.js";

let monthSection = document.querySelector('.monthCalendar');

let months = [...monthSection.querySelectorAll('td .date')]
    .reduce((acc, el, index) => Object.assign(acc, { [el.textContent]: index + 1 }), {});

let invalidClassParts = ['months', 'days'];

function setupMonthlyView(year, yearlySection) {
    let body = yearlySection.querySelector('tbody');

    body.addEventListener('click', (e) => {

        if (!invalidClassParts.includes(e.target.className)) {
            hideElement(yearlySection);

            let monthString = (e.target.textContent).trim();
            let monthNumber = months[monthString];
            
            let daysSection = document.getElementById(`month-${year}-${monthNumber}`);

            showElement(daysSection);
            setupReturn(daysSection, yearlySection);
        }
    });
}

export { setupMonthlyView }