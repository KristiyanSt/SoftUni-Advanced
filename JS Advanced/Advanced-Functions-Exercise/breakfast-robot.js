function solution(){
    let stock = {
        'protein':0, 
        'carbohydrate':0, 
        'fat':0, 
        'flavour':0
    };
    let recipes = {
        'apple':{
            'carbohydrate':1,
            'flavour':2
        },
        'lemonade':{
            'carbohydrate':10,
            'flavour':20
        },
        'burger':{
            'carbohydrate':5,
            'fat':7,
            'flavour':3
        },
        'eggs':{
            'protein':5,
            'fat':1,
            'flavour':1
        },
        'turkey':{
            'protein':10,
            'carbohydrate':10,
            'fat':10,
            'flavour':10
        }
    }
    return function(commandString){
        let commandArgs = commandString.split(" ");
        let command = commandArgs[0];
        if(command == 'restock'){
            let microelement = commandArgs[1];
            let quantity = commandArgs[2];
            stock[microelement]+= Number(quantity);
            return `Success`;
        }else if(command == 'prepare'){
            let food = commandArgs[1];
            let count = commandArgs[2];
            let recipe = recipes[food];
            for (const ingredient in recipe) {
              if(stock[ingredient]<recipe[ingredient]*count){
                return `Error: not enough ${ingredient} in stock`;
              }
              stock[ingredient]-= recipe[ingredient]*count;
            }
            return `Success`;
        }else if(command == 'report'){
            return Object.entries(stock)
                .map(x=> `${x[0]}=${x[1]}`)
                .join(' ');
        }
    }
}

let manager = solution (); 
console.log (manager ("restock flavour 50 ")); // Success 
console.log (manager ("prepare lemonade 4")); // Error: not enough carbohydrate in stock 
console.log (manager ("restock carbohydrate 10")); // Success 
console.log (manager ("restock flavour 10"));//Success
console.log (manager ("prepare apple 1")); // Success 
console.log (manager ("restock fat 10"));// Success 
console.log (manager ("prepare burger 1")); // Success 
console.log (manager ("report"));//protein=0 carbohydrate=4 fat=3 flavour=55

