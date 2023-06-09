function mathOperation(firstNum,secondNum,operator){
    let result = 0;
    if(operator=== '*'){
        result = firstNum*secondNum;
    }
    else if(operator === '+'){
        result = firstNum+secondNum;
    }
    else if(operator ==='-'){
        result = firstNum-secondNum;
    }
    else if(operator === '%'){
        result = firstNum % secondNum;
    }
    else if(operator ===  '**'){
        result = firstNum**secondNum;
    }
    else if(operator==='/'){
        result = firstNum / secondNum;
    }
    console.log(result);    
}
mathOperation(3, 5.5, '*');