document.addEventListener('DOMContentLoaded', () => {
    renderProjects();           // Populates Selected Projects
    renderExperience();         // Populates Sujal Dairy & Freelance Timeline [cite: 13]
    renderEducationAndCerts();  // Populates TU Education & Google Certs [cite: 40, 50]
    
    // Initial Lab Load
    if (document.getElementById('lab-content')) {
        switchLab('bi');
    }
});
