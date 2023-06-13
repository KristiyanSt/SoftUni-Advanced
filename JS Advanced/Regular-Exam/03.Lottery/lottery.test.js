let lottery = require('./Lottery');
let expect = require('chai').expect;

describe("Tests lottery", function() {
    describe("buyLotteryTicket ", function() {
        it("Should throw error with invalid inputs", function() {
            expect(()=>lottery.buyLotteryTicket(1,1,false)).to.throw(Error,"Unable to buy lottery ticket!");
            expect(()=>lottery.buyLotteryTicket(0,1,true)).to.throw(Error,"Invalid input!");
            expect(()=>lottery.buyLotteryTicket(1,0,true)).to.throw(Error,"Invalid input!");
            expect(()=>lottery.buyLotteryTicket(1,0,'3')).to.throw(Error,"Invalid input!");
            expect(()=>lottery.buyLotteryTicket('1','0',true)).to.throw(Error,"Invalid input!");
            expect(()=>lottery.buyLotteryTicket()).to.throw(Error,"Invalid input!");
        });
        it("Should return proper output with valid inputs",()=>{
            expect(lottery.buyLotteryTicket(NaN,NaN,true)).to.equal('You bought NaN tickets for NaN$.');
            expect(lottery.buyLotteryTicket(1,1,true)).to.equal('You bought 1 tickets for 1$.');
            expect(lottery.buyLotteryTicket(0.1,1,true)).to.equal('You bought 1 tickets for 0.1$.');
            expect(lottery.buyLotteryTicket(2,2,true)).to.equal('You bought 2 tickets for 4$.');
        })
     });
     describe("checkTicket", function() {
        it("Should throw error with invalid inputs", function() {
            expect(()=>lottery.checkTicket()).to.throw(Error,"Invalid input!");
            expect(()=>lottery.checkTicket([],'3')).to.throw(Error,"Invalid input!");
            expect(()=>lottery.checkTicket('3',[])).to.throw(Error,"Invalid input!");
            expect(()=>lottery.checkTicket([],[])).to.throw(Error,"Invalid input!");
            let a = [1,2,3,4,5];
            let b = [6,7,8,9,10];
            let c = [1,2,3,4,5,6,7];
            let d = [6,7,8,9,10,11,12];
            expect(()=>lottery.checkTicket(a,b)).to.throw(Error,"Invalid input!");
            expect(()=>lottery.checkTicket(c,d)).to.throw(Error,"Invalid input!");
        });
        it("Should return proper output with valid input",()=>{
            let a = [1,2,3,7,8,9];
            let b = [1,2,3,4,5,6];
            expect(lottery.checkTicket(a,b)).to.equal("Congratulations you win, check your reward!");
            let c = [1,2,3,3,7,8];
            let d = [1,2,3,4,5,6];
            expect(lottery.checkTicket(c,d)).to.equal("Congratulations you win, check your reward!");
            let e = [3,3,3,3,3,3];
            let f = [1,2,3,4,5,6];
            expect(lottery.checkTicket(e,f)).to.equal(undefined);
            let g = [3,4,5,6,7,8];
            let h = [3,4,5,6,7,8];
            expect(lottery.checkTicket(g,h)).to.equal("You win the JACKPOT!!!");
            let j = [3,4,5,6,7,8];
            let k = [3,4,5,6,7,8];
            expect(lottery.checkTicket(g,h)).to.equal("You win the JACKPOT!!!");
        })
     });
     describe("secondChance", function() {
        it("Should throw error with invalid inputs", function() {
            expect(()=> lottery.secondChance('3',[])).to.throw(Error,"Invalid input!");
            expect(()=> lottery.secondChance(3,'3')).to.throw(Error,"Invalid input!");
            expect(()=> lottery.secondChance()).to.throw(Error,"Invalid input!");
        });
        it("Should return valid output", function() {
            expect(lottery.secondChance(NaN,[])).to.equal("Sorry, your ticket didn't win!");
            expect(lottery.secondChance(3,[1,2])).to.equal("Sorry, your ticket didn't win!");
            expect(lottery.secondChance(3,[])).to.equal("Sorry, your ticket didn't win!");
            expect(lottery.secondChance(3,['3'])).to.equal("Sorry, your ticket didn't win!");
            expect(lottery.secondChance(3,[3])).to.equal("You win our second chance prize!");
            expect(lottery.secondChance(1,[1.1,2,3])).to.equal("Sorry, your ticket didn't win!");
        });
     });

});
