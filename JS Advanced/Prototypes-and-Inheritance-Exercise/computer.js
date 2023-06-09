function createComputerHierarchy() {
    class Keyboard{
        constructor(manufactorer,responseTime){
            this.manufactorer = manufactorer;
            this.responseTime = responseTime;
        }
    }
    class Monitor{
        constructor(manufactorer,width,height){
            this.manufactorer = manufactorer;
            this.width = width;
            this.height = height;
        }
    }
    class Battery{
        constructor(manufactorer,expectedLife){
            this.manufactorer = manufactorer;
            this.expectedLife = expectedLife;
        }
    }
    class Computer{
        constructor(manufactorer,processorSpeed,ram,hardDiskSpace){
            if(this.constructor === Computer){
                throw new Error;
            }
            this.manufactorer = manufactorer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }
    class Laptop extends Computer{
        constructor(manufactorer,processorSpeed,ram,hardDiskSpace,weight,color,battery){
            super(manufactorer,processorSpeed,ram,hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }
        set battery(battery){
            if(battery.constructor === Battery){
                this._battery = battery;
            }else{
                throw new TypeError;
            }
        }
        get battery(){
            return this._battery;
        }
    }
    class Desktop extends Computer{
            constructor(manufactorer,processorSpeed,ram,hardDiskSpace,keyboard,monitor){
                super(manufactorer,processorSpeed,ram,hardDiskSpace);
                this.keyboard = keyboard;
                this.monitor = monitor;
            }
            set keyboard(keyboard){
                if(keyboard.constructor === Keyboard){
                    this._keyboard = keyboard;
                }else{
                    throw new TypeError;
                }
            }
            get keyboard(){
                return this._keyboard;
            }
            set monitor(monitor){
                if(monitor.constructor === Monitor){
                    this._monitor = monitor;
                }else{
                    throw new TypeError;
                }
            }
            get monitor(){
                return this._monitor;
            }
    }
    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}
let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
let monitor = new Monitor('Microsoft',6,7);
let keyboard = new Keyboard('Sony',3.33);
let desk = new Desktop('HP',2000,3000,4000,keyboard,monitor);
console.log(desk.processorSpeed);
