class Textbox {
    constructor(selector,regex){
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;
        Array.from(this.elements).forEach(el=>el.addEventListener('change',()=>{
            this.value = el.value;
        }));
    }
    set value(val){
        Array.from(this._elements).forEach(el=>el.value = val);
    }
    get value(){
        return this.elements[0].value;
    }
    get elements(){
        return this._elements;
    }
    isValid(){
        if(this._invalidSymbols.test(this._elements[0].value)){
            return false;
        }
        return true;
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = Array.from(document.getElementsByClassName('textbox'));

inputs.forEach(el=>el.addEventListener('click',function(){console.log(textbox.value);}));
