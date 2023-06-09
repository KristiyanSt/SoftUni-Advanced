function validityChecher(x1,y1,x2,y2){
    
    function calculating(x1,y1,x2,y2){
        let firstPoint = x1-x2;
        let secondPoint = y1-y2;
        let result = Math.sqrt(firstPoint**2 + secondPoint**2);
        let isValid = Number.isInteger(result) ? 'valid' : 'invalid';
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isValid}`);
    }
    
    calculating(x1,y1,0,0);
    calculating(x2,y2,0,0);
    calculating(x1,y1,x2,y2);
}
validityChecher(3, 0, 0, 4);