//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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

const listSchema = {
  name : String,
  items : [itemsSchema]
}

const List = mongoose.model("List", listSchema);

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
    //render list.ejs with params
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  });

});

//custome route
app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  
  List.findOne({ name: customListName }) 
  .then(function (foundList) {
    if (!foundList) {  // Checks if list is found
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + customListName);
      console.log("Created new list with default items");
    } else {
      //render list.ejs
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      console.log("List already exists");
    }
  })
  .catch(function (err) {
    console.log(err);
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

    //check wether it is a default page or custom page
  if (listName === "Today"){
    //save item to mongodb
    item.save();
    //redirect to homepage so that it get display
    res.redirect("/");
  }else{
    List.findOne({ name: listName }) 
      .then(function (foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

});

app.post("/delete", function(req, res){
  const checkedItemid = req.body.checkbox;
  const listName = req.body.listName;

  if ( listName === "Today"){
    Item.findByIdAndRemove(checkedItemid)
    .then(function () {
      console.log("successfully deleted checked item");
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
  }else{
    List.findOneAndUpdate({ name: listName }, {$pull: {items: {_id: checkedItemid}}}) 
      .then(function (foundList) {
        res.redirect("/" + listName);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
 
});



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
