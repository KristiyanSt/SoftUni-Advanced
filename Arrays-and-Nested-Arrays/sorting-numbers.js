function sortingNumbers(numbers){
    numbers.sort((a,b)=>a-b);
    let sortedNumbers = [];
    let endIndex = Math.trunc(numbers.length/2);
    for(let i = 0;i<endIndex;i++){
        sortedNumbers.push(numbers[i]);
        sortedNumbers.push(numbers[numbers.length-1-i]);
        if(i===endIndex-1 && numbers.length %2 != 0){
            sortedNumbers.push(numbers[i+1]);
        }
    }
    return sortedNumbers;
}
sortingNumbers([1,2,3,4,5]);