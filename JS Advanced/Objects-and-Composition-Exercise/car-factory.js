function assemblingCarObj(carObj) {
    function createEngine(power) {
        let engine = {};

        if (power <= 90) {
            engine.power = 90;
            engine.volume = 1800;
        } else if (power <= 120) {
            engine.power = 120;
            engine.volume = 2400;
        } else if (power <= 200) {
            engine.power = 200;
            engine.volume = 3500;
        }
        return engine;
    }

    function createCarriage(color, carriage) {
        return {
            type:carriage,
            color
        }
    }

    function createWheels(wheelsize) {
        if (wheelsize % 2 === 0) {
            wheelsize -= 1;
        }
        let wheels = new Array(4).fill(wheelsize);
        return wheels;
    }

    return {
        model: carObj.model,
        engine: createEngine(carObj.power),
        carriage: createCarriage(carObj.color, carObj.carriage),
        wheels: createWheels(carObj.wheelsize)
    }
}
let newCar = assemblingCarObj({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}

);
console.log(newCar);

