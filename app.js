var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var url = bodyParser.urlencoded({extended:false});
app.set("view engine", "ejs");
app.use(express.static('views'));

var allData = fs.readFileSync('data.json');
var fileData= [];
fileData = JSON.parse(allData);

var loggedUser;

app.get("/", function(req, res){
	console.log('')
	
	res.render("index.ejs");

});

app.post('/add/info', url, postMsg);

function postMsg(request,response){
  	var username = request.body.username;
  	var password = request.body.password;
  	console.log(username);
  	console.log(password);
    
    var User = {'username': username , 'password':password};
   
    fileData.push(User);
    console.log(fileData);
    fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
        if(err){
            console.log(err);
        }
    });
    response.redirect('/');
}

var server = app.listen(8080, listening);

function listening(){

   console.log("listening")

}


//these functions generate new objects for the users
function user(email, password){
  this.email =email;
  this.password = password;
  this.classes = [];
}
function classList(className){
  this.className = className;
  this.decks = [];
}
function deckList(deckName){
  this.deckName = deckName;
  this.cardNumber = 0;
  this.cards = [];
}


// when making a new user
function signUp(){
  var username = request.body.username;
  var password = request.body.password;

  var newUser = new user(username,password);
  fileData.push(newUser);

  index = a.findIndex(x => x.prop2==newUser.email);
  loggedUser = {"userInfo":newUser, "fileDataIndex":index};
}
//when add new class to that user
function newClass(){
  //get name of class from user
  var classname;

  var classToAdd = new classList(classname);
  loggedUser.classes.push(classToAdd);
}
//generate a new deck for specified class
function newDeak(){
  //get deckname
  var deckname;
  //figure out how to checj what class were in
  var classindex;
  var deckToAdd = new deckList(deckname);
  loggedUser.classes[classindex].decks.push(deckToAdd);
}
//adds new cards to the deck and increment card number
function addnewCard(){

  loggedUser.classes[classindex].decks[deckindex].cardNumber++;
  loggedUser.classes[classindex].decks[deckindex].cards.push(userinput)
}