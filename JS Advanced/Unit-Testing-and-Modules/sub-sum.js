function sumNumbers(numbers, startIndex, endIndex){
    startIndex = startIndex < 0
    ?0
    :startIndex;

    endIndex = endIndex>=numbers.length
    ? endIndex = numbers.length-1
    :endIndex;

    if(!Array.isArray(numbers)){
        return NaN;
    }
    
    let extractNumbers = numbers.slice(startIndex,endIndex+1);
    
    if(extractNumbers.some(el=> isNaN(Number(el)))){
        return NaN;
    }else if(extractNumbers.length===0){
        return 0;
    }
    
    let sum = extractNumbers.reduce((acc,el)=> acc+el);

    return Number(sum);
}
module.exports = sumNumbers;