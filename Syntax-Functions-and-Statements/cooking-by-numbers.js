function manipulatingNumber(numberString,op1,op2,op3,op4,op5,){
    let number = +numberString;
    let arr = [op1,op2,op3,op4,op5];
    for (const operation of arr) {
        if(operation==='chop'){
            console.log(number/=2);
        }
        else if(operation==='dice'){
            console.log(number=Math.sqrt(number));
        }
        else if(operation==='spice'){
            console.log(number+=1);
        }
        else if(operation==='bake'){
            console.log(number*=3);
        }
        else if(operation==='fillet'){
            console.log((number*=0.8).toFixed(1));
        }
    }
}
manipulatingNumber('9', 'dice', 'spice', 'chop', 'bake', 'fillet');