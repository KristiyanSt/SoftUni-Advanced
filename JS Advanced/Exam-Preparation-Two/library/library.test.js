let library = require("./library");
let expect = require("chai").expect;

describe("Library", function() {
    describe("Testing calcPriceOfBook", function() {
        it("Should equal function", function() {
            expect(typeof library.calcPriceOfBook).to.equal('function')
        });
        it("Should throw error when inputs are not valid", function() {
            expect(()=>library.calcPriceOfBook(3,NaN)).to.throw(Error,"Invalid input");
        });
        it("Should throw error when inputs are not valid", function() {
            expect(()=>library.calcPriceOfBook()).to.throw(Error,"Invalid input");
        });
        it("Should throw error when inputs are not valid", function() {
            expect(()=>library.calcPriceOfBook('str',NaN)).to.throw(Error,"Invalid input");
        });
        it("Should throw error when inputs are not valid", function() {
            expect(()=>library.calcPriceOfBook([],3)).to.throw(Error,"Invalid input");
        });
        it("Should return 10.00 with 1980 and Telus", function() {
            expect(library.calcPriceOfBook('Telus',1980)).to.equals(`Price of Telus is 10.00`);
        });
        it("Should return 10.00 with 1979 and Telus", function() {
            expect(library.calcPriceOfBook('Telus',1979)).to.equals(`Price of Telus is 10.00`);
        });
        it("Should return 20.00 with 1981 and Telus", function() {
            expect(library.calcPriceOfBook('Telus',1981)).to.equals(`Price of Telus is 20.00`);
        });
        it("Should return 20.00 with 1982 and Telus", function() {
            expect(library.calcPriceOfBook('Telus',1982)).to.equals(`Price of Telus is 20.00`);
        });
     });
     describe('Testing findBook',()=>{
        it('Should equals function',()=>{
            expect(typeof library.findBook).to.equals('function');
        });
        it('Should throw error with empty array',()=>{
            expect(()=>library.findBook([],'Telus')).to.throw(Error,"No books currently available");
        });
        it('Should return "We found the book you want."',()=>{
            expect(library.findBook(['Telus'],'Telus')).to.equals("We found the book you want.");
        })
        it('Should return "We found the book you want."',()=>{
            expect(library.findBook(['bachi','lukanka','Telus'],'Telus')).to.equals("We found the book you want.");
        })
        it('Should return "The book you are looking for is not here!"',()=>{
            expect(library.findBook(['Telas','Bachi'],'Telus')).to.equals("The book you are looking for is not here!");
        })
        it('Should return "The book you are looking for is not here!"',()=>{
            expect(library.findBook(['Telas','Bachi'],40)).to.equals("The book you are looking for is not here!");
        })
     });
     describe('Testing arrangeTheBooks',()=>{
        it('Should equals function',()=>{
            expect(typeof library.arrangeTheBooks).to.equals('function');
        })
        it('Should throw error with a string',()=>{
            expect(()=>library.arrangeTheBooks('string')).to.throw(Error,"Invalid input");
        });
        it('Should throw error with a Nan',()=>{
            expect(()=>library.arrangeTheBooks(NaN)).to.throw(Error,"Invalid input");
        });
        it('Should throw error with -3',()=>{
            expect(()=>library.arrangeTheBooks(-1)).to.throw(Error,"Invalid input");
        });
        it('Should return "Great job, the books are arranged." with 0',()=>{
            expect(library.arrangeTheBooks(0)).to.equal("Great job, the books are arranged.");
        });
        it('Should return "Great job, the books are arranged." with 0',()=>{
            expect(library.arrangeTheBooks(39)).to.equal("Great job, the books are arranged.");
        });
        it('Should return "Great job, the books are arranged." with 40',()=>{
            expect(library.arrangeTheBooks(40)).to.equal("Great job, the books are arranged.");
        });
        it('Should return "Insufficient space, more shelves need to be purchased." with 41',()=>{
            expect(library.arrangeTheBooks(41)).to.equal("Insufficient space, more shelves need to be purchased.");
        });
     });
});
