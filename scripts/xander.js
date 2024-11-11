function searchProjects() {
  const input = document.getElementById('xsearch-input').value.toLowerCase()
  const rows = document.querySelectorAll('#xprojects tr')

  rows.forEach((row) => {
    let rowText = row.textContent.toLowerCase()

    if (rowText.includes(input)) {
      row.style.display = ''
    } else {
      row.style.display = 'none'
    }
  })
}

// document.addEventListener("DOMContentLoaded", () => {
//   const rows = document.querySelectorAll(".clickable-row");

//   rows.forEach((row) => {
//     row.addEventListener("click", () => {
//       const projectUrl = row.getAttribute("data-project-url");
//       if (projectUrl) {
//         window.location.href = projectUrl;
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll("tbody tr").forEach((row) => {
//     const statusElement = row.querySelector(".status");
//     const checkbox = row.querySelector('input[type="checkbox"]');

//     checkbox.checked = statusElement.classList.contains("active");

//     checkbox.addEventListener("change", () => {
//       const isActive = checkbox.checked;
//       statusElement.className = `status ${isActive ? "active" : "inactive"}`;
//       statusElement.textContent = isActive ? "Active" : "Inactive";
//     });
//   });
// });
