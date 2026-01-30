let button = document.getElementById("search");
button.addEventListener("click", function() {
  let inputEL = document.getElementById("input");
  console.log(inputEL.value);
  inputEL.value = "";
  inputEL.focus();
});