// const x = 42;

// const getX = function () {

//     return this.x;

// }

const modulex = {
    x: 42,
    getX() {
        return this.x;
    }
}

const unboundGetX = modulex.getX;

console.log(unboundGetX()); // undefined

const boundGetX = unboundGetX.bind(modulex);

console.log(boundGetX()); // 42