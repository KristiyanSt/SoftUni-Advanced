class Employee {
    public name: string;
    public age: number;
    public salary: number;
    public tasks: string[];

    constructor(name: string, age: number, salary: number, tasks: string[]) {
        if (this.constructor === Employee) {
            throw new Error("This is an abstract class, it cannot be instantiated");
        }
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.tasks = tasks;
    }

    work(): void {
        this.tasks.forEach(task => {
            console.log(`${this.name} ${task}`);
        });
    }
    collectSalary(): void {
        console.log(`${this.name} received ${this.getSalary()} this month.`)
    }

    getSalary(): number {
        return this.salary;
    }
}

class Junior extends Employee {
    constructor(name: string, age: number, salary: number, tasks: string[]) {
        super(name, age, salary, tasks);
    }
}

class Senior extends Employee {
    constructor(name: string, age: number, salary: number, tasks: string[]) {
        super(name, age, salary, tasks);
    }
}

class Manager extends Employee {
    public dividend: number;
    constructor(name: string, age: number, salary: number, tasks: string[], dividend: number) {
        super(name, age, salary, tasks);
        this.dividend = dividend;
    }
    getSalary(): number {
        return this.salary + this.dividend;
    }
}

const junior = new Junior('Steve', 20, 1300, ['is working on a simple task.', 'is working on a complicated task.']);
junior.work();
junior.collectSalary();

const senior = new Senior('Josh', 27, 2800, ['is supervising junior workers.', 'scheduled a meeting.']);
senior.work();
senior.collectSalary();

const manager = new Manager("George", 32, 3300, ['is preparing a quarterly report.', 'is working on company time management efficiency'], 1000);
manager.work();
manager.collectSalary();

