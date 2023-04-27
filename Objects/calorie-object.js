function createFoodObject(arr){
    let foodObj = {};
    for(let i = 0;i<arr.length;i++){
        if(i%2===0){
            foodObj[arr[i]] = Number(arr[i+1]);
        }
    }
    console.log(foodObj);
}

createFoodObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);