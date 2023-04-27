function solve(){
    function decorateFight(state){
        state.fight = () => {
            state.stamina--;
            console.log(`${state.name} slashes at the foe!`);
        }
    }
    function fighter(name){
        let fighterState = {
            name,
            stamina:100,
            health:100
        }
        decorateFight(fighterState);
        return fighterState;
    }
    function decorateMage(state) {
        state.cast = (spell) => {
            state.mana--;
            console.log(`${state.name} cast ${spell}`);
        }
    }
    function mage(name){
        let mageState = {
            name,
            mana:100,
            health:100
        }
        decorateMage(mageState);
        return mageState;
    }
    return { fighter,mage}
}
let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);
