function solution(){
    let internalString = '';
    let modifyString = {
        append(text){
            internalString += text;
        },
        removeStart(number){
            internalString = internalString.slice(number,);
        },
        removeEnd(number){
            internalString = internalString.slice(0,internalString.length - number);
        },
        print(){
            console.log(internalString);
        }
    }
    return modifyString;
}


let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
