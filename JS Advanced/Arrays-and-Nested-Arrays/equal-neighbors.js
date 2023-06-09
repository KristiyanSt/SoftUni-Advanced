function findEqualElements(array){
    let count = 0;
    for(let i = 0;i<array.length-1;i++){
        let currentArr = array[i];
        for(let j = 0;j<currentArr.length;j++){
            let currentEl = currentArr[j];
            let compareEl = array[i+1][j];
            if(currentEl===compareEl){
                count++;
            }
        }
        
    }
    for(let i = 0;i<array.length;i++){
        let currentArr = array[i];
        for(let j =0;j<currentArr.length-1;j++){
            let currentEl = currentArr[j];
            let nextEl = currentArr[j+1];
            if(currentEl===nextEl){
                count++;
            }
        }
    }
    
    return count;
}

console.log(findEqualElements([['2', '2', '5', '7', '4'],
['4', '0', '5', '3','4'],
['2', '5', '5', '4','2']]

));