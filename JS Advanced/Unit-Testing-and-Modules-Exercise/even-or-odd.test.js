let expect = require('chai').expect;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe('Should check behaviour with correct and incorrect input',()=>{
    it('should return undefined when type of input is not string',()=>{
        expect(isOddOrEven(5)).to.equal(undefined);
    });
    it('should return even when string`s length is even',()=>{
        expect(isOddOrEven('stripe')).to.equal("even");
    });
    it('should return odd when string`s length is odd',()=>{
        expect(isOddOrEven('striped')).to.equal("odd");
    });
})