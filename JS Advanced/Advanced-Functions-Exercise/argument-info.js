function printArgumentInfo(...args){
    let types = {};
    for (const el of args) {
        if(!types[typeof el]){
            types[typeof el] = 0;
        }
        types[typeof el]++;
        console.log(`${typeof el}: ${el}`);
    }
    let entries = Object.entries(types);
    entries.sort((a,b)=>b[1] - a[1])
        .map(x=>`${x[0]} = ${x[1]}`)
        .forEach(x=>console.log(x));
}
printArgumentInfo('cat', 42, function () { console.log('Hello world!'); }, 1,'1');