function findingBiggestElement(array){
    let biggestEl = -Infinity;
    array.forEach(arr => {
        arr.forEach(el=> {
            if(el>biggestEl){
                biggestEl = el;
            }
        })
    });
    return biggestEl;
}
console.log(findingBiggestElement([[3, 5, 7, 12],[-1, 4, 33, 2],[8, 3, 0, 4]]));