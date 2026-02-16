const display = document.getElementById("count");
const increase = document.getElementById("increment");
const decrease = document.getElementById("decrement");
const reset = document.getElementById("reset");

let count = 0;

increase.addEventListener("click", () => {
  count++;
  display.textContent = count;
});

decrease.addEventListener("click", () => {
  count--;
  display.textContent = count;
});

reset.addEventListener("click", () => {
  count = 0;
  display.textContent = count;
});
