/* ━━━ DEFAULT DATA ━━━ */
const DEFAULTS = {
  projects: [
    {
      id: 'tarkari',
      tag: 'Supply Chain · Python · Market Analysis',
      title: 'Tarkari Mart',
      info: 'Engineered a hybrid B2B supply chain model for Nepal\'s fresh produce sector, applying data-driven logistics sequencing to reduce post-harvest vegetable spoilage by 15%. Combined Python-based pipeline analysis with market viability assessment to optimise routing and improve farmer-to-buyer margins at scale.',
      specs: 'Python (Pandas) · B2B supply chain modeling · Logistics route optimisation · Spoilage analytics · Market viability assessment.',
      status: 'Validated — 15% spoilage reduction. Live at sashiraj.com.np'
    },
    {
      id: 'goreto',
      tag: 'AI Product · MVP · Tourism Tech',
      title: 'Goreto',
      info: 'Conceptualised and scoped a mobile travel planning platform for Nepal\'s tourism market, with ML-assisted itinerary generation at its core. Conducted structured market research, defined the MVP product architecture, and built the feature prioritisation framework for AI-driven trip planning.',
      specs: 'AI itinerary logic · MVP product scoping · Market research & feasibility · User journey mapping · Feature prioritisation.',
      status: 'MVP scoped. Live at sashiraj.com.np'
    },
    {
      id: 'smartkharcha',
      tag: 'Predictive Modeling · Python · FinTech',
      title: 'Smart Kharcha',
      info: 'Built a Python-based financial modeling tool that applies regression and Scikit-learn pipelines to forecast personal budget behaviour, surface savings opportunities, and deliver data-driven financial recommendations — a direct application of ML methodology to everyday financial decision-making.',
      specs: 'Python (Pandas, NumPy, Scikit-learn) · Regression forecasting · Expenditure pattern analysis · ML recommendation engine · Predictive savings modeling.',
      status: 'Prototype complete. Live at sashiraj.com.np'
    },
    {
      id: 'fsms',
      tag: 'ISO Systems · Data Governance · QA',
      title: 'QMS & FSMS — Sujal Dairy',
      info: 'Designs and operates the ISO 9001 Quality Management System and ISO 22000 Food Safety Management System at Sujal Dairy Nepal. Scope covers daily quality inspection protocols, regulatory documentation, production deviation investigation, and systematic corrective action — building the data integrity and process validation discipline that rigorous ML pipelines demand.',
      specs: 'ISO 9001 (QMS) · ISO 22000 (FSMS) · Daily quality inspections · Regulatory documentation · Root-cause analysis · Corrective action management.',
      status: 'Live — Sujal Dairy Nepal, Feb 2024 — Present.'
    }
  ],
  ventures: [
    {
      id: 'munal',
      tag: 'Automotive · Industrial R&D · VC',
      title: 'Munal',
      info: 'Early-stage venture developing terrain-specific vehicle components for Nepal\'s road conditions — grounded in materials performance data and durability field testing. Munal is end-to-end venture practice: problem validation, product-market fit research, and supply chain structuring for an underserved industrial segment.',
      specs: 'Component R&D · Materials performance testing · Terrain durability analysis · Market gap validation · Local supply chain design.',
      status: 'Early stage. @munal_np — Instagram.'
    },
    {
      id: 'damai',
      tag: 'Heritage · JIT · Export Commerce',
      title: 'Damai',
      info: 'Commercialising traditional Nepali artisan craft through JIT production principles and export logistics architecture — building a scalable product line that connects artisan supply with international demand without compromising craft quality or producer margins.',
      specs: 'JIT production modeling · Artisan supply chain integration · Export logistics design · Quality standardisation · Market entry strategy.',
      status: 'Building. @damai_np — Instagram.'
    },
    {
      id: 'sarky',
      tag: 'Materials Science · Product Dev · VC',
      title: 'Sarky',
      info: 'Research-led venture designing tactical footwear for Himalayan terrain, using soil composition profiling, moisture analysis, and material degradation data as the product foundation. Demonstrates how scientific rigor and field data can de-risk early-stage product investment decisions.',
      specs: 'Terrain & soil composition analysis · Material durability testing · Product-market fit research · Himalayan field testing · R&D-led design.',
      status: 'In development. @sarky_np — Instagram.'
    }
  ],
  papers: [
    {
      id: 'eyecolour',
      tag: 'Genetics · Statistical Modeling',
      title: 'Genetics of Eye Colour',
      info: 'Quantitative investigation into the polygenic mechanisms governing human eye colour variation. Examines OCA2, HERC2, and epistatic gene interactions using multi-variable statistical analysis — demonstrating the same feature interaction and model interpretability reasoning that underpins applied ML work.',
      specs: 'Polygenic inheritance analysis · OCA2 & HERC2 gene interaction · Epistasis modeling · Melanin biosynthesis pathways · Quantitative genetics.',
      status: 'Academic Paper — Tribhuvan University, Nepal.'
    },
    {
      id: 'gxe',
      tag: 'Systems Biology · Computational Modeling',
      title: 'GxE & Vertebrate Brain Evolution',
      info: 'Analyses how gene-environment interactions drive divergent vertebrate brain evolution, arguing that neural complexity is an emergent property of genomic potential under ecological selection pressure — a systems framing directly applicable to understanding adaptive learning in ML architectures.',
      specs: 'GxE interaction modeling · Comparative neuroanatomy · Evolutionary selection analysis · Neural plasticity frameworks · Adaptive systems.',
      status: 'Academic Paper — Tribhuvan University, Nepal.'
    },
    {
      id: 'ann',
      tag: 'AI/ML · Computational Neuroscience',
      title: 'ANNs Inspired by Avian Brains',
      info: 'Examines structural and developmental parallels between avian embryonic brain architecture and artificial neural network design principles, proposing that biological neural development offers empirically grounded blueprints for building more efficient and interpretable AI systems.',
      specs: 'Avian neural architecture · ANN design principles · Biomimetic AI methodology · Developmental neuroscience · Computational intelligence.',
      status: 'Academic Paper — Tribhuvan University, Nepal.'
    },
    {
      id: 'fssc',
      tag: 'Data Validation · Food Safety Systems',
      title: 'FSSC 22000 — Chandragiri',
      info: 'Field-based compliance audit of FSSC 22000 standards across dairy manufacturing operations in the Chandragiri region. Identifies systematic gaps between documented quality protocols and production-floor practice through structured data collection and gap matrix analysis.',
      specs: 'FSSC 22000 audit methodology · Field data collection · Compliance gap matrix · Regulatory risk assessment · Statistical validation.',
      status: 'Academic Paper — Tribhuvan University, Nepal.'
    }
  ],
  posts: []
};

