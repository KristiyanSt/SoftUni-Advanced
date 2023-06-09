function sortProducts(arr){
    let letters = {};
    arr.sort((a,b)=> a.localeCompare(b));
   
    for (const productLine of arr) {
        let [product,price] = productLine.split(" : ");
        if(!letters[product[0]]){
            letters[product[0]] = {};
        }
        letters[product[0]][product] = price;
    }
    for (const letter in letters) {
        console.log(letter);
        let sortedProducts = Object.entries(letters[letter])
                            .sort((a,b)=> a[0].localeCompare(b[0]));

        for (const [product,price] of sortedProducts) {
            console.log("  " + product + ": " + price);
        }
    }
}

sortProducts(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
)