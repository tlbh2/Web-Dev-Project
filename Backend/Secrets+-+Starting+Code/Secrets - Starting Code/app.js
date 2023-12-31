//salting and hashing passwords with bcrypt
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended : true
}));

//connect to local database by mongodb
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

//an object that created from Schema class of mongodb
const userSchema = new mongoose.Schema({
    email : String,
    password : String
});


const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res){
    res.render("home");
});

app.get("/login", function (req, res){
    res.render("login");
});

app.get("/register", function (req, res){
    res.render("register");
});

app.post("/register", function (req, res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
            email : req.body.username,
            password : hash 
        })
    
        newUser.save()
        .then(function(){
            res.render("secrets");
        })
        .catch(function(err){
            console.log(err);
        });
    });

    
});

app.post("/login", function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email : username})
    .then(function (foundUser) {
        // Load hash from your password DB.
        bcrypt.compare(password, foundUser.password, function(err, result) {
            if(result === true){
                res.render("secrets");
            } 
        });
    })
    .catch(function (err) {
        console.log(err);
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
})
