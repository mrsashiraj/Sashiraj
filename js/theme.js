// js/theme.js

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

/**
 * Initialize Theme
 * Checks the user's saved preference or their system setting
 */
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the initial theme
body.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

/**
 * Update the Toggle Icon
 */
function updateIcon(theme) {
    if (theme === 'dark') {
        // Switch to Sun icon when in dark mode
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        // Switch to Moon icon when in light mode
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    // Re-render the icon using Lucide library
    if (window.lucide) lucide.createIcons();
}

/**
 * Toggle Event Listener
 */
themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    // Apply new theme to <body>
    body.setAttribute('data-theme', newTheme);
    
    // Save preference to browser storage
    localStorage.setItem('theme', newTheme);
    
    // Update the visual icon
    updateIcon(newTheme);
});
