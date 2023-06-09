function heroesRegister(input){
    let heroesData = [];
    for (const line of input) {
        let [name,level,items] = line.split(' / ');
        if(!items){
            items = [];
        }
        else{
            items = items.split(', ');
        }
        let hero = {
            name,
            level:Number(level),
            items
        };
        heroesData.push(hero);
    }
    console.log(JSON.stringify(heroesData));
}
heroesRegister(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / ']
);