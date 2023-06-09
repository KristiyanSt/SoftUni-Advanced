class SummerCamp{
    constructor(organizer, location){
        this.organizer = organizer;
        this.location = location;
        this.priceForCamp = {"child": 150, "student": 300, "collegian": 500};
        this.listOfParticipants = [];
    }
    
    registerParticipant(name, condition, money){
        if(!this.priceForCamp[condition]){
            throw new Error("Unsuccessful registration at the camp.");
        }

        if(this.listOfParticipants.some(p => p.name === name)){
            return `The ${name} is already registered at the camp.`;
        }

        if(money < this.priceForCamp[condition]){
            return `The money is not enough to pay the stay at the camp.`;
        }

        this.listOfParticipants.push(
            {name, condition, power: 100, wins:0} 
        )
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name){
        if(!this.listOfParticipants.some(p => p.name === name)){
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        let removeParticipantIndex = this.listOfParticipants.indexOf(this.listOfParticipants.find(p => p.name === name));
        this.listOfParticipants.splice(removeParticipantIndex,1);
        return `The ${name} removed successfully.`;
    }

    timeToPlay(game,player1,player2){
        let firstParticipant = this.listOfParticipants.find(p => p.name === player1);
        let secondParticipant = this.listOfParticipants.find(p => p.name === player2);
        if(game === 'WaterBalloonFights'){
            if(!firstParticipant || !secondParticipant){
                throw new Error(`Invalid entered name/s.`);
            }
            if(firstParticipant.condition !== secondParticipant.condition){
                throw new Error(`Choose players with equal condition.`);
            }

            if(firstParticipant.power > secondParticipant.power){
                firstParticipant.wins++;
                return `The ${firstParticipant.name} is winner in the game ${game}.`;
            }else if(secondParticipant.power > firstParticipant.power){
                secondParticipant.wins++;
                return `The ${secondParticipant.name} is winner in the game ${game}.`;
            }else{
                return `There is no winner.`;
            }

        }else if(game === 'Battleship'){
            if(!firstParticipant){
                throw new Error(`Invalid entered name/s.`);
            }

            firstParticipant.power += 20;
            return `The ${firstParticipant.name} successfully completed the game ${game}.`;
        }
    }

    toString(){
        let sortedList = this.listOfParticipants.sort((a,b) => b.wins - a.wins)
                                                .map(p => `${p.name} - ${p.condition} - ${p.power} - ${p.wins}`)
        return `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}\n${sortedList.join("\n")}`;
        // `{name} - {condition} - {power} - {wins}`
    }
}
const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

console.log(summerCamp.toString());
