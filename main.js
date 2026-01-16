// SELECTORS
const skillsContainer = document.getElementById("skills-container");
const projectsContainer = document.getElementById("projects-container");
const papersContainer = document.getElementById("papers-container");
const venturesContainer = document.getElementById("ventures-container");

const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const closeModal = document.getElementById("closeModal");

// THEME TOGGLE
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

// MODAL
function openPDF(pdfUrl){
  pdfFrame.src = pdfUrl;
  pdfModal.classList.add("active");
}
closeModal.addEventListener("click", () => {
  pdfModal.classList.remove("active");
  pdfFrame.src = "";
});

// SCROLL PROGRESS + CTC
const progressBar = document.getElementById('progress-bar');
const ctc = document.getElementById('ctc');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / totalHeight) * 100;
  progressBar.style.width = `${progress}%`;
  if(scrolled>600){ ctc.classList.add('visible'); } else { ctc.classList.remove('visible'); }
});

// REVEAL ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if(entry.isIntersecting){
      setTimeout(()=>{entry.target.classList.add('active');}, index*80);
    }
  });
},{threshold:0.1});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// RENDER SKILLS
skillsData.forEach(skill=>{
  const div = document.createElement("div");
  div.classList.add("reveal");
  div.innerHTML = `<h4 class="serif text-2xl mb-6 italic">${skill.category}</h4>
                   <div class="flex flex-wrap gap-2">${skill.items.map(i=>`<span class="px-3 py-1 border border-gold/20 text-[8px] uppercase tracking-widest">${i}</span>`).join("")}</div>`;
  skillsContainer.appendChild(div);
});

// RENDER PROJECTS
projectsData.forEach(project=>{
  const div = document.createElement("div");
  div.classList.add("project-grid-item","p-10","reveal");
  div.innerHTML = `<span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${project.domain}</span>
                   <h4 class="serif italic text-2xl mb-6">${project.name}</h4>
                   <p class="text-xs font-light opacity-60 leading-relaxed mb-4">${project.description}</p>
                   <div class="flex justify-between items-center">
                     <div class="text-[8px] uppercase tracking-widest opacity-30">${project.tags.join(" · ")}</div>
                     ${project.pdf ? `<button onclick="openPDF('${project.pdf}')" class="text-[8px] uppercase tracking-widest border px-2 py-1 hover:bg-gold hover:text-rich transition">Read Paper</button>` : ''}
                   </div>`;
  projectsContainer.appendChild(div);
});

// RENDER PAPERS
papersData.forEach(p=>{
  const div = document.createElement("div");
  div.classList.add("paper-card","reveal");
  div.innerHTML = `<h4 class="serif text-3xl italic mb-2">${p.title}</h4>
                   <p class="text-xs font-light opacity-50 mb-4">${p.role} · ${p.status}</p>
                   <p class="text-sm font-light opacity-70 mb-4">${p.description}</p>
                   ${p.pdf ? `<button onclick="openPDF('${p.pdf}')" class="text-[10px] uppercase tracking-widest border px-3 py-1 hover:bg-gold hover:text-rich transition">Read Paper</button>` : ''}`;
  papersContainer.appendChild(div);
});

// RENDER VENTURES
venturesData.forEach(v=>{
  const div = document.createElement("div");
  div.classList.add("venture-card","reveal","group");
  div.innerHTML = `<div class="grid lg:grid-cols-
