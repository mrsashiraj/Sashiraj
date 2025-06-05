document.addEventListener("DOMContentLoaded", function () {
    // --- Load Common Header ---
    // Fetches the content of header.html and inserts it into the body.
    fetch('header.html')
        .then(response => response.text()) // Get the response as plain text
        .then(html => {
            // Create a temporary div to parse the HTML string
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Get the header and nav elements from the fetched HTML
            const headerElement = tempDiv.querySelector('header');
            const navElement = tempDiv.querySelector('nav');

            // Insert the header and nav at the beginning of the body
            if (headerElement) {
                document.body.prepend(headerElement);
            }
            if (navElement) {
                // Insert nav right after the header element if it exists
                const existingHeader = document.querySelector('.main-header'); 
                if (existingHeader) {
                    existingHeader.insertAdjacentElement('afterend', navElement);
                } else {
                    // Fallback if header wasn't found (shouldn't happen with correct header.html)
                    document.body.prepend(navElement);
                }
            }

            // --- Theme Toggle Functionality (Now correctly targets the checkbox) ---
            const themeToggle = document.getElementById("theme-toggle");
            if (themeToggle) {
                // Set initial checkbox state based on saved theme
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme === "dark") {
                    document.documentElement.classList.add("dark");
                    themeToggle.checked = true; // Set checkbox to checked if dark theme is active
                } else {
                    document.documentElement.classList.remove("dark");
                    themeToggle.checked = false; // Ensure checkbox is unchecked for light theme
                }

                // Add event listener to toggle theme on checkbox change
                themeToggle.addEventListener("change", function () {
                    if (this.checked) {
                        document.documentElement.classList.add("dark");
                        localStorage.setItem('theme', "dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                        localStorage.setItem('theme', "light");
                    }
                });
            }

            // --- Highlight Active Navigation Link (moved here as nav links are now part of injected HTML) ---
            const currentPath = window.location.pathname; // e.g., "/index.html", "/about.html"
            const navLinks = document.querySelectorAll('.main-nav ul li a');

            navLinks.forEach(link => {
                // Determine the base filename for comparison
                const linkFilename = link.getAttribute('href');
                const currentPageFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

                if (linkFilename === currentPageFilename || 
                   (linkFilename === 'index.html' && (currentPageFilename === '' || currentPageFilename === 'index.html'))) { // Handle root URL for index.html
                    link.classList.add('nav-button-active');
                } else {
                    link.classList.remove('nav-button-active'); // Ensure others are not active
                }
            });

        })
        .catch(error => {
            console.error('Error loading header.html:', error);
        });

    // --- Copyright Year Auto-Update (remains in original DOMContentLoaded listener) ---
    // This part should work regardless of header.html injection if the span exists in the main HTML.
    const copyrightSpans = document.querySelectorAll('[id^="current-year-"]');
    if (copyrightSpans.length > 0) {
        copyrightSpans[0].textContent = new Date().getFullYear();
    }
});
