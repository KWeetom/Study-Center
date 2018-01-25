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
  
  res.render("index2.ejs");

});

app.get("/profile", function(req, res){
  console.log('')
  
  res.render("index2.ejs");

});


app.post('/add/info', url, postMsg);

function postMsg(request,response){
  	var username = request.body.username;
  	var password = request.body.password;
  	console.log(username);
  	console.log(password);
    
    // var User = {'username': username , 'password':password};
   
    // fileData.push(User);
    // console.log(fileData.findIndex(x => x.username==username));
    // fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });

    signUp(username,password);
    newClass('testclass');
    newDeck('testdect')
    response.redirect('/profile');
}

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
  this.username =email;
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
function signUp(username,password){
  var newUser = new user(username,password);
  fileData.push(newUser);
  index = fileData.findIndex(x => x.username==newUser.email);
  loggedUser = {"userInfo":newUser, "fileDataIndex":index};

  fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
      if(err){
          console.log(err);
      }
  });
  console.log(fileData.findIndex(x => x.username==username));

}
//when add new class to that user
function newClass(name){
  //get name of class from user
  var classname = name;

  var classToAdd = new classList(classname);
  loggedUser.userInfo.classes.push(classToAdd);
  fileData[loggedUser.index] = loggedUser.userInfo;
  fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
      if(err){
          console.log(err);
      }
  });

}
//generate a new deck for specified class
function newDeck(name){
  //get deckname
  var deckname = name;
  //figure out how to checj what class were in
  var classindex = 0;
  var deckToAdd = new deckList(deckname);
  loggedUser.userInfo.classes[classindex].decks.push(deckToAdd);
  fileData[loggedUser.index] = loggedUser.userInfo;
  fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
      if(err){
          console.log(err);
      }
  });

}
//adds new cards to the deck and increment card number
function addnewCard(){

  loggedUser.userInfo.classes[classindex].decks[deckindex].cardNumber++;
  loggedUser.userInfo.classes[classindex].decks[deckindex].cards.push(userinput)
  fileData[loggedUser.index] = loggedUser.userInfo;
  fs.writeFile('data.json',JSON.stringify(fileData, null, 2),function(err){
      if(err){
          console.log(err);
      }
  });  
}