function calculateJuiceBottles(juiceArr){
    let juicesQuantity = new Map();
    let juicesBottles = new Map();
    for (const juiceString of juiceArr) {
        let [fruit,newQuantity] = juiceString.split(' => ');
        newQuantity = Number(newQuantity);
        if(!juicesQuantity.has(fruit)){
            juicesQuantity.set(fruit,0);
        }
        let fruitQuantity = juicesQuantity.get(fruit);
        let updatedQuantity = fruitQuantity + newQuantity;
        juicesQuantity.set(fruit,updatedQuantity);

        if(juicesQuantity.get(fruit) >= 1000){
            let bottles = Math.trunc(updatedQuantity/ 1000);
            if(!juicesBottles.has(fruit)){
                juicesBottles.set(fruit,0)
            }
            let updatedBottles = juicesBottles.get(fruit) + bottles;
            juicesBottles.set(fruit,updatedBottles);
            juicesQuantity.set(fruit,updatedQuantity % 1000)
        }
    }
    let bottlesEntries = Array.from(juicesBottles);
    let juicesBottlesString = bottlesEntries.map(([fruit,bottles])=>`${fruit} => ${bottles}`)
                .join('\n');
    console.log(juicesBottlesString);
}

calculateJuiceBottles(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
);