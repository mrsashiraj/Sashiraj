/* =========================
   GLOBAL UI BEHAVIOR
   ========================= */

/* Theme Toggle */
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

/* Floating Contact Button */
function initCTC() {
  const ctc = document.getElementById("ctc");
  if (!ctc) return;

  window.addEventListener("scroll", () => {
    ctc.classList.toggle("visible", window.scrollY > 300);
  });
}

/* Reveal Animations */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, i * 60);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* Scroll Progress Bar */
function initScrollProgress() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / height) * 100}%`;
  });
}
