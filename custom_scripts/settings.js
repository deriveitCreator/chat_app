
var settings = {};
var defaultSettings = {};
var bgColorInRGB = null;

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
  for(appearanceSetting of ["bgColor","hoverColor","borderColor","textColor","bodyBorderWidth"]){
    document.querySelector(':root').style.setProperty(`--${appearanceSetting}`, settings[appearanceSetting]);
  }
  bgColorInRGB = hexToRgb(settings["bgColor"]);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r}, ${bgColorInRGB.g}, ${bgColorInRGB.b}, ${settings["opacity"]}
  )`;
}

function saveSettings(event){
  event.preventDefault();
  window.electronAPI.setUserSettings(settings);
  event.target.textContent = "Saved";
  event.target.setAttribute("data-disabled", true);
}

function setYoutubeID(event){
  settings["youtubeID"] = event.target.value;
  enableSaveButton();
}

function setTwitchID(event){
  settings["twitchID"] = event.target.value;
  enableSaveButton();
}

function setDateTime(event){
  settings["dateTime"] = event.target.value;
  enableSaveButton();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function setBgColor(event){
  document.querySelector(':root').style.setProperty("--bgColor", event.target.value);
  settings["bgColor"] = event.target.value;
  bgColorInRGB = hexToRgb(event.target.value);
  document.getElementById("main").style.backgroundColor = `rgba(${bgColorInRGB.r},${bgColorInRGB.g},${bgColorInRGB.b},${settings["opacity"]})`;
  enableSaveButton();
}

function setHoverColor(event){
  document.querySelector(':root').style.setProperty("--hoverColor", event.target.value);
  settings["hoverColor"] = event.target.value;
  enableSaveButton();
}

function setBorderColor(event){
  document.querySelector(':root').style.setProperty("--borderColor", event.target.value);
  settings["borderColor"] = event.target.value;
  enableSaveButton();
}

function setTextColor(event){
  document.querySelector(':root').style.setProperty("--textColor", event.target.value);
  settings["textColor"] = event.target.value;
  enableSaveButton();
}

function setOpacity(event){
  settings["opacity"] = event.target.value;
  document.getElementById("main").style.backgroundColor = `rgba(${bgColorInRGB.r},${bgColorInRGB.g},${bgColorInRGB.b},${event.target.value})`;
  enableSaveButton();
}

function toggleBorder(event){
  event.preventDefault();
  let curBorderVal = getComputedStyle(document.body).getPropertyValue("--bodyBorderWidth");
  console.log(curBorderVal);
  if (curBorderVal === "0px") {
    document.querySelector(':root').style.setProperty(`--bodyBorderWidth`, "4px");
    settings["bodyBorderWidth"] = "4px";
  }
  else{
    document.querySelector(':root').style.setProperty(`--bodyBorderWidth`, "0px");
    settings["bodyBorderWidth"] = "0px";
  }
}

function enableSaveButton(){
  let saveButton = document.getElementById("saveButton");
  saveButton.setAttribute("data-disabled", false);
  saveButton.textContent = "Save";
}

function resetAppearance(event){
  event.preventDefault();

  for(appearanceSetting of ["bgColor","hoverColor","borderColor","textColor"]){
    document.querySelector(':root').style.setProperty(`--${appearanceSetting}`, defaultSettings[appearanceSetting]);
    settings[appearanceSetting] = defaultSettings[appearanceSetting];
    document.getElementById(appearanceSetting).value = defaultSettings[appearanceSetting];
    document.getElementById(appearanceSetting).jscolor.fromString(defaultSettings[appearanceSetting]);
  }

  bgColorInRGB = hexToRgb(defaultSettings["bgColor"]);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r}, ${bgColorInRGB.g}, ${bgColorInRGB.b}, ${defaultSettings["opacity"]}
  )`;
  settings["opacity"] = defaultSettings["opacity"];
  document.getElementById("opacityRange").value = defaultSettings["opacity"];

  document.querySelector(':root').style.setProperty(`--bodyBorderWidth`, defaultSettings["bodyBorderWidth"]);
  settings["bodyBorderWidth"] = defaultSettings["bodyBorderWidth"];
}