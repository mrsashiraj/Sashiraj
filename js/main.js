/* =========================
   MAIN.JS – DYNAMIC SECTION RENDERER
   ========================= */

/* ---- THEME TOGGLE ---- */
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

/* ---- FLOATING CTC ---- */
function initCTC() {
  const ctc = document.getElementById("ctc");
  if (!ctc) return;

  window.addEventListener("scroll", () => {
    ctc.classList.toggle("visible", window.scrollY > 200);
  });
}

/* ---- SKILLS RENDER ---- */
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container || !SKILLS) return;

  SKILLS.forEach(skill => {
    const skillDiv = document.createElement("div");
    skillDiv.className = "reveal";

    skillDiv.innerHTML = `
      <h4 class="serif text-2xl mb-6 italic">${skill.category}</h4>
      <p class="text-xs font-light opacity-60 leading-relaxed mb-6">${skill.description}</p>
      <div class="flex flex-wrap gap-2">
        ${skill.items.map(i => `<span class="px-3 py-1 border border-gold/20 text-[8px] uppercase tracking-widest">${i}</span>`).join('')}
      </div>
    `;
    container.appendChild(skillDiv);
  });
}

/* ---- PROJECTS RENDER ---- */
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || !PROJECTS) return;

  PROJECTS.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-grid-item p-10 reveal";

    card.innerHTML = `
      <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${project.domain}</span>
      <h4 class="serif italic text-2xl mb-6">${project.title}</h4>
      <p class="text-xs font-light opacity-60 leading-relaxed mb-8">${project.description}</p>
      <div class="text-[8px] uppercase tracking-widest opacity-30">${project.status}</div>
      <a href="${project.link}" class="text-gold text-[8px] uppercase mt-2 inline-block hover:underline">Read More</a>
    `;
    container.appendChild(card);
  });
}

/* ---- PAPERS RENDER ---- */
function renderPapers() {
  const container = document.getElementById("papers-container");
  if (!container || !PAPERS) return;

  PAPERS.forEach(paper => {
    const card = document.createElement("div");
    card.className = "reveal p-10 border border-gold/20 mb-6";

    card.innerHTML = `
      <h4 class="serif text-2xl italic mb-2">${paper.title}</h4>
      <p class="text-[8px] uppercase tracking-widest opacity-50 mb-2">${paper.role}</p>
      <p class="text-xs opacity-60 mb-2">${paper.description}</p>
      <span class="text-[8px] uppercase tracking-widest opacity-40">${paper.status}</span>
      <a href="${paper.link}" class="text-gold text-[8px] uppercase mt-2 inline-block hover:underline">Read Paper</a>
    `;
    container.appendChild(card);
  });
}

/* ---- VENTURES RENDER ---- */
function renderVentures() {
  const container = document.getElementById("ventures-container");
  if (!container || !VENTURES) return;

  VENTURES.forEach(v => {
    const card = document.createElement("div");
    card.className = "venture-card reveal group";

    card.innerHTML = `
      <div class="grid lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5">
          <h3 class="serif text-5xl mb-4 tracking-tighter group-hover:text-gold transition-colors">${v.title}</h3>
          <p class="text-[9px] uppercase tracking-[0.4em] opacity-40">${v.category}</p>
        </div>
        <div class="lg:col-span-7">
          <p class="text-lg font-light opacity-50 italic">${v.description}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ---- INTERSECTION OBSERVER FOR REVEAL ---- */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("active"), index * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ---- PROGRESS BAR ---- */
function initProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ---- INIT ALL ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderPapers();
  renderVentures();

  initCTC();
  initReveal();
  initProgressBar();
});
