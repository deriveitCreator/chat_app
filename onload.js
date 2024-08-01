
window.onload = () => {
  let formEl = document.getElementById("firstForm");
  formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log(formEl.elements["streamID"].value);
  })
}