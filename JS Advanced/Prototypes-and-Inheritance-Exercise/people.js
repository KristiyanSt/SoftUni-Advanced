function createEmployees(){
    class Employee{
        constructor(name,age,tasks){
            if(this.constructor === Employee){
                throw new Error('Cannot initiate directly');
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = tasks;
            this._index = 0;
        }
        work(){
            if(this._index >= this.tasks.length){
                this._index = 0;
            }
            console.log(this.tasks[this._index]);
            this._index++;
        }
        collectSalary(){
            console.log(`${this.name} received ${this.salary} this month.`);
        }
    }
    
    class Junior extends Employee{
        constructor(name,age){
            super(name,age,[`${name} is working on a simple task.`]);
        }
    }
    class Senior extends Employee{
        constructor(name,age){
            super(name,age,[`${name} is working on a complicated task.`,
            `${name} is taking time off work.`,
            `${name} is supervising junior workers.`]);
        }
    }
    class Manager extends Employee{
        constructor(name,age){
            super(name,age,[`${name} scheduled a meeting.`,
            `${name} is preparing a quarterly report.`]);
            this.dividend = 0;
        }
        collectSalary(){
            console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
        }
    }
    return {Employee,Junior,Senior,Manager}
}
const classes = createEmployees(); 
let manager = new classes.Manager('Tom',22);
manager.salary = 1200
console.log(manager.hasOwnProperty('salary'))
manager.dividend = 12;
console.log(manager.salary)

let emp = new classes.Employee(); // Should throw an error
 




