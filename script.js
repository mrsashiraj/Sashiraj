// Function to toggle the mobile menu (from template)
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

// Function to toggle the theme (from template)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");

    // Optionally, save theme preference to local storage
    localStorage.setItem('theme', html.getAttribute("data-theme"));
}

// Function to scroll to the top of the page (from template)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Theme Initialization ---
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    // --- Attach scrollToTop to FAB button ---
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // --- Auto-Update Copyright Year ---
    const copyrightSpan = document.getElementById('current-year-footer');
    if (copyrightSpan) {
        copyrightSpan.textContent = new Date().getFullYear();
    }

    // --- Portfolio Auto-Scroll ---
    // Modified to use a wrapper for the grid and prevent scrolling on small screens
    const portfolioGridWrapper = document.querySelector(".portfolio-grid-wrapper");
    if (portfolioGridWrapper) {
        // Only enable auto-scroll for desktop view (larger than 768px)
        if (window.innerWidth > 768) {
            setInterval(() => {
                const firstCard = portfolioGridWrapper.firstElementChild;
                if (firstCard) {
                    // Clone the first card and append it to the end
                    portfolioGridWrapper.appendChild(firstCard.cloneNode(true));
                    
                    // Animate scroll to make the "removal" smooth
                    const scrollAmount = firstCard.offsetWidth + parseFloat(getComputedStyle(portfolioGridWrapper).gap);
                    portfolioGridWrapper.scrollTo({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });

                    // Remove the original first card after the scroll animation
                    // This timeout should ideally match the scroll behavior duration or be slightly longer
                    setTimeout(() => {
                        portfolioGridWrapper.removeChild(firstCard);
                        portfolioGridWrapper.scrollLeft = 0; // Reset scroll position instantly after removal
                    }, 600); // Adjust this timeout if scroll animation duration changes
                }
            }, 3000); // Adjust interval as needed (e.g., 5000-10000ms for production)
        }
    }

    // --- Dynamic Header and Navigation Loading ---
    // Determines the correct path to header.html based on current page depth
    const pathSegments = window.location.pathname.split('/');
    let headerPath = 'header.html';
    if (pathSegments.length > 2 && pathSegments[pathSegments.length - 2] === 'projects') {
        headerPath = '../header.html'; // Adjust for pages inside 'projects' folder
    }

    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - Could not load ${headerPath}`);
            }
            return response.text();
        })
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const headerElement = tempDiv.querySelector('header');
            const navElement = tempDiv.querySelector('nav'); 

            if (headerElement) {
                document.body.prepend(headerElement);
            }
            // Insert nav right after the header element if it exists and is not already a child of header
            if (navElement && headerElement && !headerElement.contains(navElement)) { 
                 const existingHeader = document.querySelector('header');
                 if (existingHeader) {
                    existingHeader.insertAdjacentElement('afterend', navElement);
                 }
            } else if (navElement && !headerElement) { // Fallback if header not found
                document.body.prepend(navElement);
            }

            // --- Highlight Active Navigation Link ---
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('nav a'); 

            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                // Clean href and current path for comparison (remove anchors, relative paths, etc.)
                const cleanedLinkPath = linkHref ? linkHref.split('#')[0].split('/').pop() : '';
                const cleanedCurrentPath = currentPath.split('/').pop();

                // Handle root URL for index.html (empty string or "index.html")
                const isHomePage = (cleanedCurrentPath === '' || cleanedCurrentPath === 'index.html');
                const isLinkToHome = (cleanedLinkPath === '' || cleanedLinkPath === 'index.html');

                if ((isHomePage && isLinkToHome) || (cleanedLinkPath === cleanedCurrentPath && cleanedLinkPath !== '')) {
                    link.classList.add('active-nav-link'); // Use a distinct class for active nav link
                } else {
                    link.classList.remove('active-nav-link');
                }
            });

        })
        .catch(error => {
            console.error('Error loading header.html:', error);
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.padding = '20px';
            errorDiv.textContent = 'Failed to load site header. Please check your internet connection or try again later.';
            document.body.prepend(errorDiv);
        });
});
