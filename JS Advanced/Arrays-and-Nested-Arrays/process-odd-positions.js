function processingOddPositions(array){
    return array.filter((el,index) => index % 2 != 0).map(number=>number*2).reverse().join(" ");
    
}
console.log(processingOddPositions([3, 0, 10, 4, 7, 3]));