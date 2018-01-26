
// function addNewDeck(event){
// 	alert("sup");
// 	document.getElementById("section").innerHTML = '<div class="card" style="width: 8rem;"><div class="card-body"><h5 class="card-title">Subject</h5></div></div>';
// }

$("#firstAddBtn").click(function(){
 $("#subjSec").append('<div class="card move" style="width: 8rem;"><form method= "POST" action = "/newSubject"><div class="card-body form-group"><h5 class="card-title">Subject</h5><input type="text" id="subjName" name="subjName" size="9"> </div></form></div>');
});

$("#secondAddBtn").click(function(){
    $("#cardSec").append('<div class="card move border-success mb-3" style="max-width: 18rem;"><form method="POST" action="/newDeck"><div class="card-header bg-transparent border-success"><label for="subject"> Index card info: </label><input type="text" name="deckName" id="subjName" size="14"></div><div class="card-body text-success"><h5 class="card-title">Success card title</h5><p class="card-text"><label for="subject">Notes: </label><br><textarea id="subject" name="deckdescription" placeholder="Write something.." style="height:70px"></textarea></p></div><div class="card-footer bg-transparent border-success">Resources</div></form></div>');
});

 function work() {
    var info = document.forms["form1"]["textInfo"].value;
   // alert(info);
   //document.getElementById("subjT").innerHTML = info;
   document.getElementById("subj3").innerHTML = '<div class="card" style="width: 8rem;"><div class="card-body"><h5 class="card-title">'+ info +'</h5></div></div>';
  }
// window.onload=function() {
//   document.getElementById("subName").submit(); // using ID
// }


