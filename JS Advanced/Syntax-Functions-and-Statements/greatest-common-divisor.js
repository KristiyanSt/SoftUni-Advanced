function findingGreatestDivisor(firstNum,secondNum){
    let result = 0;
    let smallerNum = Math.min(firstNum,secondNum);
    for(let i = 1;i<=9;i++){
        if(firstNum%i==0 && secondNum% i ==0){
            result = i;
        }
    }
    console.log(result);
}
findingGreatestDivisor(2154, 458);