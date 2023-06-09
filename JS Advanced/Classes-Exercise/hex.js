class Hex{
    constructor(number){
        this.value = number;
    }
    set value(number){
        this._value = number;
    }
    valueOf(){
        return this._value;
    }
    toString(){
        let hexadecimalValue = this._value.toString(16);
        return '0x' + hexadecimalValue.toUpperCase();
    }
    plus(number){
        let val = 0;
        if(typeof number !== 'number'){
            val = this._value + number.valueOf();
            return new Hex(val);
        }else{
            val = this._value + number;
            return new Hex(val);
        }
    }
    minus(number){
        let val = 0;
        if(typeof number !== 'number'){
            val = this._value - number.valueOf();
            return new Hex(val);
        }else{
            val = this._value - number;
            return new Hex(val);
        }
    }
    parse(string){
        return parseInt(string,16);
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
console.log(FF.parse('AAA'));

