function getFibonator(){
    let first = 0;
    let second = 1;
    let result = 0;
    return function(){
        result = first + second;
        first = second;
        second = result;
        return first;
    }
}
let fib = getFibonator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());