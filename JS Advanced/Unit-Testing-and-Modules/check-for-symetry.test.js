let isSymmetric = require('./check-for-symetry');
const expect = require('chai').expect;

it('Should return false when input array is not an array', ()=>{
    let array = 'text';
    let expected = false;
    let actual = isSymmetric(array);
    expect(actual).to.equal(expected);
});
it('Should return false when input array is not equal', ()=>{
    let array = [1,2,3,4];
    let expected = false;
    let actual = isSymmetric(array);
    expect(actual).to.equal(expected);
});
it('Should return true when input array is equal to its reversed version', ()=>{
    let array = [1,2,2,1];
    let expected = true;
    let actual = isSymmetric(array);
    expect(actual).to.equal(expected);
});
it('Should return true when input array has zero elements', ()=>{
    let array = [];
    let expected = true;
    let actual = isSymmetric(array);
    expect(actual).to.equal(expected);
});
it('Should return true when input array has two different elements', ()=>{
    let array = [1,'1'];
    let expected = false;
    let actual = isSymmetric(array);
    expect(actual).to.equal(expected);
});