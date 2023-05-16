function add(number){
    let sum = 0;
    function adding(num){
        sum+=num;
        adding.toString = () => {
            return sum;
        }
        return adding;
    }
    return adding(number);
}
let a = add(1)(6)(-3);
console.log(a.toString());

