let { Repository } = require("./repository.js");
let expect = require("chai").expect;

describe("Testing repository class functionality", function () {
    let properties = {
        name: "string",
        age: "number",
        birthday: "object"
    };
    let entity = {
        name: "Pesho",
        age: 22,
        birthday: new Date(1998, 0, 7)
    };
    let repository = new Repository(properties);

    describe("testing 'props' property", function () {
        it("Should return undefined with empty input", function () {
            let a = new Repository();
            expect(undefined).to.equal(a.props);
        });
        it("Should return true when checked if the instance has own property props", function () {
            expect(true).to.equal(repository.hasOwnProperty('props'));
            expect(repository).has.property('props')
            expect(repository.props).to.deep.equal(properties)
        });
        it("Should return object when this.props is called", function () {
            expect('object').to.equal(typeof repository.props);
        });
        it('Should have equal properties as given input',()=>{
            let a  = new Repository(properties);
            expect(a.props.name).to.equal("string");
            expect(a.props.age).to.equal("number");
            expect(a.props.birthday).to.equal("object");

            expect(a.props).to.have.property('name')
            expect(a.props).to.have.property('age')
            expect(a.props).to.have.property("birthday");
        })
    });
    describe("testing 'data' property", function () {
        it("Should return true when checked if the instance has own property data", function () {
            let expected = true;
            let actual = repository.hasOwnProperty('data');
            expect(expected).to.equal(actual);
            expect(repository).to.has.property('data')
            expect(repository.data).to.deep.equal(new Map())
        });
        it("Should return 'object' when this.data is called", function () {
            let expected = 'object';
            let actual = typeof repository.data;
            expect(expected).to.equal(actual);
        });
    });
    describe("testing getter count", function () {
        it("Should return false when checked if the instance has own property count", function () {
            let expected = false;
            let actual = repository.hasOwnProperty('count');
            expect(expected).to.equal(actual);
            expect(repository).to.have.property('count')
        });
        it("Should return a number when this.count is called", function () {
            let expected = 'number'
            let actual = typeof repository.count;
            expect(expected).to.equal(actual);
        });
        it("Should return 1 of the map property with added entity", function () {
            let a = new Repository(properties);
            a.add(entity);

            let expected = 1;
            let actual = a.data.size;
            expect(expected).to.equal(actual);
            expect(a.count).to.equal(1);
        });
        it("Should return 0 of the map property with no added entity", function () {
            let a = new Repository(properties);

            let expected = 0;
            let actual = a.data.size;
            expect(expected).to.equal(actual);
            expect(a.count).to.equal(0);
        });
    });
    describe('testing add', function(){
        it('Should return 0 when an entity is initially added',function(){
            let a = new Repository(properties);
            let id = a.add(entity);
            expect(id).to.equal(0);
            expect(a.count).to.equal(1);

        });
        it('Should return 1 when second entity is added',function(){
            let a = new Repository(properties);
            a.add(entity);
            let id = a.add(entity);

            let expected = 1;
            let actual = id;
            expect(expected).to.equal(actual);
            expect(a.count).to.equal(2);
        });
        it("Should return the correct size of the map property when added 3 entites", function () {
            let a = new Repository(properties);
            let entity2 = {
                name: "Gesho",
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            a.add(entity);
            a.add(entity2);
            a.add(entity2);

            let expected = 3;
            let actual = a.data.size;
            expect(expected).to.equal(actual);
        });
        it("Should throw an error when entity doesn't have equal property for validation", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name2: "Gesho",
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => a.add(wrongEntity)).to.Throw(Error,`Property name is missing from the entity!`);
        });
        it("Should throw an error when entity doesn't have equal property for validation", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name: "Gesho",
                age2: 23,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => a.add(wrongEntity)).to.Throw(Error,`Property age is missing from the entity!`);
        });
        it("Should throw an error when entity doesn't have equal property for validation", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name: "Gesho",
                age: 23,
                birthday2: new Date(1998, 0, 7)
            };
            expect(() => a.add(wrongEntity)).to.Throw(Error,`Property birthday is missing from the entity!`);
        });
        it("Should throw an typeError when entity has property value which is not correct type", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name: 2,
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => a.add(wrongEntity)).to.throw(TypeError,`Property name is not of correct type!`);
        });
        it("Should throw an typeError when entity has property value which is not correct type", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name: "pesho",
                age: '2',
                birthday: new Date(1998, 0, 7)
            };
            expect(() => a.add(wrongEntity)).to.throw(TypeError,`Property age is not of correct type!`);
        });
        it("Should throw an typeError when entity has property value which is not correct type", function () {
            let a = new Repository(properties);
            let wrongEntity = {
                name: "pesho",
                age: 23,
                birthday: 'new Date(1998, 0, 7)'
            };
            expect(() => a.add(wrongEntity)).to.throw(TypeError,`Property birthday is not of correct type!`);
        });
         it('Should return 3 when third entity is added',function(){
            let a = new Repository(properties);
            a.add(entity);
            a.add(entity);
            a.add(entity);

            expect(a.count).to.equal(3);
        });
    });
    describe('testing getId', function(){
        it('Should return second entity with two elements in the map',()=>{
            let a = new Repository(properties);
            let entity = {
                name: 'Pesho',
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            let entity2 = {
                name: 'Gesho',
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            a.add(entity);
            a.add(entity2);

            let expected = {
                name: 'Gesho',
                age: 23,
                birthday: new Date(1998, 0, 7)
            };
            let actual = a.getId(1);
            expect(expected).to.deep.equal(entity2);
        });
        it('Should throw error when id is not in the map',()=>{
            expect(()=>repository.getId(0)).to.throw(Error,(`Entity with id: 0 does not exist!`));
        })
    });
    describe('testing update', function(){
        it('Should throw error when no elements',()=>{
            expect(()=>repository.update(0,{})).to.throw(Error,(`Entity with id: 0 does not exist!`));
        });
        it('Should throw error with invalid property name',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name2: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( Error,(`Property name is missing from the entity!`));
        });
        it('Should throw error with invalid property name',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name: "Pesho",
                age2: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( Error,(`Property age is missing from the entity!`));
        });
        it('Should throw error with invalid property name',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name: "Pesho",
                age: 22,
                birthday2: new Date(1998, 0, 7)
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( Error,(`Property birthday is missing from the entity!`));
        })
        it('Should throw error with invalid name',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name: 2,
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( TypeError,(`Property name is not of correct type!`));
        });
        it('Should throw error with invalid age',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name: 'pesho',
                age:'3',
                birthday: new Date(1998, 0, 7)
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( TypeError,(`Property age is not of correct type!`));
        });
        it('Should throw error with invalid birthday',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let invalidEntity = {
                name: 'pesho',
                age: 3,
                birthday: 3
            };
            expect(()=>a.update(0,invalidEntity)).to.throw( TypeError,(`Property birthday is not of correct type!`));
        });
        it('Should return correct entity',()=>{
            let a = new Repository(properties);
            a.add(entity);
            let entity2 = {
                name: "Gesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            a.update(0,entity2);
            expect(a.getId(0)).to.deep.equal(entity2);
            expect(a.data.get(0)).to.deep.equal(entity2);
        })
    });
    describe('testing del', function(){
        it('Should throw error with invalid id',()=>{
            expect(()=>repository.del(0)).to.throw(Error,(`Entity with id: 0 does not exist!`))
        });
        it('Should delete a valid id from the map',()=>{
            let a = new Repository(properties);
            a.add(entity);
            a.del(0);
            expect(()=>repository.getId(0)).to.throw(Error,(`Entity with id: 0 does not exist!`));
        });
        it('Should delete a valid id from the map',()=>{
            let a = new Repository(properties);
            a.add(entity);
            a.add(entity);
            a.del(0);
            expect(a.count).to.equal(1);
        });
    })
});
