const lightSwitch = document.getElementById("light-switch");
const darkSwitch = document.getElementById("dark-switch");
const deepSwitch = document.getElementById("deep-switch");

window.addEventListener("DOMContentLoaded", () => {
  lightSwitch.addEventListener("click", () => {
    enableMode("lightmode");
  });

  darkSwitch.addEventListener("click", () => {
    enableMode("darkmode");
  });

  deepSwitch.addEventListener("click", () => {
    enableMode("deepmode");
  });
});
