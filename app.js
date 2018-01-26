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
var currentsubject = 0;
var deckindex = 0;
var currentcard = 0;

app.get("/", function(req, res){
  console.log('')
  
  res.render("index.ejs");

});


app.get("/profile", function(req, res){
  console.log('')
  
  res.render("index2.ejs",{userInfo:loggedUser.userInfo,currentsubject:currentsubject});//then here you add the user/object to display all of their content

});
app.get("/profile/:classindex", function(req, res){
    currentsubject = req.params.classindex;
    res.redirect('/profile')
});


app.get('/page3',function(req,res){
  res.render('index3.ejs',{deckdata:loggedUser.userInfo.classes[currentsubject],deckindex:deckindex,currentcard:currentcard});

})
app.get("/decks/:index",function(req,res){
  deckindex = req.params.index;
  res.redirect('/page3');
});
app.get("/decks/cards/:card", function(req,res){
  currentcard = req.params.card;
  console.log(currentsubject)
  res.redirect('/page3')
});

app.post('/log', url,function (req, res) {

  console.log("im in log in");
  var username = req.body.username;
  var password = req.body.password;
  console.log(username + "   " + password)
  //infoarray.forEach(function(element, index) {
  
  for(var i=0;i<fileData.length;i++){
      // statements
      console.log(username == fileData[i].username)
      if(username == fileData[i].username){
          if(password == fileData[i].password){
              console.log('you logged in');
              loggedUser = {"userInfo":fileData[i], "fileDataIndex":i};

              res.redirect('/profile'); // make sure also adds all the info of tht obj/user
              break;
          }
          else{
              console.log('Wrong password Entered)(()()(');
              res.redirect('/');
          }
      }
      else if(i==fileData.length-1){
          console.log('Not here');
          res.redirect('/');
      }
    }
  //res.redirect('/profile');
});

app.post('/create', url, function (req, res) {
    console.log('creating');
    var username = req.body.username;
    var password = req.body.password;
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
    res.redirect('/profile');

});


app.post('/add/info', url, postMsg);

function postMsg(request,response){
  	var username = request.body.username;
  	var password = request.body.password;
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
    response.redirect('/profile');
}
//add new class to list
app.post('/subjectTitle',function(req,res){
  var subjectTitle = req.body.subjT1;
  newClass(subjectTitlej);
});

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
                 loggedUser = {"userInfo":fileData[i], "fileDataIndex":i};
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

var server = app.listen(3000, listening);
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
function signUp(username,password){
  // var username = request.body.username;
  // var password = request.body.password;

  var newUser = new user(username,password);
  fileData.push(newUser);
  index = fileData.findIndex(x => x.username==newUser.email);
  loggedUser = {"userInfo":newUser, "fileDataIndex":index};
}
//when add new class to that user

function newClass(classname){
  //get name of class from user
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
function newDeck(){
  //get deckname
  var deckname;
  //figure out how to checj what class were in
  var classindex;
  var deckToAdd = new deckList(deckname);
  loggedUser.userInfo.classes[currentsubject].decks.push(deckToAdd);
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

