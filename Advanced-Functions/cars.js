function createCarsObjects(input){
    let cars = {};
    let createCarsModel = {
        create: function (name) {
            cars[name] = {};
        },
        inherit: function (name, parentName) {
            cars[name] = {};
            cars[name].inherit = function(){
                if(cars[parentName].inherit){
                    cars[parentName].inherit();
                }
                let inheritProperties = cars[parentName];
                for (const prop in inheritProperties) {
                    cars[name][prop] = inheritProperties[prop];
                }
            }
            Object.defineProperty(cars[name],'inherit',{enumerable:false});
        },
        set: function (name, key, value) {
            cars[name][key] = value;
        },
        print: function (name) {
            if(cars[name].inherit){
                cars[name].inherit();
            }
            let entries = [];
            for (const key in cars[name]) {
                entries.push(`${key}:${cars[name][key]}`);
            }
            console.log(entries.join(','));
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
createCarsObjects(['create pesho',
'create gosho inherit pesho',
'create stamat inherit gosho',
'set pesho rank number1',
'set gosho nick goshko',
'print stamat']
);