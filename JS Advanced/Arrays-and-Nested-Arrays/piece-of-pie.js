function slicingArray(array,startElement,endElement){
    let startIndex = array.indexOf(startElement);
    let endIndex = array.indexOf(endElement);
    return array.slice(startIndex,endIndex+1);
}
console.log(slicingArray(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'
));