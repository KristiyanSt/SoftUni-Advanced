let expect = require('chai').expect;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};
describe('should test addFive function',()=>{
    it('should return undefined when type of number is not a number',()=>{
        expect(mathEnforcer.addFive('5')).to.equal(undefined);
    });
     it('should return undefined when there is no input',()=>{
        expect(mathEnforcer.addFive()).to.equal(undefined);
    });
    it('should return undefined when input is undefined',()=>{
        expect(mathEnforcer.addFive(undefined)).to.equal(undefined);
    });
    it('should return undefined when input is null',()=>{
        expect(mathEnforcer.addFive(null)).to.equal(undefined);
    });
    it('should return 7 with 2',()=>{
        expect(mathEnforcer.addFive(2)).to.equal(7);
    });
    it('should return 4 with -1', ()=>{
        expect(mathEnforcer.addFive(-1)).to.equal(4);
    });
    it('should return 10,5 with 5,5',()=>{
        expect(mathEnforcer.addFive(5,5)).to.be.closeTo(10,5,0,01)
    });
});
describe('should test subtractTen function',()=>{
    it('should return undefined when type of number is not a number',()=>{
        expect(mathEnforcer.subtractTen('5')).to.equal(undefined);
    });
     it('should return undefined when there is no input',()=>{
        expect(mathEnforcer.subtractTen()).to.equal(undefined);
    });
    it('should return undefined when input is undefined',()=>{
        expect(mathEnforcer.subtractTen(undefined)).to.equal(undefined);
    });
    it('should return undefined when input is null',()=>{
        expect(mathEnforcer.subtractTen(null)).to.equal(undefined);
    });
    it('should return 0 with 10',()=>{
        expect(mathEnforcer.subtractTen(10)).to.equal(0);
    });
    it('should return -5 with 5', ()=>{
        expect(mathEnforcer.subtractTen(5)).to.equal(-5);
    });
    it('should return 0,2 with 10,2', ()=>{
        expect(mathEnforcer.subtractTen(10,2)).to.be.closeTo(0,2,0,01);
    });
    it('should return -11 with -1', ()=>{
        expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
    });

});
describe('should test sum function',()=>{
    it('should return undefined when first param is not a number',()=>{
        expect(mathEnforcer.sum('5',3)).to.equal(undefined);
    });
     it('should return undefined when second param is not a number',()=>{
        expect(mathEnforcer.sum(7,'-5')).to.equal(undefined);
    });
    it('should return undefined when inputs are  undefined',()=>{
        expect(mathEnforcer.sum(undefined,undefined)).to.equal(undefined);
    });
    it('should return undefined when first input is undefined',()=>{
        expect(mathEnforcer.sum(undefined,30)).to.equal(undefined);
    });
    it('should return undefined when second input is undefined',()=>{
        expect(mathEnforcer.sum(20,undefined)).to.equal(undefined);
    });
    it('should return undefined when inputs are null',()=>{
        expect(mathEnforcer.sum(null,null)).to.equal(undefined);
    });
    it('should return undefined when first input is null',()=>{
        expect(mathEnforcer.sum(null,11)).to.equal(undefined);
    });
    it('should return undefined when second input is null',()=>{
        expect(mathEnforcer.sum(12,null)).to.equal(undefined);
    });
    it('should return 25 with 5 and 20',()=>{
        expect(mathEnforcer.sum(5,20)).to.equal(25);
    });
    it('should return -12 with -5 and -5', ()=>{
        expect(mathEnforcer.sum(-5,-7)).to.equal(-12);
    });
    it('should return -1 with -3 and 2', ()=>{
        expect(mathEnforcer.sum(-3,2)).to.equal(-1);
    });
    it('should return 3,3 with 1.1 and 2.2', ()=>{
        expect(mathEnforcer.sum(1.1 + 1,1,2.2)).to.be.closeTo(4,4,0,01);
    });
    it('should return undefined with no input params',()=>{
        expect(mathEnforcer.sum()).to.equal(undefined);
    });
});
