export type Mode = 'lightmode' | 'darkmode' | 'deepmode'
export default function enableMode(mode: Mode) {
  document.body.classList.value = mode
  localStorage.setItem('mode', mode)
}
