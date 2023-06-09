function addAndRemoveElements(array){
    let arr = [];
    for(let i =0;i<array.length;i++){
        if(array[i] ==='add'){
            arr.push(i+1);
        }
        else if(array[i]==='remove'){
            arr.pop();
        }
    }
    if(arr.length>0){
        console.log(arr.join("\n"));
    }
    else{
        console.log('Empty');
    }
}
addAndRemoveElements(['remove', 
'remove', 
'add']

);