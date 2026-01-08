// ---------------------------
// DATA: Dynamic Sections
// ---------------------------

// Projects: title, category, description, skills, link (pdf or web)
const projects = [
    {
        title: "Tarkari Mart",
        category: "Operations",
        description: "Optimized B2B logistics using data modeling, reducing spoilage by 15% and enhancing farmer profitability.",
        skills: ["Supply Chain", "Data Modeling"],
        link: "pdfs/tarkari_mart.pdf"
    },
    {
        title: "Sahayatri",
        category: "Mobility",
        description: "Designed a riding companion network focused on transit efficiency and real-time route analysis.",
        skills: ["Network Design", "UX"],
        link: "#"
    },
    {
        title: "Smart Kharcha",
        category: "FinTech",
        description: "Developed a financial modeling tool for predictive budget insights and automated cash-flow tracking.",
        skills: ["Financial Modeling", "Analytics"],
        link: "#"
    },
    {
        title: "Paisa",
        category: "Web3",
        description: "Exploration of cryptocurrency frameworks for micro-transactions and tokenomics within emerging markets.",
        skills: ["Blockchain", "Economy"],
        link: "#"
    }
];

// Ventures: name, category, description
const ventures = [
    {
        name: "Munal",
        category: "Automotive Start-up · Luxury Identity",
        description: "Engineering raw performance with aerodynamic luxury to redefine the premium automotive segment."
    },
    {
        name: "Damai",
        category: "Textile & Retail · Scalable Logistics",
        description: "Agile manufacturing delivering architectural fashion and streamlined retail logistics for modern lifestyles."
    },
    {
        name: "Sarky",
        category: "Footwear · Rugged Urban Utility",
        description: "Durable, resilient urban footwear engineered for high-utility and heritage outdoor performance."
    },
    {
        name: "Goreto",
        category: "Travel Tech · Community & Intelligence",
        description: "Conceptualizing an ecosystem for automated travel companions and intelligent itinerary generation."
    }
];

// Academic Papers: title, description, role, link
const academicPapers = [
    {
        title: "Physicochemical Analysis of Yogurt",
        description: "Conducted primary research on the shelf-life stability and physicochemical properties of commercial yogurt products. Investigated enzymatic interactions and material composition using standardized lab protocols.",
        role: "Primary Investigator",
        link: "pdfs/yogurt_analysis.pdf"
    }
];

// Education/Certifications
const education = [
    {
        type: "Degree",
        title: "B.Sc. Dairy Tech",
        institute: "Tribhuvan University"
    },
    {
        type: "High School",
        title: "Biology & Mathematics",
        institute: "Kathmandu Bernhardt College"
    },
    {
        type: "Professional Credential",
        title: "Google Data Analytics",
        role: "Individual Qualification"
    },
    {
        type: "Professional Credential",
        title: "Website Development",
        role: "Certified Training"
    },
    {
        type: "Professional Credential",
        title: "Google Analytics IQ",
        role: "Strategic Professional"
    }
];


// ---------------------------
// DOM References
// ---------------------------
const projectContainer = document.getElementById("projects-container");
const venturesContainer = document.getElementById("ventures-container");
const academicContainer = document.getElementById("academic-container");
const educationContainer = document.getElementById("education-container");

// ---------------------------
// RENDER FUNCTIONS
// ---------------------------

function renderProjects() {
    projects.forEach(p => {
        const div = document.createElement("div");
        div.className = "project-grid-item p-10 reveal";
        div.innerHTML = `
            <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${p.category}</span>
            <h4 class="serif italic text-2xl mb-6">${p.title}</h4>
            <p class="text-xs font-light opacity-60 leading-relaxed mb-8">${p.description}</p>
            <div class="text-[8px] uppercase tracking-widest opacity-30">${p.skills.join(" · ")}</div>
        `;
        if(p.link && p.link !== "#") {
            div.style.cursor = "pointer";
            div.onclick = () => window.open(p.link, "_blank");
        }
        projectContainer.appendChild(div);
    });
}

function renderVentures() {
    ventures.forEach(v => {
        const div = document.createElement("div");
        div.className = "venture-card reveal group";
        div.innerHTML = `
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-5">
                    <h3 class="serif text-5xl mb-4 tracking-tighter group-hover:text-gold transition-colors">${v.name}</h3>
                    <p class="text-[9px] uppercase tracking-[0.4em] opacity-40">${v.category}</p>
                </div>
                <div class="lg:col-span-7">
                    <p class="text-lg font-light opacity-50 italic">${v.description}</p>
                </div>
            </div>
        `;
        venturesContainer.appendChild(div);
    });
}

function renderAcademic() {
    academicPapers.forEach(a => {
        const div = document.createElement("div");
        div.className = "academic-card reveal";
        div.innerHTML = `
            <h4 class="serif text-3xl italic mb-6">${a.title}</h4>
            <p class="text-sm font-light leading-loose opacity-70 mb-8">${a.description}</p>
            <div class="text-[8px] uppercase tracking-[0.5em] text-gold mb-4">${a.role}</div>
            ${a.link ? `<a href="${a.link}" target="_blank" class="text-[10px] hover:text-gold">Read Paper</a>` : ''}
        `;
        academicContainer.appendChild(div);
    });
}

function renderEducation() {
    education.forEach(e => {
        const div = document.createElement("div");
        div.className = "education-card reveal";
        if(e.institute){
            div.innerHTML = `
                <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${e.type}</span>
                <h4 class="serif text-3xl italic mb-2">${e.title}</h4>
                <p class="text-sm font-light opacity-60">${e.institute}</p>
            `;
        } else if(e.role){
            div.innerHTML = `
                <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">Professional Credentials</span>
                <div class="p-6 border border-gold/10 flex justify-between items-center group hover:bg-gold/5 transition-all">
                    <span class="text-[10px] uppercase tracking-widest opacity-60">${e.title}</span>
                    <span class="serif italic text-xl group-hover:text-gold transition-colors">${e.role}</span>
                </div>
            `;
        }
        educationContainer.appendChild(div);
    });
}


// ---------------------------
// REVEAL ANIMATIONS
// ---------------------------
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            setTimeout(()=>{ entry.target.classList.add('active'); }, index*80);
        }
    });
}, { threshold: 0.1 });

function observeAllReveals() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ---------------------------
// SCROLL PROGRESS & CTC
// ---------------------------
const progressBar = document.getElementById('progress-bar');
const ctc = document.getElementById('ctc');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;

    if(scrolled > 600){
        ctc.classList.add('visible');
    } else {
        ctc.classList.remove('visible');
    }
});


// ---------------------------
// THEME TOGGLE
// ---------------------------
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}
document.querySelectorAll("button").forEach(btn=>{
    btn.onclick = toggleTheme;
});


// ---------------------------
// INIT RENDER
// ---------------------------
document.addEventListener('DOMContentLoaded', ()=>{
    renderProjects();
    renderVentures();
    renderAcademic();
    renderEducation();
    observeAllReveals();
});
