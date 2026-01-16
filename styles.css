// ==========================
// THEME TOGGLE
// ==========================
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

// ==========================
// FLOATING CTC BUTTON
// ==========================
const ctc = document.getElementById("ctc");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    ctc.classList.add("visible");
  } else {
    ctc.classList.remove("visible");
  }
});

// ==========================
// REVEAL ON SCROLL
// ==========================
const reveals = () => {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
};
window.addEventListener("scroll", reveals);
window.addEventListener("load", reveals);

// ==========================
// DYNAMIC SKILLS
// ==========================
const skillsContainer = document.getElementById("skills-container");
skillsData.forEach(skill => {
  const div = document.createElement("div");
  div.classList.add("reveal");
  div.innerHTML = `
    <h4 class="serif text-2xl mb-6 italic">${skill.category}</h4>
    <p class="text-xs font-light opacity-60 mb-4">${skill.description}</p>
    <div class="flex flex-wrap gap-2">
      ${skill.items.map(item => `<span class="px-3 py-1 border border-gold/20 text-[8px] uppercase tracking-widest">${item}</span>`).join("")}
    </div>
  `;
  skillsContainer.appendChild(div);
});

// ==========================
// DYNAMIC PROJECTS
// ==========================
const projectsContainer = document.getElementById("projects-container");
projectsData.forEach(project => {
  const div = document.createElement("div");
  div.classList.add("project-grid-item", "p-10", "reveal");
  div.innerHTML = `
    <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${project.domain}</span>
    <h4 class="serif italic text-2xl mb-6">${project.name}</h4>
    <p class="text-xs font-light opacity-60 leading-relaxed mb-8">${project.description}</p>
    <div class="text-[8px] uppercase tracking-widest opacity-30">${project.tags.join(" · ")}</div>
  `;
  projectsContainer.appendChild(div);
});

// ==========================
// DYNAMIC VENTURES
// ==========================
const venturesContainer = document.getElementById("ventures-container");
venturesData.forEach(v => {
  const div = document.createElement("div");
  div.classList.add("venture-card", "reveal");
  div.innerHTML = `
    <div class="grid lg:grid-cols-12 gap-8 items-center p-8 border-b border-gold/10 hover:border-gold transition-all">
      <div class="lg:col-span-5">
        <h3 class="serif text-5xl mb-4 tracking-tighter">${v.name}</h3>
        <p class="text-[9px] uppercase tracking-[0.4em] opacity-40">${v.industry}</p>
      </div>
      <div class="lg:col-span-7">
        <p class="text-lg font-light opacity-50 italic">${v.description}</p>
      </div>
    </div>
  `;
  venturesContainer.appendChild(div);
});

// ==========================
// DYNAMIC ACADEMIC PAPERS
// ==========================
const papersContainer = document.getElementById("papers-container");
papersData.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("paper-card", "reveal");
  div.innerHTML = `
    <h4 class="serif text-3xl italic mb-2">${p.title}</h4>
    <p class="text-xs font-light opacity-50 mb-4">${p.role} · ${p.status}</p>
    <p class="text-sm font-light opacity-70">${p.description}</p>
  `;
  papersContainer.appendChild(div);
});

// ==========================
// PROGRESS BAR
// ==========================
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});
