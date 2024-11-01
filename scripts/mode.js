let darkmode = localStorage.getItem("darkmode");
let deepmode = localStorage.getItem("deepmode");
const lightSwitch = document.getElementById("light-switch");
const darkSwitch = document.getElementById("dark-switch");
const deepSwitch = document.getElementById("deep-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

const enableDeepmode = () => {
  document.body.classList.add("deepmode");
  localStorage.setItem("deepmode", "active");
};

const disableDeepmode = () => {
  document.body.classList.remove("deepmode");
  localStorage.setItem("deepmode", null);
};

if (darkmode === "active") enableDarkmode();

if (deepmode === "active") enableDeepmode();

lightSwitch.addEventListener("click", () => {
  disableDarkmode();
  disableDeepmode();
});

darkSwitch.addEventListener("click", () => {
  disableDeepmode();
  enableDarkmode();
  console.log("dark");
});

deepSwitch.addEventListener("click", () => {
  disableDarkmode();
  enableDeepmode();
});
