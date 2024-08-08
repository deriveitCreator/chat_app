
var bgColorInRGB = null;

function setGlobalCSSVarAndBodyOpacity(){
  for(appearanceSetting of ["bgColor","hoverColor","borderColor","textColor","chatFontSize","bodyBorderWidth"]){
    document.querySelector(':root').style.setProperty(`--${appearanceSetting}`, settings[appearanceSetting]);
  }
  bgColorInRGB = hexToRgb(settings["bgColor"]);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r}, ${bgColorInRGB.g}, ${bgColorInRGB.b}, ${settings["opacity"]}
  )`;
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
  saveSetting(event);
}

function setBorderColor(event){
  document.querySelector(':root').style.setProperty("--borderColor", event.target.value);
  saveSetting(event);
}

function setTextColor(event){
  document.querySelector(':root').style.setProperty("--textColor", event.target.value);
  saveSetting(event);
}

function toggleChatFontOptions(){
  if (document.getElementById("chatFontOptions").style.display === "block")
    document.getElementById("chatFontOptions").style.display = "none";
  else document.getElementById("chatFontOptions").style.display = "block";
}

function setFontSize(newFontSize){
  document.querySelector(':root').style.setProperty("--chatFontSize", newFontSize);  
  document.getElementById("chatFontOptions").style.display = "none";
  saveSetting({target:{id: "chatFontSize", value: newFontSize}});
  setChatFontSizeValue(newFontSize);
}

function setOpacity(event){
  document.querySelector(':root').style.setProperty("--opacity", event.target.value);
  saveSetting(event);
}

function toggleBorder(event){
  event.preventDefault();
  let curBorderVal = getComputedStyle(document.body).getPropertyValue("--bodyBorderWidth");
  if (curBorderVal === "0px") {
    document.querySelector(':root').style.setProperty(`--bodyBorderWidth`, "4px");
    settings["bodyBorderWidth"] = "4px";
  }
  else{
    document.querySelector(':root').style.setProperty(`--bodyBorderWidth`, "0px");
    settings["bodyBorderWidth"] = "0px";
  }
}

function resetAppearance(event){
  event.preventDefault();

  for(appearanceSetting of ["bgColor","hoverColor","borderColor","textColor"]){
    settings[appearanceSetting] = defaultSettings[appearanceSetting];
    document.getElementById(appearanceSetting).value = defaultSettings[appearanceSetting];
    document.getElementById(appearanceSetting).jscolor.fromString(defaultSettings[appearanceSetting]);
  }

  settings["opacity"] = defaultSettings["opacity"];
  document.getElementById("opacityRange").value = defaultSettings["opacity"];

  settings["bodyBorderWidth"] = defaultSettings["bodyBorderWidth"];

  setGlobalCSSVarAndBodyOpacity();
}