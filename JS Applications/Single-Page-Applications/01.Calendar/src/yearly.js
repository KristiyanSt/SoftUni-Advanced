import { setupReturn } from "./returning.js";
import { showElement } from "./visibility.js";
import { setupMonthlyView  } from "./monthly.js";

function setupYearlyView(currentYear, previousSection) {

    let yearlySection = document.getElementById(`year-${currentYear}`);

    showElement(yearlySection);
    setupReturn(yearlySection, previousSection);
    setupMonthlyView(currentYear,yearlySection);
}

export { setupYearlyView }