
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    Object.defineProperty(Person.prototype, 'fullName', {
        get: function () {
            return this.firstName + " " + this.lastName
        },
        set: function (value) {
            let validationRegex = /^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+$/;
            if (validationRegex.test(value)) {
                let [firstName, lastName] = value.split(' ');
                this.firstName = firstName;
                this.lastName = lastName;
            }
        }
    });
}
let person = new Person("Albert", "Simpson");
console.log(person.fullName); //Albert Simpson
person.firstName = "Simon";
console.log(person.fullName); //Simon Simpson
person.fullName = "Peter Ivanov";
console.log(person.firstName);  // Simon
console.log(person.lastName);  // Simpson



