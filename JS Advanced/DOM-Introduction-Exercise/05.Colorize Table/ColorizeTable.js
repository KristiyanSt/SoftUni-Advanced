function colorize() {
    let tableRows = Array.from(document.getElementsByTagName('tr'));
    tableRows.shift();
    console.log(tableRows);
    tableRows.forEach((x,i)=>{
        if(i%2===0){
            x.style.background="Teal";
        }
    });
}