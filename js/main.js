/**
 * Master Controller
 * Handles the rendering of projects and coordinates global UI behavior.
 */

function renderProjects() {
    const projectGrid = document.getElementById('project-list');
    
    // Safety check: only run if the element exists
    if (!projectGrid) return;

    // 1. Simulate a delay (800ms) to show off your Shimmer Skeletons
    // This makes the site feel like it's "thinking" and loading high-quality data.
    setTimeout(() => {
        // 2. Map through the 'myProjects' array from data.js
        const projectHTML = myProjects.map(proj => `
            <div class="project-card fade-in">
                <div class="image-container">
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                </div>
                <div class="card-body">
                    <span class="label">${proj.category}</span>
                    <h3>${proj.title}</h3>
                    <p>${proj.desc}</p>
                    <div class="card-footer">
                        <span class="year">${proj.year}</span>
                        <a href="${proj.link}" class="arrow-link">View Case Study →</a>
                    </div>
                </div>
            </div>
        `).join('');

        // 3. Swap the Skeletons for the actual Content
        projectGrid.innerHTML = projectHTML;

        // 4. Re-run Lucide icons for the new "Explore" arrows
        if (window.lucide) {
            lucide.createIcons();
        }
    }, 800); 
}

/**
 * Page Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    // Render the projects
    renderProjects();

    // Log for your own debugging
    console.log("Sashiraj Portfolio Engine: Operational");
});
