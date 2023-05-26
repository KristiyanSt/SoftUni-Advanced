function createFigures(){
    class Figure{
        defaultUnit = 'cm';
        units = {
            'cm' : 1,
            'm' : 0.01,
            'mm': 10
        }
        get area(){
            return NaN;
        }
        changeUnits(unit){
            this.defaultUnit = unit;
        }
        toString(){
            return `Figures units: ${this.defaultUnit}`;
        }
    }
    class Circle extends Figure{
        constructor(radius){
            super();
            this.radius = radius;
        }
        get area(){
            return ((this.radius * this.units[this.defaultUnit]) ** 2) * Math.PI;
        }
        toString(){
            return super.toString() + ` Area: ${this.area} - radius: ${this.radius * this.units[this.defaultUnit]}`;
        }
    }
    class Rectangle extends Figure{
        constructor(width,height,unit){
            super();
            this.defaultUnit = unit;
            this.width = width;
            this.height = height;
        }
        get area(){
            return (this.width * this.units[this.defaultUnit]) * (this.height * this.units[this.defaultUnit]);
        }
        toString(){
            return super.toString() +  ` Area: ${this.area} - width: ${this.width * this.units[this.defaultUnit]}, height: ${this.height*this.units[this.defaultUnit]}`;
        }
    }
    return {
        Figure,
        Circle,
        Rectangle
    }
}