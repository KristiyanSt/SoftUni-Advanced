let expect = require('chai').expect;
let ChristmasMovies = require('./02.Christmas-movies');

describe("Testing ChristmasMovies class", function() {
    describe("Testing buyMovie function", function() {
        it("Should return proper output with valid movie and actors", function() {
            let christmas = new ChristmasMovies();
            let result = christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);

            expected = `You just got Last Christmas to your collection in which Madison Ingoldsby, Emma Thompson, Boris Isakovic are taking part!`;
            expect(result).to.equal(expected);
        });
        it("Should return proper output without inputs", function() {
            let christmas = new ChristmasMovies();
            let result = christmas.buyMovie();

            expected = `You just got undefined to your collection in which  are taking part!`;
            expect(result).to.equal(expected);
        });
        it("Should return error when movieCollection includes the movie", function() {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);

            expected = `You already own Last Christmas in your collection!`
            expect(()=>christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.throw(Error,expected);
        });
     });
     describe("Testing discardMovie function", function() {
        it("Should throw error with invalid movie", function() {
            let christmas = new ChristmasMovies();
            expect(()=>christmas.discardMovie('bla')).to.throw(Error,`bla is not at your collection!`);
        });
        it("Should discard movie from movieCollection and watched", function() {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            christmas.watchMovie('Last Christmas');
            expect(christmas.discardMovie('Last Christmas')).to.equal(`You just threw away Last Christmas!`);
            expect(christmas.movieCollection.includes('Last Christmas')).to.equal(false);
            expect(christmas.movieCollection.indexOf('Last Christmas')).to.equal(-1);
            expect(christmas.watched['Last Christmas']).to.equal(undefined);
        });
     });
     describe("Testing watchMovie function", function() {
        it("Should throw error with invalid movie", function() {
            let christmas = new ChristmasMovies();
            expect(()=>christmas.watchMovie('Eric')).to.throw(Error,'No such movie in your collection!');
        });
        it("Should add movie to watched", function() {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            christmas.watchMovie('Last Christmas');
            expect(christmas.watched['Last Christmas']).to.equal(1);

            christmas.watchMovie('Last Christmas');
            expect(christmas.watched['Last Christmas']).to.equal(2);
        });
     });
     describe("Testing favouriteMovie function", function() {
        it("Should throw error with invalid movie", function() {
            let christmas = new ChristmasMovies();
            expect(()=>christmas.favouriteMovie()).to.throw(Error,'You have not watched a movie yet this year!');
        });
        it("Should return Don Korleone watched 2 times", function() {
            let christmas = new ChristmasMovies();

            christmas.buyMovie('Last Christmas', 
            ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            christmas.buyMovie('Don Korleone', 
            ['Mary Jane', 'Brat Pitt']);

            christmas.watchMovie('Don Korleone');
            christmas.watchMovie('Last Christmas');
            christmas.watchMovie('Don Korleone');
            expect(christmas.favouriteMovie()).to.equal(`Your favourite movie is Don Korleone and you have watched it 2 times!`);
        });
     });
     describe("Testing mostStarredActor function", function() {
        it("Should throw error when movieCollection is empty", function() {
            let christmas = new ChristmasMovies();
            expect(()=>christmas.mostStarredActor()).to.throw(Error,'You have not watched a movie yet this year!');
        });
        it("Should return Ben Tomas with 2 roles", function() {
            let christmas = new ChristmasMovies();
            christmas.buyMovie('Last Christmas', 
            ['Ben Tomas', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            christmas.buyMovie('Don Korleone', 
            ['Mary Jane', 'Brat Pitt', 'Ben Tomas']);
            christmas.buyMovie('Prison Break', 
            ['Mary', 'Brat']);
            expect(christmas.mostStarredActor()).to.equal(`The most starred actor is Ben Tomas and starred in 2 movies!`);

            christmas.buyMovie('Scofield', 
            ['Mary', 'Brat']);
            expect(christmas.mostStarredActor()).to.equal(`The most starred actor is Ben Tomas and starred in 2 movies!`);
            
            christmas.watchMovie('Last Christmas');
            christmas.discardMovie('Last Christmas');
            expect(christmas.mostStarredActor()).to.equal(`The most starred actor is Mary and starred in 2 movies!`);
        });
        
     });
});

