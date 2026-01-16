function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = window.SKILLS_DATA.map(skill => `
    <div class="card">
      <h3>${skill.title}</h3>
      <p class="meta">${skill.description}</p>
      <ul>
        ${skill.items.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderSkills);
