/**
 * Handles switching between Business Intelligence and Quality Control content
 * @param {string} type - 'bi' or 'qc'
 */
function switchLab(type) {
    const grid = document.getElementById('lab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    // 1. Update active state of buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find the button that was clicked and make it active
    const clickedBtn = Array.from(buttons).find(btn => 
        btn.getAttribute('onclick').includes(type)
    );
    if (clickedBtn) clickedBtn.classList.add('active');

    // 2. Add a quick fade-out effect
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
        // 3. Fetch data from our labData object (in data.js)
        const items = labData[type];

        // 4. Build the HTML for the new items
        const html = items.map(item => `
            <div class="bento-item fade-in">
                <div class="bento-icon-wrapper">
                    <i data-lucide="${item.icon}"></i>
                </div>
                <div class="bento-text">
                    <span class="label">${item.label}</span>
                    <h3>${item.title}</h3>
                </div>
            </div>
        `).join('');

        // 5. Inject HTML and fade back in
        grid.innerHTML = html;
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';

        // 6. Tell Lucide to find the new <i> tags and render the icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }, 200); // 200ms delay for a smooth transition
}

// 7. Initial load: Start the page with BI data
document.addEventListener('DOMContentLoaded', () => {
    // Check if the lab grid exists on the current page
    if (document.getElementById('lab-content')) {
        switchLab('bi');
    }
});
