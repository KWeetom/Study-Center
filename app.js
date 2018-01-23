var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var url = bodyParser.urlencoded({extended:false});
app.set("view engine", "ejs");

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

var server = app.listen(8080, listening);

function listening(){

   console.log("listening")

}