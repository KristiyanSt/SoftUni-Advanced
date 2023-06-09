const sum = require('./sum-of-numbers');
const expect = require('chai').expect;
it('Should return sum with array of numbers as input', () => {
    let arr = [1,2,3,4,5];
    let expected = 15;
    let actual = sum(arr);
    expect(actual).to.be.equal(expected);
});
it('Should return sum with array of numbers as input', () => {
    let arr = [1,2,3];
    let expected = 6;
    let actual = sum(arr);
    expect(actual).to.be.equal(expected);
});
it('Should return sum with array of numbers and string as input', () => {
    let arr = [1,'2',3];
    let expected = 6;
    let actual = sum(arr);
    expect(actual).to.be.equal(expected);
});
