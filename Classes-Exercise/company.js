class Company {
    constructor() {
        this.departments = {};
    }
    addEmployee(name, salary, position, department) {
        let inputs = [name, salary, position, department];
        if (inputs.some(x => x === '' || x === null || x === undefined) || salary < 0) {
            throw new Error("Invalid input!");
        }
        if (!this.departments[department]) {
            this.departments[department] = {};
        }
        this.departments[department][name] = [salary, position];
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }
    bestDepartment() {
        let biggestAverageSalary = Number.MIN_SAFE_INTEGER;
        let bestDepartmentName = '';

        for (const department in this.departments) {
            let salaries = 0;
            let employeesCount = 0;

            for (const employee in this.departments[department]) {
                let [salary, position] = this.departments[department][employee];
                salaries += salary;
                employeesCount += 1;
            }

            let averageSalary = salaries / employeesCount;
            if (biggestAverageSalary < averageSalary) {
                biggestAverageSalary = averageSalary;
                    bestDepartmentName = department;
            }
        }
        let employeesEntries = Object.entries(this.departments[bestDepartmentName]);
        let sortedEmployeesEntries = employeesEntries.sort((a,b) => {
            return b[1][0] - a[1][0] || a[0].localeCompare([b][0]);
        });

        let bestDepartmentString = `Best Department is: ${bestDepartmentName}\nAverage salary: ${biggestAverageSalary.toFixed(2)}\n`;
        let employeesString = sortedEmployeesEntries.map(el => {
            let name = el[0];
            let salary = el[1][0];
            let position = el[1][1];
            return `${name} ${salary} ${position}`;
        })
            .join('\n');
        bestDepartmentString+= employeesString;
        return bestDepartmentString;
    }
}
let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
