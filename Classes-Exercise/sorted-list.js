class List{
    constructor(){
        this.numbers = [];
        this.size = this.numbers.length;
    }
    add(number){
        if(!isNaN(Number(number))){
            this.numbers.push(Number(number));
            this.numbers.sort((a,b)=> a-b);
            this.size = this.numbers.length;
        }else{
            throw new Error;
        }
        return new List();
    }
    remove(index){
        index = Number(index);
        if(index>=0 && index<this.numbers.length){
            this.numbers.splice(index,1);
            this.numbers.sort((a,b)=> a-b);
            this.size = this.numbers.length;
        }else{
            throw new Error;
        }
        return new List();
    }
    get(index){
        index = Number(index);
        if(index>=0 && index<this.numbers.length){
            return this.numbers[index];
        }else{
            throw new Error;
        }
    }
}

let list = new List();
list.add(3);
list.add(2);
list.add(1);
console.log(list.get(0)); 
list.remove(0);
console.log(list.size);
console.log(list.numbers);
