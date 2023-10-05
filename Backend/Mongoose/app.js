
//before run node app.js in hyper terminal, open a new command prompt and run mongosh to set up the database connection first
const mongoose = require('mongoose');

//Connection to MongoDB database
//⁡⁢⁣⁣This line will specify the port where we will access our MongoDB Server
//⁡⁢⁣⁣Here "fruitsDB" is the name of the database where we want to connect to.⁡
mongoose.connect('mongodb://127.0.0.1:27017/fruitDB');
 
//Here we create new blueprint of our database(Schema)
//This lays foundation for every new fruit document that will be added to our DB (has some validation for name and rating, there are more!)
const fruitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Why no name?"]
    },
    rating:{
        type: Number,
        min: 1,
        max: 10
    },
    review:String
});
 
const Fruit = mongoose.model('Fruit', fruitSchema);
 
const fruit = new Fruit({ 
    name: 'Apple',
    rating:7,
    review:"Apple is solid and good for health." 
});

//fruit.save().then(() => console.log('New fruit is saved. Check in mongo server'));

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});
 
const Person = mongoose.model("Person", personSchema);
 
const person = new Person({
    name: "Jhon",
    age: 37,
    favouriteFruit: fruitSchema //embedding another schema inside of person schema 
});
 
//Guys once you save this person_collection please comment it. Otherwise it will save the same thing multiple times.
//person.save().then(() => console.log('New person is saved. Check in mongo server'));

//How to insert these many fruits at a time? (by using insertMany() method)
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The Best Fruit!"
});
 
const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "The Sour Fruit!"
});
 
const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "The Digestive Fruit!"
});

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Taste not bad."
});
//pineapple.save();

Person.updateOne({name: "Jhon"}, {favouriteFruit: pineapple})
    .then(function () {
        console.log("Successfully update John with his favourite food");
    }) 
    .catch(function (err) {
        console.log(err);
    });
//In latest version of mongoose insertMany has stopped accepting callbacks
//instead they use promises(Which Angela has not taught in this course)
//So ".then" & "catch" are part of PROMISES IN JAVASCRIPT.
 
//PROMISES in brief(If something is wrong please correct me):
//In JS, programmers encountered a problem called "callback hell", where syntax of callbacks were cumbersome & often lead to more problems.
//So in effort to make it easy PROMISES were invented.
//to learn more about promise visit : https://javascript.info/promise-basics
//Or https://www.youtube.com/watch?v=novBIqZh4Bk
 
/*
Fruit.insertMany([kiwi, orange, banana]) 
    .then(function(){
        console.log("Successfully saved all the fruits to fruitsDB");
    })
    .catch(function(err){
        console.log(err);
    });
*/


Fruit.find()
    .then(function (fruits) {
        console.log(fruits);
    })
    .catch(function (err) {
        console.log(err);
});

Fruit.find()
    .then(function (fruits) {
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    })
    .catch(function (err) {
        console.log(err);
    });


//delete an element 
/*
Fruit.deleteOne({_id: "651e36d7f5fa06448b4d6c08"})
    .then(function () {
        console.log("Successfully delete the element");
    }) 
    .catch(function (err) {
        console.log(err);
    });
*/