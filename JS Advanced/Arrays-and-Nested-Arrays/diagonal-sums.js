function findSumsOfDiagonals(array){
    let firstDiagonal = 0;
    let secondDiagonal = 0;
    let index = 0;
    for (const arr of array) {
        firstDiagonal+= arr[index];
        secondDiagonal+= arr[arr.length-1-index];
        index++;
    }
    console.log(`${firstDiagonal} ${secondDiagonal}`);
}
findSumsOfDiagonals([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
   );