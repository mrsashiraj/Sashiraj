document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    
    // Find the copyright year span using a more general selector
    // This looks for any element whose ID starts with "current-year-" (e.g., current-year-resume, current-year-home)
    const copyrightSpans = document.querySelectorAll('[id^="current-year-"]');
    const currentYearSpan = copyrightSpans.length > 0 ? copyrightSpans[0] : null;


    // --- Theme Toggle Functionality ---
    // Attaches an event listener to the theme toggle button if it exists
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            // Toggles the 'dark' class on the root HTML element
            document.documentElement.classList.toggle("dark");

            // Saves the current theme preference (dark or light) to local storage
            localStorage.setItem('theme', document.documentElement.classList.contains("dark") ? "dark" : "light");
        });
    }

    // Loads saved theme on page load
    // Checks local storage for a previously saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        // If 'dark' theme was saved, add the 'dark' class to the HTML element
        document.documentElement.classList.add("dark");
    } else {
        // Otherwise, ensure the 'dark' class is removed (defaulting to light theme)
        document.documentElement.classList.remove("dark");
    }

    // --- Copyright Year Auto-Update ---
    // Updates the text content of the identified copyright year span with the current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
