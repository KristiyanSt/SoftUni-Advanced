function createTownRegister(arr){
    let townRegister = {};
    for (const line of arr) {
        let [town,population] = line.split(' <-> ');

        if(!townRegister[town]){
            townRegister[town] = 0;
        }
        townRegister[town] += Number(population);
    }
    for (const town in townRegister)   {
        console.log(`${town} : ${townRegister[town]}`);
    }
}
createTownRegister(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000']
);