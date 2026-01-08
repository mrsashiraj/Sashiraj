// -------------------------
// GLOBAL DOM ELEMENTS
// -------------------------
const progressBar = document.getElementById('progress-bar');
const ctc = document.getElementById('ctc');

const projectsContainer = document.getElementById('projects-container');
const venturesContainer = document.getElementById('ventures-container');
const papersContainer = document.getElementById('papers-container');
const skillsContainer = document.getElementById('skills-container');
const educationContainer = document.getElementById('education-container');

// -------------------------
// SCROLL PROGRESS & CTA
// -------------------------
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;

    if (scrolled > 600) {
        ctc.classList.add('visible');
    } else {
        ctc.classList.remove('visible');
    }
});

// -------------------------
// SCROLL REVEAL
// -------------------------
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// -------------------------
// THEME TOGGLE
// -------------------------
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}

// -------------------------
// DYNAMIC CONTENT RENDERING
// -------------------------

// Projects
function renderProjects() {
    projectsContainer.innerHTML = data.projects.map(project => `
        <div class="project-grid-item p-10 reveal group">
            <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${project.domain}</span>
            <h4 class="serif italic text-2xl mb-6">${project.name}</h4>
            <p class="text-xs font-light opacity-60 leading-relaxed mb-8">
                ${project.description}
            </p>
            ${project.pdf ? `<a href="${project.pdf}" target="_blank" class="text-[8px] uppercase tracking-widest text-gold hover:underline">Read Paper</a>` : ''}
            <div class="text-[8px] uppercase tracking-widest opacity-30">${project.tags.join(' · ')}</div>
        </div>
    `).join('');
}

// Ventures
function renderVentures() {
    venturesContainer.innerHTML = data.ventures.map(v => `
        <div class="venture-card reveal group">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-5">
                    <h3 class="serif text-5xl mb-4 tracking-tighter group-hover:text-gold transition-colors">${v.name}</h3>
                    <p class="text-[9px] uppercase tracking-[0.4em] opacity-40">${v.domain}</p>
                </div>
                <div class="lg:col-span-7">
                    <p class="text-lg font-light opacity-50 italic">${v.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Academic Papers
function renderPapers() {
    papersContainer.innerHTML = data.papers.map(p => `
        <div class="paper-card reveal group">
            <h4 class="serif text-3xl italic mb-2">${p.title}</h4>
            <p class="text-[9px] uppercase tracking-[0.4em] opacity-40 mb-2">${p.status}</p>
            <p class="text-xs font-light opacity-60 leading-relaxed mb-2">${p.description}</p>
            ${p.pdf ? `<a href="${p.pdf}" target="_blank" class="text-[8px] uppercase tracking-widest text-gold hover:underline">Read Paper</a>` : ''}
        </div>
    `).join('');
}

// Skills
function renderSkills() {
    skillsContainer.innerHTML = data.skills.map(skill => `
        <div class="reveal">
            <h4 class="serif text-2xl mb-6 italic">${skill.name}</h4>
            <p class="text-xs font-light opacity-60 leading-relaxed mb-6">${skill.description}</p>
            <div class="flex flex-wrap gap-2">
                ${skill.tags.map(tag => `<span class="px-3 py-1 border border-gold/20 text-[8px] uppercase tracking-widest">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Education & Certification
function renderEducation() {
    educationContainer.innerHTML = data.education.map(e => `
        <div class="edu-card reveal group">
            <h4 class="serif text-3xl italic mb-2">${e.title}</h4>
            <p class="text-sm font-light opacity-60 mb-2">${e.institution}</p>
            ${e.credentials ? `<p class="text-[8px] uppercase tracking-widest opacity-40">${e.credentials.join(' · ')}</p>` : ''}
        </div>
    `).join('');
}

// Initialize all
function init() {
    renderProjects();
    renderVentures();
    renderPapers();
    renderSkills();
    renderEducation();
}

document.addEventListener('DOMContentLoaded', init);
