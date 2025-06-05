document.addEventListener("DOMContentLoaded", function () {
    // --- Load Common Header ---
    // Fetches the content of header.html and inserts it into the body.
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                // If the response is not OK (e.g., 404), throw an error
                throw new Error(`HTTP error! status: ${response.status} - Could not load header.html`);
            }
            return response.text(); // Get the response as plain text
        })
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
            // Provide a visual fallback or error message to the user if header fails to load
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.padding = '20px';
            errorDiv.textContent = 'Failed to load site header. Please check your internet connection or try again later.';
            document.body.prepend(errorDiv);
        });

    // --- Copyright Year Auto-Update (remains in original DOMContentLoaded listener) ---
    // This part should work regardless of header.html injection if the span exists in the main HTML.
    const copyrightSpans = document.querySelectorAll('[id^="current-year-"]');
    if (copyrightSpans.length > 0) {
        copyrightSpans[0].textContent = new Date().getFullYear();
    }

    // --- New: Section Fade-In on Scroll ---
    // Select all sections that should have the fade-in effect
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Callback function to execute when observed elements intersect
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is intersecting (visible), add the 'is-visible' class
                entry.target.classList.add('is-visible');
            } else {
                // If the element is not intersecting (scrolled out of view), remove the 'is-visible' class
                // This allows the animation to re-play if scrolled back up
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe each section
    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
