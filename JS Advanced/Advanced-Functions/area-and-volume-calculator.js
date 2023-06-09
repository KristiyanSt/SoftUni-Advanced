
function area() {
    return Math.abs(this.x * this.y);
};
function vol() {
    return Math.abs(this.x * this.y * this.z);
};

function solve(area, vol, input) {
    let parsedInput = JSON.parse(input);
    let calculatedPoints = [];
    for (const obj of parsedInput) {
        for (const key in obj) {
           obj[key] = Number(obj[key]);
        }
        let calculated = {
            area:area.call(obj),
            volume:vol.call(obj)
        }
        calculatedPoints.push(calculated);
    }
    return calculatedPoints;    
    // parsedInput.map(obj => {
    //     return {
    //         x: Number(obj.x),
    //         y: Number(obj.y),
    //         z: Number(obj.z)
    //     }
    // });

    // let transformedInput = parsedInput
    //     .map(obj=>{
    //         return {
    //             area:area.call(obj),
    //             volume:vol.call(obj)
    //         }
    //     });
    // return transformedInput;
}