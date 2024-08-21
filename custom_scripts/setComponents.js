
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

function setChatDiv() {
  if(!document.getElementById("chatDiv"))
    setElement(chatDivEl, "main", "chatDiv", afterSetChatDiv)
};

function afterSetChatDiv(){
  if (youtubeId) {
    if(activeLiveChatId && token)
      changeUserTextEl("Your message here...", false);
    else 
      changeUserTextEl("Need to sign in to send messages", true);
    window.electronAPI.startChatLoop();
  }
  else {
    let newLi = document.createElement("li");
    newLi.style.marginTop = "20px";
    newLi.style.border = "none";
    newLi.textContent = "Please fill out the streaming connect information.";
    document.getElementById("chatDiv").appendChild(newLi);
  }
}

function changeUserTextEl(msg, disabledState){
  let userTextEl = document.getElementById("userText");
  if (userTextEl) {
    userTextEl.setAttribute("placeholder", msg);
    if (disabledState) userTextEl.setAttribute("disabled", disabledState);
    else {
      userTextEl.removeAttribute("disabled");
      userTextEl.focus();
    }
  }
}


window.electronAPI.onGetChatText((obj) => {
  let name = obj.author;
  let content = obj.message;
  let chatBadges = obj.chatBadges;
  let chatDivEl = document.getElementById("chatDiv");
  
  if(chatDivEl){
    let newLi = document.createElement("li");
  
    let nameSpan = document.createElement("span");
    nameSpan.insertAdjacentHTML("beforeend", name);
    nameSpan.insertAdjacentHTML("beforeend", chatBadges);
    nameSpan.classList.add("nameContainer");
    nameSpan.title = "The background color here is the same as the hover color."
  
    let invisibleLetter = document.createElement("span");
    invisibleLetter.textContent = "l";
    invisibleLetter.classList.add("invLetter");
  
    nameSpan.appendChild(invisibleLetter);
    newLi.appendChild(nameSpan);
    newLi.insertAdjacentHTML("beforeend", content);
    chatDivEl.appendChild(newLi);
    newLi.scrollIntoView(scrollIntoViewOptions = {behavior: "smooth"});
  }
  else window.electronAPI.stopChat();
})

const setStreamConnectFormEl = () => setElement(streamConnectFormEl, "main", "streamConnectForm");

const setPaintSettingsEl = () => setElement(appearanceSettingsFormEl, "main", "appearanceSettingsForm", afterSetPaintSettingsEl);

function afterSetPaintSettingsEl(){
  document.getElementById("bgColor").value = settings["bgColor"];
  document.getElementById("hoverColor").value = settings["hoverColor"];
  document.getElementById("borderColor").value = settings["borderColor"];
  document.getElementById("textColor").value = settings["textColor"];
  document.getElementById("opacity").value = settings["opacity"];
  setChatFontSizeValue(settings["chatFontSize"]);
  jscolor.install("#appearanceSettingsForm");
}