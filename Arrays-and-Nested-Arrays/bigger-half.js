function sortingAndSlicingArray(array){
    let middleIndex = array.length/2;
    return array.sort((a,b) => a - b).slice(middleIndex,);
}
console.log(sortingAndSlicingArray([3, 19, 14, 7, 2, 19, 6]));