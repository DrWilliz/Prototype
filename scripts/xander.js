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
