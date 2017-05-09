window.onload = function(){"use strict";

var allName = document.getElementById('allName');
var loggin = document.getElementById("loggin");     
var loggut = document.getElementById("loggut");
var paragraf = document.getElementById("paragraf");
var text = document.getElementById("text");    
var submit = document.getElementById('submit'); 
                           
var table = document.getElementById("table");                           



var nyttmsg = 0;
var user = localStorage.getItem("allName");    


 /***loggin**/
    

loggin.addEventListener('click',function (event){
    user = allName.value;
    paragraf.innerHTML = "Välkommen" + user + "!";
    localStorage.setItem('allName', user);
    allName.value="";
    loggin.disabled = true;
    
});    
    
    
 /**loggut**/
    

loggut.addEventListener("click", function(event){
localStorage.removeItem('allName', user);
    paragraf.innerHTML = "Vänligen skriv ditt namn";
    loggin.disabled = false;
}); 
    
    


 /**meddelande**/
    
submit.addEventListener("click", function(event){
    console.log("Text: " + text.value + "");
    
    nyttmsg++;
    var time = new Date(new Date().getTime()).toLocaleString();
    
   var fb = firebase.database();
    
    fb.ref("message/" + nyttmsg).set({
    name: user,
    meddelande: text.value,
    id: nyttmsg,
    time: time /*moment().format('MMMM Do YYYY, h:mm:ss a'), // March 21st 2017, 12:38:42 pm*/
      
    })
    
    /*text.value = "";*/        /*fb.ref('message/' + message.id).set(message);*/
    
fb.ref().child("message").once("value",function(snapshot){
  var data = snapshot.val();
  var count = Object.keys(data).length;
  
    });
    
}); 
    
    
    /**visa meddelande**/
    
submit.addEventListener("click", function(event){
    table.innerHTML = "";
    
    firebase.database().ref('message/').once('value', function(snapshot) {
	var allData = snapshot.val();
	   Object.keys(allData).reverse().forEach(function(key){
    var message = allData[key];
           
    var tr = document.createElement("tr");
tr.innerHTML = `<td>${message.name}</td>
<td>${message.meddelande}</td> <td>${message.time}</td> <td>${message.id}</td>`
            table.appendChild(tr);
           /*message.name + "<td>" + message.meddelande + "<td>" + message.time + "<td>" + message.id;
           table.appendChild(tr);*/
           
        
        }) 
    });
    
});
}
  