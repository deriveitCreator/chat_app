var youtubeId = null;
var activeLiveChatId = null;
var backendURL = "https://django-apps.vercel.app/uchat_backend/";
var token = null;
var tokenExpiry = null;
var refreshToken = null;

function oauthSignIn(event) {
  event.preventDefault();
  fetch(backendURL + "/authorize")
  .then(res => res.json())
  .then(res => {
    window.electronAPI.googleSignIn(res.authorization_url);
  });
}

window.electronAPI.onGotMessage((obj) => {
  token = obj.token;
  tokenExpiry = new Date(obj.expiry + "Z");
  refreshToken = obj.refresh_token;
  alert("Successfully signed in.");
  if (youtubeId) setLiveChatId();
})

function connectStream(event){
  event.preventDefault();
  let connectButton = document.getElementById("connectButton");
  connectButton.setAttribute("disabled","true");
  activeLiveChatId = null;
  youtubeId = document.getElementById("youtubeId").value;
  window.electronAPI.setPage(youtubeId);
}

window.electronAPI.setPageCallBack((success)=>{
  if (success) {
    alert("Connected!");
    if (token) setLiveChatId();
  }
  else alert("Error connecting to live stream!");
  let connectButton = document.getElementById("connectButton");
  if (connectButton)
    document.getElementById("connectButton").removeAttribute("disabled");
})

function setLiveChatId(){
  fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtubeId}&access_token=${token}`)
  .then(res => res.json())
  .then(res => {
    let item = res.items[0];
    if(item.snippet.liveBroadcastContent === 'live') {
      activeLiveChatId = item.liveStreamingDetails.activeLiveChatId;
      alert("Since you signed in, you can send messages to stream.");
    }
    else{
      alert("Connection Error.\nPlease check if this is a valid live stream ID.");
    };
    connectButton.removeAttribute("disabled");
  })
  .catch(res => {
    console.log("response:", res);
    alert("There was an error.");
    connectButton.removeAttribute("disabled");
  });
}

function sendMessage(){
  var userTextEl = document.getElementById("userText");
  var userText = userTextEl.value;
  userTextEl.value = "";
  fetch(`https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet&access_token=${token}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "snippet": {
        "liveChatId": activeLiveChatId,
        "type": "textMessageEvent",
        "textMessageDetails": {
          "messageText": userText
        }
      }
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Error sending message.")
  })
  .catch(err => {
    alert(err);
  });
  setTimerValOnSendButton(25);
}

function setTimerValOnSendButton(sec){
  let sendButtonEl = document.getElementById("sendButton");
  if (sendButtonEl) {
    if (sec > 0){
      sendButtonEl.removeAttribute("onclick");
      sendButtonEl.textContent = sec;
      sendButtonEl.setAttribute("data-disabled", true);
      setTimeout(setTimerValOnSendButton, 1000, sec-1);
    }
    else {
      sendButtonEl.textContent = "";
      let innerSpan = document.createElement("span");
      innerSpan.classList.add("material-symbols-rounded");
      innerSpan.textContent = "Send"
      sendButtonEl.append(innerSpan);
      sendButtonEl.removeAttribute("data-disabled");
      sendButtonEl.onclick = sendMessage;
    }
  }
}