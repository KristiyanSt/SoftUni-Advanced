function creatingJsonObjects(arr){
    let result = [];
    let titles = serializing(arr[0]);
    
    for (const line of arr.slice(1)) {
        let [town,latitude,longitude] = serializing(line);
        latitude = Number(Number(latitude).toFixed(2));
        longitude = Number(Number(longitude).toFixed(2));
        result.push({
            Town:town,
            Latitude:latitude,
            Longitude:longitude
        })
    }
    function serializing(line){
        line = line.split(/\s*\|\s*/)
            .filter(x => x !== "");
            return line;
    }
    console.log(JSON.stringify(result));
}
creatingJsonObjects(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
);