window.onload = function(){


var submit = document.getElementById('submit');
var firstN = document.getElementById('firstN');
var lastN = document.getElementById('lastN');
var text = document.getElementById("text");    
var table = document.getElementById("table");
var view = document.getElementById("view");    
var allName = firstN.value + " " + lastN.value;
    
    
 /***loggin**/
    
loggin.addEventListener('click',function(){
  localStorage.setItem('whatever', allName);
    if (localStorage.getItem('whatever') !== null){
        var paragraf = document.getElementById("paragraf");
        paragraf.innerHTML = "Välkommen: " + localStorage.getItem('whatever');  
    } else{
        var paragraf = document.getElementById("paragraf");
        paragraf.innerHTML = "Skriv in ditt namn" + localStorage.getItem('whatever');
    }
  
  var fb = firebase.database();
    fb.ref().child("message").once("value",function(snapshot){
  var data = snapshot.val();
  var count = Object.keys(data).length;
  var message = {
      name: allName,
      text: text.value,
      time: moment().format('MMMM Do YYYY, h:mm:ss a'), // March 21st 2017, 12:38:42 pm
      id: count+1
      
  } 
  
  fb.ref('message/' + message.id).set(message);

    });
  
    
});


view.addEventListener("click", function(event){
table.innerHTML = "";
    firebase.database().ref('message/').once('value', function(snapshot) {
	var allData = snapshot.val();
        Object.keys(allData).reverse().forEach(function(key){
            var meddelande = allData[key];
            
    var tr = document.createElement("tr");
            tr.innerHTML = `<td>${meddelande.name}</td>
<td>${meddelande.text}</td> <td>${meddelande.time}</td> <td>${meddelande.id}</td>`
            table.appendChild(tr);
        })
	
});

});

    
    
    
    
/**loggut**/
    
var loggaut = document.getElementById("loggaut")
loggut.addEventListener("click", function(event){
localStorage.removeItem("whatever");
    paragraf.innerHTML = "Vänligen skriv ditt namn";
    
}); 
    


    
}