function toStringExtension() {
    function Person(name, email) {
        this.name = name;
        this.email = email;
    }    
    function Teacher(name,email,subject){
        Person.call(this,name,email);
        this.subject = subject;
    }
    Teacher.prototype = Object.create(Person.prototype);
    function Student(name,email,course){
        Person.call(this,name,email);
        this.course = course;
    }
    Student.prototype = Object.create(Person.prototype);

    Person.prototype.toString = function(){
        return `${this.name} (name: ${this.name}, email: ${this.email})`
    }
    Teacher.prototype.toString = function(){
        return `Teacher (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`
    }
    Student.prototype.toString = function(){
        return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`
    }

    return {
        Person,
        Teacher,
        Student
    }
}
let classes = toStringExtension()
let p = new classes.Person('greg','gregory');
console.log(p.toString())