let expect = require('chai').expect;

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

it('should return undefined when first parameter is not a string',()=>{
    expect(lookupChar(5,5)).to.equal(undefined);
})
it('should return undefined when second parameter is not a number type',()=>{
    expect(lookupChar('string','1')).to.equal(undefined);
})
it('should return undefined when second parameter is not a integer number',()=>{
    expect(lookupChar('string',1.1)).to.equal(undefined);
})
it('should return incorrect index when index is beyond length',()=>{
    expect(lookupChar('string',6)).to.equal("Incorrect index");
})
it('should return incorrect index when index is above length',()=>{
    expect(lookupChar('string',-1)).to.equal("Incorrect index");
})
it('should return g when index is last index',()=>{
    expect(lookupChar('string',5)).to.equal("g");
})
it('should return a string',()=>{
    expect(typeof (lookupChar('string',2))).to.equal('string');
})
it('should return incorrect index with empty string as first parameter',()=>{
    expect(lookupChar('',0)).to.equal("Incorrect index");
})
it('should return undefined when there is no input',()=>{
    expect(lookupChar()).to.equal(undefined);
})
it('should return correct char',()=>{
    expect(lookupChar('string',0)).to.equal('s');
})