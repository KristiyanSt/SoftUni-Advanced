function arrangeCars(carsArr){ 
    let cars = {};
    for (const carString of carsArr) {
        let [brand,model,quantity] = carString.split(' | ');
        quantity = Number(quantity);
        if(!cars[brand]){
            cars[brand] = new Map();
        }
        if(!cars[brand].has(model)){
            cars[brand].set(model,0);
        }
        let currentQuantity = cars[brand].get(model);
        let newQuantity = currentQuantity + quantity;
        cars[brand].set(model,newQuantity);
    }
    for (const [brand,models] of Object.entries(cars)) {
        console.log(brand);
        let modelsEntries = Array.from(models);
        for (const [model,quantity] of modelsEntries) {
            console.log(`###${model} -> ${quantity}`)
        }
    }
}
arrangeCars(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']
);