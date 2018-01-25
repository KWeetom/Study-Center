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

// ********************************************

//takes in info from form and check their input vs what is in JSON and opens 
//profile if information matches.
app.post('/login',urlencodedParser,function(req,res){
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
                //res.redirect('/profile');
                res.render("index2.ejs");
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