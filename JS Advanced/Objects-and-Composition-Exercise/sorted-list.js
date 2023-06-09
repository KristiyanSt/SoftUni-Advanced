function createSortedList(){
    let arr = [];
    return {
        add(number){
            arr.push(number);
            arr.sort((a,b)=>a-b);
            this.size++;        
        },
        remove(index) {
            if(index>=0 && index<arr.length){
                arr.splice(index,1);
                this.size--;
            }
        },
        get(index) {
            if(index>=0 && index<arr.length){
                return arr[index];
            }
        },
        size: 0
    }
}
let list = createSortedList();
list.add(22222);
list.add(6);
list.add(7);
console.log(list.get(2));
console.log(list.size);


        