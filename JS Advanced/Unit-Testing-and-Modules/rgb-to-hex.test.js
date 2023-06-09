let rgbToHexColor = require('./rgb-to-hex');
let expect = require('chai').expect;
it('Should return undefined when one of the input is not a number', () => {
    let string = 'text';
    let num1 = 9;
    let num2 = 12;
    let actual = rgbToHexColor(string,num1,num2);
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Should return undefined when one of the input is not an integer number', () => {
    let floatNum = 14.5;
    let num1 = 9;
    let num2 = 12;
    let actual = rgbToHexColor(floatNum,num1,num2);
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Should return undefined when red is under 0', () => {
    let num3 = -1;
    let num1 = 9;
    let num2 = 12;
    let actual = rgbToHexColor(num3,num1,num2);
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Should return undefined when input is absent', () => {
    let actual = rgbToHexColor();
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Should check if the output is a string', () => {
    let actual = rgbToHexColor(5,5,5);
    let expected = 'string';
    expect(typeof actual).to.equal(expected);
});
it('Should check with valid input', () => {
    let actual = rgbToHexColor(134,245,212);
    let expected = '#86F5D4';
    expect(actual).to.equal(expected);
});
it('Should check if 255 is in range', () => {
    let actual = rgbToHexColor(5,5,255);
    let expected = '#0505FF';
    expect(actual).to.equal(expected);
});
it('Should check if 0 is in range', () => {
    let actual = rgbToHexColor(0,0,0);
    let expected = '#000000';
    expect(actual).to.equal(expected);
});
it('Invalid range red', () => {
    let actual = rgbToHexColor(-1,0,0);
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Invalid range green', () => {
    let actual = rgbToHexColor(0,-1,0);
    let expected = undefined;
    expect(actual).to.equal(expected);
});
it('Invalid range blue', () => {
    let actual = rgbToHexColor(0,0,256);
    let expected = undefined;
    expect(actual).to.equal(expected);
});