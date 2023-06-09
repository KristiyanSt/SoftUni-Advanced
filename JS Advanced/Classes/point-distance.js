class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static distance(p1,p2){
        let side1 = Math.abs(p1.x - p2.x);
        let side2 = Math.abs(p1.y - p2.y);
        let dist = Math.sqrt(side1 ** 2 + side2 ** 2);
        return dist;
    }
}
let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));
