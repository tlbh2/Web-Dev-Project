//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect to mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

//create schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

//create a model
const Item = mongoose.model( "Item" ,itemsSchema);

const item1 = new Item({
  name : "Homework"
});

const item2 = new Item({
  name : "say something"
});

const item3 = new Item({
  name : "I mean write something"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {

  //tap into all items in "items" collection 
  Item.find({}).then(function(foundItems){
    if (foundItems.length === 0){
      Item.insertMany(defaultItems)
        .then(function(){
          console.log("Successfully saved into our DB.");
        })
        .catch(function(err){
          console.log(err);
        });
        res.redirect("/");
    }else{
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  })
  .catch(function(err){
    //render that 
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  });

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
