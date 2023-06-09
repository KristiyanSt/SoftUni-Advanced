function extractIncreasingNumbers(array){
    let biggestNum = Number.MIN_SAFE_INTEGER;
    let result = array.reduce((acc,a)=> {
        if(a>=biggestNum){
            biggestNum = a;
            acc.push(biggestNum);
        }
        return acc;
    },[]);
    return result;
}
extractIncreasingNumbers([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]
    );