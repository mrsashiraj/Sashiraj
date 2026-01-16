function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

window.addEventListener("scroll", () => {
  const ctc = document.getElementById("ctc");
  if (!ctc) return;
  ctc.classList.toggle("visible", window.scrollY > 200);
});
