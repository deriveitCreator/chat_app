
var streamConnectFormEl = null;
var footer1 = null;
var footer2 = null;
var appearanceSettingsFormEl = null;
var chatDivEl = null;

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

function setFooterEl1(){
  setElement(footer1, "footer", "footer1");
  let footerEl = document.getElementById("footer");
  footerEl.style.display = "flex";
  window.setTimeout(()=> footerEl.style.opacity = "1", 1);
}

function setFooterEl2(){
  setElement(footer2, "footer", "footer2", setChatDiv);
}

function afterSetStreamConnectFormEl() {
  let formEl = document.getElementById("streamConnectForm");
  formEl["youtubeID"].value = settings["youtubeID"];
  formEl["twitchID"].value = settings["twitchID"];
  flatpickr("input[type=datetime-local]", {
    enableTime: true,
    dateFormat: "Y-m-d H:i"
  });
  formEl["dateTime"].value = settings["dateTime"];
}

function setStreamConnectFormEl(){
  setElement(streamConnectFormEl, "main", "streamConnectForm", afterSetStreamConnectFormEl);
}

function afterSetPaintSettingsEl(){
    let style = getComputedStyle(document.body);
    document.getElementById("bgColor").value = style.getPropertyValue("--bgColor");
    document.getElementById("hoverColor").value = style.getPropertyValue("--hoverColor");
    document.getElementById("borderColor").value = style.getPropertyValue("--borderColor");
    document.getElementById("textColor").value = style.getPropertyValue("--textColor");
    document.getElementById("opacityRange").value = settings["opacity"];
    jscolor.install("#appearanceSettingsForm");
}

function setPaintSettingsEl(){
  setElement(appearanceSettingsFormEl, "main", "appearanceSettingsForm", afterSetPaintSettingsEl);
}

function setChatDiv(){
  setElement(chatDivEl, "main", "chatDiv");
}
