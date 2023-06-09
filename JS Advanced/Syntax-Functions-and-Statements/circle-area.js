function calculatingCircleArea(input){
    if(typeof input != 'number'){
        console.log(`We can not calculate the circle area, because we receive a ${typeof input}.`);
    }
    else{
        let pi = Math.PI;
        let area = (input**2)*pi;
        console.log(area.toFixed(2));
    }
}
calculatingCircleArea([]);