function renderVentures() {
  const container = document.getElementById("ventures-grid");
  if (!container) return;

  container.innerHTML = window.VENTURES_DATA.map(v => `
    <div class="card">
      <h3>${v.title}</h3>
      <span class="meta">${v.meta}</span>
      <p>${v.description}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderVentures);
