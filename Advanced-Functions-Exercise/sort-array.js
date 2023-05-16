function sortingArray(arr,sortType){
    let types = {
        'asc':()=>{
            return arr.sort((a,b)=> a - b);
        },
        'desc':() => arr.sort((a,b)=> b - a)
    }
    let result = types[sortType]();
    return result;
}
sortingArray([14, 7, 17, 6, 8], 'desc');