
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

const setFooterEl2 = () => setElement(footer2, "footer", "footer2", setChatDiv);

const setChatDiv = () => setElement(chatDivEl, "main", "chatDiv", afterSetChatDiv);

function afterSetChatDiv(){
  if(activeLiveChatId) {
    if(readOnlyMode) {
      document.getElementById("userText").setAttribute("placeholder","No input in read-only mode");
      document.getElementById("userText").setAttribute("disabled","true");
    }
    else{
      document.getElementById("userText").setAttribute("placeholder","Your message here...");
      document.getElementById("userText").setAttribute("disabled","false");
    }
    continueChatLoop = true;
    chatLoop();
  }
  else{
    let newLi = document.createElement("li");
    newLi.style.border = "none";
    newLi.textContent = "Please fill out the streaming connect information.";
    document.getElementById("chatDiv").appendChild(newLi);
  }
}

function addMessageToChatDiv(name, content){
  let newLi = document.createElement("li");
  let nameSpan = document.createElement("span");
  nameSpan.textContent = ` ${name} `;
  nameSpan.id = "nameContainer";
  nameSpan.title = "The background color here is the same as the hover color."
  newLi.appendChild(nameSpan);
  newLi.appendChild(document.createTextNode(" " + content));
  document.getElementById("chatDiv").appendChild(newLi);
  newLi.scrollIntoView(scrollIntoViewOptions = {behavior: "smooth"});
}

const setStreamConnectFormEl =
  () => setElement(streamConnectFormEl, "main", "streamConnectForm", afterSetStreamConnectFormEl);

function afterSetStreamConnectFormEl(){
  continueChatLoop = false;
  setReadOnlyFormEl();
}

const setReadOnlyFormEl = () => setElement(streamConnectFormEl, "formContainer", "readOnlyForm", afterReadOnlyFormEL);

function afterReadOnlyFormEL(){
  let formEl = document.getElementById("readOnlyForm");
  formEl["apiKey"].value = settings["apiKey"];
  formEl["youtubeID"].value = settings["youtubeID"];
}

const setReadWriteFormEl = () => setElement(streamConnectFormEl, "formContainer", "readWriteForm", afterReadWriteFormEl);

function afterReadWriteFormEl(){
  let formEl = document.getElementById("readWriteForm");
  formEl["youtubeID"].value = settings["youtubeID"];
}

const setPaintSettingsEl = () => setElement(appearanceSettingsFormEl, "main", "appearanceSettingsForm", afterSetPaintSettingsEl);

function afterSetPaintSettingsEl(){
  continueChatLoop = false;
  let style = getComputedStyle(document.body);
  document.getElementById("bgColor").value = style.getPropertyValue("--bgColor");
  document.getElementById("hoverColor").value = style.getPropertyValue("--hoverColor");
  document.getElementById("borderColor").value = style.getPropertyValue("--borderColor");
  document.getElementById("textColor").value = style.getPropertyValue("--textColor");
  document.getElementById("opacityRange").value = settings["opacity"];
  setChatFontSizeValue(style.getPropertyValue("--chatFontSize"));
  jscolor.install("#appearanceSettingsForm");
}