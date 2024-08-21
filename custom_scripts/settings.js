
var settings = {};
var defaultSettings = {};

function setGlobalVarForSettings(){
  fetch("./settings.json")
  .then(res => res.json())
  .then(res => afterGetSettings(res));
  fetch("./defaultSettings.json")
  .then(res => res.json())
  .then(res => defaultSettings = res);
}

function afterGetSettings(res){
  settings = res;
  setAppearance();
}

function saveSetting(event){
  settings[event.target.id] = event.target.value;
  enableSaveButton();
}

function saveSettings(event){
  event.preventDefault();
  window.electronAPI.setUserSettings(settings);
  event.target.textContent = "Saved";
  event.target.setAttribute("data-disabled", true);
}

function enableSaveButton(){
  let saveButton = document.getElementById("saveButton");
  saveButton.setAttribute("data-disabled", false);
  saveButton.textContent = "Save";
}

function setCloseButton() {
  document.getElementById("closeButton").onclick = ()=>{
    window.electronAPI.close();
  };
}

function setTopButton(){
  var onTopBool = false;
  document.getElementById("onTopButton").onclick = ()=>{
    onTopBool = !onTopBool;
    window.electronAPI.setOnTop(onTopBool);
    if(onTopBool) 
      document.getElementById("onTopButton").textContent = "Disable Always On Top"
    else
      document.getElementById("onTopButton").textContent = "Enable Always On Top"
  };
}

function setKeyDownSettings(){
  document.onkeydown = (event) => {
    if(event.ctrlKey && (event.code === "KeyO"))
      toggleOptions();
    if(event.ctrlKey && (event.code === "KeyF"))
      toggleFooter();
  }
}

function toggleOptions(){
  let optionsEl = document.getElementById("options");
  if(getComputedStyle(optionsEl).display === "none") {
    optionsEl.style.display = "grid";
    window.setTimeout(()=>optionsEl.style.opacity = "1", 1);
  }
  else {
    optionsEl.style.opacity = "0";
    window.setTimeout(()=>optionsEl.style.display = "none", 500);
  }
}

function toggleFooter(){
  let footerEl = document.getElementById("footer");
  if(getComputedStyle(footerEl).display === "none") {
    footerEl.style.display = "flex";
    window.setTimeout(()=> footerEl.style.opacity = "1", 1);
  }
  else {
    footerEl.style.opacity = "0";
    window.setTimeout(()=> footerEl.style.display = "none", 500);
  }
}