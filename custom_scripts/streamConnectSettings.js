
var activeLiveChatId = null;
var continueChatLoop = false;
var readOnlyMode = true;

function setStreamSettings(event){
  event.preventDefault();

  for(streamConnectElId of ["apiKey","youtubeID"])
    settings[streamConnectElId] = document.getElementById(streamConnectElId).value;

  if(document.getElementById("readOnlyButton").getAttribute("tabindex") === "-1")
    readOnlyMode = false;
  else readOnlyMode = true;

  setLiveChatID(settings["youtubeID"], settings["apiKey"]);
}

function setLiveChatID(youtubeID, apiKey){
  fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${youtubeID}&key=${apiKey}`)
  .then(res => res.json())
  .then(res => {
    let itemsDetails = res.items[0];
    if(itemsDetails.snippet.liveBroadcastContent !== "live"){
      activeLiveChatId = null;
      alert("Please use a Youtube stream that is currently live.");
    }
    else {
      activeLiveChatId = itemsDetails.liveStreamingDetails.activeLiveChatId;
      alert("Youtube stream successfully connected.");
    }
  })
  .catch(alert("Error setting Youtube stream"));
}

async function chatLoop(curNPT = null){
  var url;
  if(curNPT)
    url = `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${activeLiveChatId}&part=authorDetails,snippet&key=${settings["apiKey"]}&pageToken=${curNPT}`;
  else
    url = `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${activeLiveChatId}&part=authorDetails,snippet&key=${settings["apiKey"]}&maxResults=5`;

  let response = await fetch(url)
  .then(res => res.json())
  .catch(err => {
    console.log(err);
    continueChatLoop = true;
  });

  if(!continueChatLoop) return null;

  if(response.items.length){
    for(item of response.items){
      if(!continueChatLoop) break;
      let curName = item.authorDetails.displayName;
      let curMessage = item.snippet.displayMessage;
      addMessageToChatDiv(curName, curMessage);
    }
  }

  setTimeout(()=>chatLoop(response.nextPageToken), response.pollingIntervalMillis);
}


function clickedReadOnly(){
  if(document.getElementById("readWriteButton").getAttribute("tabindex") === "-1"){
    document.getElementById("readOnlyButton").setAttribute("tabindex","-1");
    document.getElementById("readWriteButton").setAttribute("tabindex","0");
    setReadOnlyFormEl();
  }
}

function clickedReadWrite(){
  if(document.getElementById("readOnlyButton").getAttribute("tabindex") === "-1"){
    document.getElementById("readWriteButton").setAttribute("tabindex","-1");
    document.getElementById("readOnlyButton").setAttribute("tabindex","0");
    setReadWriteFormEl();
  }
}
