// Scroll progress and floating button
const progressBar = document.getElementById('progress-bar');
const ctc = document.getElementById('ctc');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / totalHeight) * 100}%`;
    if (scrolled > 600) ctc.classList.add('visible'); else ctc.classList.remove('visible');
});

// Reveal animations
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting) setTimeout(()=>{ entry.target.classList.add('active'); }, index*80);
    });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Theme toggle
function toggleTheme(){ document.documentElement.classList.toggle('dark'); }

// Render dynamic sections
function renderSkills(){ 
    const container = document.getElementById("skills-container"); container.innerHTML = "";
    skills.forEach(s => {
        container.innerHTML += `
            <div class="reveal">
                <h4 class="serif text-2xl mb-6 italic">${s.title}</h4>
                <p class="text-xs font-light opacity-60 leading-relaxed mb-6">${s.description}</p>
                <div class="flex flex-wrap gap-2">${s.tags.map(tag=>`<span class="px-3 py-1 border border-gold/20 text-[8px] uppercase tracking-widest">${tag}</span>`).join("")}</div>
            </div>
        `;
    });
}

function renderProjects(){
    const container = document.getElementById("projects-container"); container.innerHTML="";
    projects.forEach(p=>{
        container.innerHTML += `
            <div class="project-grid-item p-10 reveal">
                <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${p.category}</span>
                <h4 class="serif italic text-2xl mb-6">${p.title}</h4>
                <p class="text-xs font-light opacity-60 leading-relaxed mb-8">${p.description}</p>
                ${p.pdf? `<a href="${p.pdf}" target="_blank" class="text-gold text-[10px] uppercase">Read Paper</a>` : ''}
                <div class="text-[8px] uppercase tracking-widest opacity-30">${p.tags.join(" · ")}</div>
            </div>
        `;
    });
}

function renderPapers(){
    const container = document.getElementById("papers-container"); container.innerHTML="";
    papers.forEach(p=>{
        container.innerHTML += `
            <div class="reveal">
                <div class="p-12 border border-gold/20 bg-rich text-chalk">
                    <h4 class="serif text-3xl italic mb-6">${p.title}</h4>
                    <p class="text-sm font-light opacity-60 mb-6">${p.description}</p>
                    <p class="text-[8px] uppercase tracking-widest opacity-30 mb-4">${p.role}</p>
                    <a href="${p.pdf}" target="_blank" class="text-gold text-[10px] uppercase">View Paper</a>
                </div>
            </div>
        `;
    });
}

function renderVentures(){
    const container = document.getElementById("ventures-container"); container.innerHTML="";
    ventures.forEach(v=>{
        container.innerHTML += `
            <div class="venture-card reveal group">
                <div class="grid lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-5">
                        <h3 class="serif text-5xl mb-4 tracking-tighter group-hover:text-gold transition-colors">${v.title}</h3>
                        <p class="text-[9px] uppercase tracking-[0.4em] opacity-40">${v.category}</p>
                    </div>
                    <div class="lg:col-span-7">
                        <p class="text-lg font-light opacity-50 italic">${v.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderContacts(){
    const container = document.getElementById("contacts-container"); container.innerHTML="";
    contacts.forEach(c=>{
        container.innerHTML += `
            <a href="${c.link}" target="_blank" class="text-2xl serif italic hover:text-gold transition-colors">
                ${c.display}
            </a>
        `;
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    renderSkills();
    renderProjects();
    renderPapers();
    renderVentures();
    renderContacts();
});
