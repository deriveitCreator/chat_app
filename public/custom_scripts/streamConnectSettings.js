
var youtubeId = null;

async function connectStream(event){
  event.preventDefault();
  youtubeId = null;
  let connectButton = document.getElementById("connectButton");
  connectButton.setAttribute("disabled","true");
  let userInputId = document.getElementById("youtubeId").value;
  youtubeId = userInputId;
  alert("Connected!");
  connectButton.removeAttribute("disabled");
}