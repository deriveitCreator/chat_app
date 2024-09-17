
var settings = {};
var defaultSettings = {};

function setGlobalVarForSettings(){
  fetch("/settings.json")
  .then(res => res.json())
  .then(res => afterGetSettings(res));
  fetch("/defaultSettings.json")
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

window.electronAPI.showOptions(() => {
  let optionsEl = document.getElementById("options");
  if(getComputedStyle(optionsEl).height === "0px") 
    document.querySelector(':root').style.setProperty("--optionsHeight", "62px");
  else 
    document.querySelector(':root').style.setProperty("--optionsHeight", "0px");
});

window.electronAPI.showFooter(() => {
  let footerEl = document.getElementById("footer");
  if(getComputedStyle(footerEl).height === "4px") 
    document.querySelector(':root').style.setProperty("--footerHeight", "60px");
  else 
    document.querySelector(':root').style.setProperty("--footerHeight", "0px");
});