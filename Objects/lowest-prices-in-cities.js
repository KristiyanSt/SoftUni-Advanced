function findLowestPrices(arr){
    let products = {};
    for (const line of arr){
        let [city,product,price] = line.split(" | ");
        price = Number(price);
        if(!products[product]){
            products[product] = {price ,city};
        }else{
            if(products[product].price > price){
                products[product].price = price;
                products[product].city = city;
            } 
        }
    }
    //Sample Product -> 1000 (Sample Town)
    for (const product in products) {
        console.log(`${product} -> ${products[product].price} (${products[product].city})`);
    }
}
findLowestPrices(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10']
);