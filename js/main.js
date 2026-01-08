/* ========================
   GLOBAL DOM ELEMENTS
======================== */
const projectsContainer = document.getElementById('projects-container');
const venturesContainer = document.getElementById('ventures-container');
const timelineContainer = document.getElementById('timeline-container');
const academicContainer = document.getElementById('academic-container');
const educationContainer = document.getElementById('education-container');

/* ========================
   DYNAMIC DATA
======================== */

/* --- Projects --- */
const projects = [
  {
    title: "Tarkari Mart",
    category: "Operations",
    description: "Optimized B2B logistics using data modeling, reducing spoilage by 15% and enhancing farmer profitability.",
    tags: ["Supply Chain", "Data Modeling"],
    link: "#" // link to paper or project details
  },
  {
    title: "Sahayatri",
    category: "Mobility",
    description: "Designed a riding companion network focused on transit efficiency and real-time route analysis.",
    tags: ["Network Design", "UX"],
    link: "#"
  },
  {
    title: "Smart Kharcha",
    category: "FinTech",
    description: "Developed a financial modeling tool for predictive budget insights and automated cash-flow tracking.",
    tags: ["Financial Modeling", "Analytics"],
    link: "#"
  },
  {
    title: "Paisa",
    category: "Web3",
    description: "Exploration of cryptocurrency frameworks for micro-transactions and tokenomics within emerging markets.",
    tags: ["Blockchain", "Economy"],
    link: "#"
  }
];

/* --- Ventures --- */
const ventures = [
  {
    title: "Munal",
    category: "Automotive Start-up · Luxury Identity",
    description: "Engineering raw performance with aerodynamic luxury to redefine the premium automotive segment."
  },
  {
    title: "Damai",
    category: "Textile & Retail · Scalable Logistics",
    description: "Agile manufacturing delivering architectural fashion and streamlined retail logistics for modern lifestyles."
  },
  {
    title: "Sarky",
    category: "Footwear · Rugged Urban Utility",
    description: "Durable, resilient urban footwear engineered for high-utility and heritage outdoor performance."
  },
  {
    title: "Goreto",
    category: "Travel Tech · Community & Intelligence",
    description: "Conceptualizing an ecosystem for automated travel companions and intelligent itinerary generation."
  }
];

/* --- Professional Timeline --- */
const timeline = [
  {
    year: "2024 — Now",
    title: "QC/QA",
    company: "Sujal Dairy, Nepal",
    description: "Managed FSMS/QMS documentation and conducted rigorous quality inspections for production compliance."
  },
  {
    year: "2021 — 2022",
    title: "Data Enumerator",
    company: "Central Bureau of Statistics",
    description: "Coordinated national census data collection with a focus on precision and confidential management."
  },
  {
    year: "2020",
    title: "Assistant Executive",
    company: "T and B Construction Company",
    description: "Coordinated voluntary project planning and execution for construction infrastructure initiatives."
  }
];

/* --- Academic Papers --- */
const academics = [
  {
    title: "Physicochemical Analysis of Yogurt",
    description: "Conducted primary research on the shelf-life stability and physicochemical properties of commercial yogurt products. Investigated enzymatic interactions and material composition using standardized lab protocols.",
    role: "Primary Investigator",
    link: "#" // optional: link to PDF or publication
  },
  {
    title: "Milk Quality Assessment",
    description: "Evaluation of milk quality using microbiological and physicochemical testing methods. Recommendations for packaging and storage best practices.",
    role: "Co-Author",
    link: "#"
  }
];

/* --- Education & Certifications --- */
const education = [
  {
    type: "Degree",
    title: "B.Sc. Dairy Tech",
    institution: "Tribhuvan University"
  },
  {
    type: "High School",
    title: "Biology & Mathematics",
    institution: "Kathmandu Bernhardt College"
  },
  {
    type: "Credential",
    title: "Google Data Analytics",
    institution: "Individual Qualification"
  },
  {
    type: "Credential",
    title: "Website Development",
    institution: "Certified Training"
  },
  {
    type: "Credential",
    title: "Google Analytics IQ",
    institution: "Strategic Professional"
  }
];

