function createAndPrintJson(input){
    let cityObj = [];
    for (let i = 1;i<input.length;i++) {
        let regex = new RegExp(/[A-Za-z]+(\s[A-Za-z]+)*|(\-)*\d+[.\d]*/gi);
        let [name,latitude,longitude] = input[i].match(regex);
        cityObj.push({
            Town:name,
            Latitude:Number(Number(latitude).toFixed(2)),
            Longitude:Number(Number(longitude).toFixed(2))
        });
    }
    
    console.log(JSON.stringify(cityObj));
}
createAndPrintJson(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
);