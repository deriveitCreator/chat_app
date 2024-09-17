
var chatDivEl = null;
var footer = null;
var streamConnectFormEl = null;
var appearanceSettingsFormEl = null;

function setElement(elVar, parentIDName, componentName, endFunc = null){
  let curEl = document.getElementById(parentIDName);
  if(elVar) curEl = elVar
  else {
    fetch(`./components/${componentName}.html`)
    .then(res => res.text())
    .then(res => {
      elVar = res;
      curEl.innerHTML = elVar;
      window.setTimeout(endFunc, 1);
    });
  }
}

const setFooterEl = () => setElement(footer, "footer", "footer");

const setChatDiv = () => setElement(chatDivEl, "main", "chatDiv", afterSetChatDiv);

function afterSetChatDiv(){
  var iframeEl = document.getElementById("iframeEl");
  if(youtubeId){
    document.getElementById("firstP").style.display = "none";
    iframeEl.setAttribute("src",
      `https://www.youtube.com/live_chat?v=${youtubeId}&embed_domain=${window.location.hostname}`
    );
  }
  else iframeEl.style.display = "none";
}

const setStreamConnectFormEl =
  () => setElement(streamConnectFormEl, "main", "streamConnectForm", afterStreamConnectFormEl);

function afterStreamConnectFormEl(){
  if(youtubeId)
    document.getElementById("youtubeId").value = youtubeId;
}

const setPaintSettingsEl =
  () => setElement(appearanceSettingsFormEl, "main", "appearanceSettingsForm", afterSetPaintSettingsEl);

function afterSetPaintSettingsEl(){
  document.getElementById("bgColor").value = settings["bgColor"];
  document.getElementById("hoverColor").value = settings["hoverColor"];
  document.getElementById("borderColor").value = settings["borderColor"];
  document.getElementById("textColor").value = settings["textColor"];
  document.getElementById("opacity").value = settings["opacity"];
  jscolor.install("#appearanceSettingsForm");
}
