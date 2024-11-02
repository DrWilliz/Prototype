const enableMode = (mode) => {
  document.body.classList = mode;
  localStorage.setItem("mode", mode);
};

window.addEventListener("DOMContentLoaded", () => {
  let mode = localStorage.getItem("mode");
  mode ? enableMode(mode) : enableMode("lightmode");
});
