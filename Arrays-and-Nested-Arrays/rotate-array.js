function rotatingArray(array,rotations){
    for(let i = 1;i<=rotations%array.length;i++){
        let lastEl = array.pop();
        array.unshift(lastEl);
    }
    console.log(array.join(' '));
}
rotatingArray(['1', 
'2', 
'3', 
'4'], 
5
);

