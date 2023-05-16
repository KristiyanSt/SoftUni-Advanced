function solution(number){
    function add(secondNumber){
        return number + secondNumber;
    }
    return add.bind(number);
}

let add7 = solution(7);
console.log(add7(2));
console.log(add7(3));

