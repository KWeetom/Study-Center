
// function addNewDeck(event){
// 	alert("sup");
// 	document.getElementById("section").innerHTML = '<div class="card" style="width: 8rem;"><div class="card-body"><h5 class="card-title">Subject</h5></div></div>';
// }

$("#firstAddBtn").click(function(){
    $("#subjSec").append('<div class="card move" style="width: 8rem;"><div class="card-body"><h5 class="card-title">Subject</h5><input type="text" id="subjName" size="9"> </div></div>');
    // $("#subjName").submit(); 
});

$("#secondAddBtn").click(function(){
    $("#cardSec").append('<div class="card move border-success mb-3" style="max-width: 18rem;"><div class="card-header bg-transparent border-success">Index card info: </div><div class="card-body text-success"><h5 class="card-title">Success card title</h5><p class="card-text">Write your study notes here</p></div><div class="card-footer bg-transparent border-success">Resources</div></div>');
});

// window.onload=function() {
//   document.getElementById("subName").submit(); // using ID
// }


