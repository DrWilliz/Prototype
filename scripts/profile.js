function uploadProfilePicture() {
  document.getElementById("profile-upload").click();
}

function previewProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".jprofilbillede").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
