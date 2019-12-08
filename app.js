//Import Required Packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Create object of express class
const app = express();

//Connect to mongoDB database
mongoose.connect("mongodb://localhost:27017/playerscoreDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Set view engine to use EJS template
app.set("view engine", "ejs");

//To use CSS file define the static folder
app.use(express.static("public"));

//Create Schemas

const playersSchema = new mongoose.Schema({
  name: String,
  score: String
});

//Create Model or Collection

const Player = new mongoose.model("Player", playersSchema);

//Home Get route
app.get("/", function(req, res) {

// Player.find({}).sort({ score: 1}).exec(function(err, foundPlayers) {
Player.find({} ,function(err, foundPlayers) {

  if (foundPlayers) {
    res.render("playerslist", {
       eplayers: foundPlayers
    });
  } else {
    res.render("playerslist",{});
  }
});
});

//Home Post route
app.post("/", function(req, res) {

//console.log(typeof(playerscore));
const playername= req.body.playername;
const playerscore= req.body.playerscore;
if(playername && playerscore){

  if(req.body.buttonoperation === 'add'){
    const player = new Player({
      name: playername,
      score: playerscore
    });
    player.save();

    res.redirect("/");
  }
  else if (req.body.buttonoperation === 'update') {
  //Player.findOneAndUpdate({name: playername},{$set: {score:playerscore}});

  Player.findOneAndUpdate({name:playername},{$set:{score:req.body.playerscore}},function(err){
    if(!err){

      res.redirect("/");
    }
  });
  }
}
else{
console.log("Invalid input!!!");
res.redirect('/');
}
});

//Delete route
app.post("/delete", function(req, res) {

  const checkedPlayer = req.body.checkedBox;
  const buttonoOperation = req.body.buttonoperation;

  if(buttonoOperation === "delete"){
    Player.findByIdAndDelete({
      _id: checkedPlayer
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
  else{
    if(!err){
      res.redirect("/"+listName);
    }
  }
console.log(req.body);
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000
}
app.listen(port, function() {
  console.log("Server has started successfully...");
});
