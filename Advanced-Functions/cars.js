function createCarsObjects(input){
    let cars = {};
    let createCarsModel = {
        create: function (name) {
            cars[name] = {};
        },
        inherit: function (name, parentName) {
            cars[name] = Object.create(cars[parentName]);
        },
        set: function (name, key, value) {
            cars[name][key] = value;
        },
        print: function (name) {
            let entries = [];
            for (const key in cars[name]) {
                entries.push(`${key}:${cars[name][key]}`);
            }
            console.log(entries.join(', '));
        }
    }
    for (const commandString of input) {
        createCars(commandString);
    }
    function createCars(commandString) {
        if (commandString.includes('inherit')) {
            let [initialCommand,name,command,parentName] = commandString.split(' ');
            createCarsModel[command](name,parentName);
        } else if (commandString.includes('set')) {
            let [command,name,key,value] = commandString.split(' ');
            createCarsModel[command](name,key,value);
        } else if (commandString.includes('print')) {
            let [command, name] = commandString.split(' ');
            createCarsModel[command](name);
        } else {
            let [command, name] = commandString.split(' ');
            createCarsModel[command](name);
        }
    }
}
createCarsObjects(['create c1','create c2 inherit c1','set c1 color red','set c2 model new','print c1','print c2']
);