
var bgColorInRGB = null;

function setAppearance(){
  document.querySelector(':root').style.setProperty("--bgColor", settings["bgColor"]);
  document.querySelector(':root').style.setProperty("--hoverColor", settings["hoverColor"]);
  document.querySelector(':root').style.setProperty("--borderColor", settings["borderColor"]);
  document.querySelector(':root').style.setProperty("--textColor", settings["textColor"]);
  document.querySelector(':root').style.setProperty("--opacity", settings["opacity"]);
  bgColorInRGB = hexToRgb(settings["bgColor"]);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r},${bgColorInRGB.g},${bgColorInRGB.b},${settings["opacity"]}
  )`;
  document.querySelector(':root').style.setProperty("--bodyBorderWidth", settings["bodyBorderWidth"]);
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
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r},${bgColorInRGB.g},${bgColorInRGB.b},${settings["opacity"]}
  )`;
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

function getJsColorSettings(){
  return JSON.stringify({
    backgroundColor: settings["bgColor"],
    borderColor: settings["borderColor"],
    controlBorderColor: settings["borderColor"]
  })
}

function setOpacity(event){
  saveSetting(event);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r},${bgColorInRGB.g},${bgColorInRGB.b},${settings["opacity"]}
  )`;
  document.querySelector(':root').style.setProperty("--opacity", settings["opacity"]);
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

  let colorSettings = ["bgColor","hoverColor","borderColor","textColor"];
  for(appearanceSetting of colorSettings){
    document.getElementById(appearanceSetting).value = defaultSettings[appearanceSetting];
    document.getElementById(appearanceSetting).jscolor.fromString(defaultSettings[appearanceSetting]);
  }
  for(appearanceSetting of [...colorSettings, "bodyBorderWidth","opacity"]){
    settings[appearanceSetting] = defaultSettings[appearanceSetting];
    document.querySelector(':root').style.setProperty(`--${appearanceSetting}`, settings[appearanceSetting]);
  }

  document.getElementById("opacity").value = defaultSettings["opacity"];
  bgColorInRGB = hexToRgb(defaultSettings["bgColor"]);
  document.getElementById("main").style.backgroundColor = `rgba(
    ${bgColorInRGB.r}, ${bgColorInRGB.g}, ${bgColorInRGB.b}, ${defaultSettings["opacity"]}
  )`;

}