/* ━━━ SKILLS DATA ━━━ */
const SK_PCT = {
  'Python (Pandas/NumPy)': 82, 'Scikit-learn': 74, 'SQL (MySQL)': 80, 'Power BI': 85,
  'Google Analytics': 83, 'MS Excel': 90, 'Machine Learning': 72, 'Predictive Modeling': 76,
  'Data Analysis': 88, 'Statistical Inference': 85, 'Regression Analysis': 86, 'Dashboard Design': 84,
  'Venture Structuring': 78, 'Market Viability Assessment': 84, 'Business Modeling': 80,
  'Investment Thesis': 72, 'Product-Market Fit': 76, 'Strategic Planning': 86,
  'ISO 9001 (QMS)': 92, 'ISO 22000 (FSMS)': 94, 'Quality Inspections': 95,
  'Regulatory Documentation': 89, 'Root-Cause Analysis': 85, 'Process Validation': 83,
  'Project Execution': 88, 'Team Coordination': 82, 'Operations Management': 80,
  'Problem Solving': 90, 'Process Improvement': 82, 'Report Writing': 87,
  'Supply Chain Design': 80, 'Logistics Optimisation': 78, 'Market Analysis': 82,
  'Field Data Collection': 88, 'Compliance Auditing': 85, 'Risk Assessment': 83
};

const SK_DATA = {
  managerial: [
    { num: '01', layer: 'Venture & Investment', title: 'VC & Strategy', skills: ['Venture Structuring', 'Market Viability Assessment', 'Business Modeling', 'Investment Thesis', 'Product-Market Fit', 'Strategic Planning'] },
    { num: '02', layer: 'Quality & Process', title: 'QMS / FSMS Governance', skills: ['ISO 9001 (QMS)', 'ISO 22000 (FSMS)', 'Quality Inspections', 'Regulatory Documentation', 'Root-Cause Analysis', 'Process Validation'] },
    { num: '03', layer: 'Execution & Delivery', title: 'Project Management', skills: ['Project Execution', 'Team Coordination', 'Operations Management', 'Problem Solving', 'Process Improvement', 'Report Writing'] }
  ],
  technical: [
    { num: '01', layer: 'AI / ML & Data Science', title: 'Machine Learning Stack', skills: ['Python (Pandas/NumPy)', 'Scikit-learn', 'Machine Learning', 'Predictive Modeling', 'Regression Analysis', 'Statistical Inference'] },
    { num: '02', layer: 'Analytics & BI', title: 'Data & Insights', skills: ['Data Analysis', 'SQL (MySQL)', 'Power BI', 'Dashboard Design', 'Google Analytics', 'MS Excel'] },
    { num: '03', layer: 'Domain Expertise', title: 'Applied Practice', skills: ['Supply Chain Design', 'Logistics Optimisation', 'Market Analysis', 'Field Data Collection', 'Compliance Auditing', 'Risk Assessment'] }
  ]
};

const QUOTES = [
  { text: "In God we trust; all others must bring data.", name: "W. Edwards Deming", role: "Statistician & Quality Pioneer" },
  { text: "The goal is to turn data into information, and information into insight.", name: "Carly Fiorina", role: "Former CEO, Hewlett-Packard" },
  { text: "Without data, you're just another person with an opinion.", name: "W. Edwards Deming", role: "Statistician & Quality Pioneer" },
  { text: "It is a capital mistake to theorize before one has data.", name: "Arthur Conan Doyle", role: "Author — Sherlock Holmes" },
  { text: "The purpose of models is not to fit the data but to sharpen the questions.", name: "Samuel Karlin", role: "Mathematical Statistician" },
  { text: "An approximate answer to the right problem is worth a good deal more than an exact answer to an approximate problem.", name: "John Tukey", role: "Statistician" },
  { text: "The best way to predict the future is to create it.", name: "Peter Drucker", role: "Management Consultant" },
  { text: "Every expert was once a beginner. Every professional was once an amateur.", name: "Robin Sharma", role: "Author & Leadership Expert" }
];
