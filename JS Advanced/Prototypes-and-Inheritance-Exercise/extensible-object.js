function extensibleObject(){
    let proto = {};
    let newObj = Object.create(proto);
    newObj.extend = function (template){
        for (const property in template) {
            if(typeof template[property] === 'function'){
                proto[property] = template[property];
            }else{
                this[property] = template[property];
            }
        }
    }
    return newObj;
}

const myObj = extensibleObject(); 

const template = { 
    extensionMethod: function () {}, 
    extensionProperty: 'someString' 
} 
myObj.extend(template); 

console.log(Object.getPrototypeOf(myObj).hasOwnProperty('extensionMethod'))
     
    