/* ========================
   FUNCTIONS TO RENDER
======================== */

/* --- Projects --- */
function renderProjects() {
  projectsContainer.innerHTML = '';
  projects.forEach(proj => {
    const item = document.createElement('div');
    item.classList.add('project-grid-item', 'p-10', 'reveal');

    item.innerHTML = `
      <span class="text-[9px] uppercase tracking-widest text-gold mb-4 block">${proj.category}</span>
      <h4 class="serif italic text-2xl mb-6">${proj.title}</h4>
      <p class="text-xs font-light opacity-60 leading-relaxed mb-8">${proj.description}</p>
      <div class="text-[8px] uppercase tracking-widest opacity-30">${proj.tags.join(' · ')}</div>
      ${proj.link ? `<a href="${proj.link}" class="text-gold text-[10px] mt-2 block">Read Paper / Details</a>` : ''}
    `;
    projectsContainer.appendChild(item);
  });
}

/* --- Ventures --- */
function renderVentures() {
  venturesContainer.innerHTML = '';
  ventures.forEach(v => {
    const card = document.createElement('div');
    card.classList.add('venture-card', 'reveal', 'group');

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
    venturesContainer.appendChild(card);
  });
}

/* --- Timeline --- */
function renderTimeline() {
  timelineContainer.innerHTML = '';
  timeline.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('p-12', 'border', 'border-gold/5', 'grid', 'md:grid-cols-4', 'gap-8', 'reveal', 'hover:bg-gold/5', 'transition-all');

    row.innerHTML = `
      <div class="text-[10px] uppercase tracking-[0.4em] opacity-40">${item.year}</div>
      <div class="md:col-span-2">
        <h4 class="serif text-3xl italic">${item.title}</h4>
        <p class="text-gold text-[10px] uppercase tracking-widest mt-1 mb-4">${item.company}</p>
        <p class="text-xs font-light opacity-60 leading-loose">${item.description}</p>
      </div>
    `;
    timelineContainer.appendChild(row);
  });
}

/* --- Academic --- */
function renderAcademic() {
  academicContainer.innerHTML = '';
  academics.forEach(paper => {
    const div = document.createElement('div');
    div.classList.add('p-12', 'border', 'border-gold/20', 'bg-rich', 'text-chalk', 'reveal', 'mb-6');

    div.innerHTML = `
      <h4 class="serif text-3xl italic mb-6">${paper.title}</h4>
      <p class="text-sm font-light leading-loose opacity-70 mb-8">${paper.description}</p>
      <div class="text-[8px] uppercase tracking-[0.5em] text-gold mb-2">${paper.role}</div>
      ${paper.link ? `<a href="${paper.link}" class="text-gold text-[10px]">Read Paper</a>` : ''}
    `;
    academicContainer.appendChild(div);
  });
}

/* --- Education --- */
function renderEducation() {
  educationContainer.innerHTML = '';
  education.forEach(edu => {
    const div = document.createElement('div');
    div.classList.add('p-6', 'border', 'border-gold/10', 'flex', 'justify-between', 'items-center', 'group', 'reveal', 'mb-4');
    
    div.innerHTML = `
      <span class="text-[10px] uppercase tracking-widest opacity-60">${edu.title}</span>
      <span class="serif italic text-xl group-hover:text-gold transition-colors">${edu.institution}</span>
    `;
    educationContainer.appendChild(div);
  });
}

/* ========================
   INITIALIZE SITE
======================== */
function initSite() {
  renderProjects();
  renderVentures();
  renderTimeline();
  renderAcademic();
  renderEducation();

  /* Reveal animation observer */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if(entry.isIntersecting){
        setTimeout(()=> entry.target.classList.add('active'), index*80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ========================
   PROGRESS BAR & FLOATING BUTTON
======================== */
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

/* ========================
   THEME TOGGLE
======================== */
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

/* ========================
   INIT
======================== */
document.addEventListener('DOMContentLoaded', initSite);
