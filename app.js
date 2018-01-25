var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var url = bodyParser.urlencoded({extended:false});
app.set("view engine", "ejs");
app.use(express.static('public'));

var allData = fs.readFileSync('data.json');
var fileData= [];
fileData = JSON.parse(allData);

var loggedUser;

app.get("/", function(req, res){
	console.log('')
	
	res.render("index.ejs");

});
app.get("/profile", function(req, res){
  console.log('')
  
  res.render("index2.ejs");//then here you add the user/object to display all of their content

});

app.post('/log', url, function (req, res) {
  console.log("im in log in");
  res.redirect('/profile');
});

app.post('/create', url, function (req, res) {
    console.log('creating');
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    
    var User = {'username': username , 'password':password};
   
    fileData.push(User);
    console.log(fileData.findIndex(x => x.username==username));
    fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/profile');
});


// app.post('/add/info', url, postMsg);

// function postMsg(request,response){
//   	var username = request.body.username;
//   	var password = request.body.password;
//   	console.log(username);
//   	console.log(password);
    
//     var User = {'username': username , 'password':password};
   
//     fileData.push(User);
//     console.log(fileData.findIndex(x => x.username==username));
//     fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
//         if(err){
//             console.log(err);
//         }
//     });
//     response.redirect('/profile');
// }

// ********************************************

//takes in info from form and check their input vs what is in JSON and opens 
//profile if information matches.
app.post('/login',url,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    // console.log(username + "   " + password)
    //infoarray.forEach(function(element, index) {
    for(var i=0;i<fileData.length;i++){
        // statements
        console.log(username == fileData[i].username)
        if(username == fileData[i].username){
            if(password == fileData[i].password){
                console.log('you logged in');
                selectedProfile = fileData[i];
                res.redirect('/profile'); // make sure also adds all the info of tht obj/user
                break;
            }
            else{
                console.log('Wrong password Entered)(()()(');
                res.redirect('/');
            }
        }
        else if(i==infoarray.length-1){
            console.log('Not here');
            res.redirect('/');
        }
    }
});

// ********************************************

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

  index = fileData.findIndex(x => x.username==newUser.email);
  loggedUser = {"userInfo":newUser, "fileDataIndex":index};
}
//when add new class to that user
function newClass(){
  //get name of class from user
  var classname;

  var classToAdd = new classList(classname);
  loggedUser.userInfo.classes.push(classToAdd);
  filedata[loggedUser.index] = loggedUser.userInfo;

}
//generate a new deck for specified class
function newDeak(){
  //get deckname
  var deckname;
  //figure out how to checj what class were in
  var classindex;
  var deckToAdd = new deckList(deckname);
  loggedUser.userInfo.classes[classindex].decks.push(deckToAdd);
  filedata[loggedUser.index] = loggedUser.userInfo;

}
//adds new cards to the deck and increment card number
function addnewCard(){

  loggedUser.userInfo.classes[classindex].decks[deckindex].cardNumber++;
  loggedUser.userInfo.classes[classindex].decks[deckindex].cards.push(userinput)
  filedata[loggedUser.index] = loggedUser.userInfo;
}