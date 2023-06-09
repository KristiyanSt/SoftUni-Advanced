const sumNumbers = require('./sub-sum');
const expect = require('chai').expect;
it('Should return NaN as string as element of the input array', () => {
    let startIndex = 0;
    let endIndex = 2;
    let numbers = [10, 'twenty', 30, 40];
    expect(Number.isNaN(sumNumbers(numbers,startIndex,endIndex))).to.be.true;
});