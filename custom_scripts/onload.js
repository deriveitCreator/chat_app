
window.onload = () => {
  setFooterEl1();
  setGlobalVarForSettings();
  setChatDiv();
  document.getElementById("closeButton").onclick = ()=>{
    window.electronAPI.close();
  };
  var onTopBool = false;
  document.getElementById("onTopButton").onclick = ()=>{
    onTopBool = !onTopBool;
    window.electronAPI.setOnTop(onTopBool);
    if(onTopBool) 
      document.getElementById("onTopButton").textContent = "Disable Always On Top"
    else
      document.getElementById("onTopButton").textContent = "Enable Always On Top"
  };
  document.onkeydown = (event) => {
    if(event.ctrlKey && (event.code === "KeyO")){
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
    if(event.ctrlKey && (event.code === "KeyF")){
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
  }
}
