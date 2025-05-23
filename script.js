document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    // Theme Toggle Functionality
    if (themeToggle) { // Ensure the theme toggle button exists before adding event listener
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");

            // Save theme preference
            localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark" : "light");
        });
    }

    // Load saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        // Default to light theme if no preference or if 'light' is explicitly saved
        document.body.classList.add("light-theme"); // Ensure light-theme class is present initially
    }
});
