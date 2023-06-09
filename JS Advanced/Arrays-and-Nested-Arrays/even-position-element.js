function findEvenPositions(array){
    let evenPositions = array.filter((el,index)=> index%2==0);
    console.log(evenPositions.join(" "));
}
findEvenPositions(['20', '30', '40', '50', '60']);