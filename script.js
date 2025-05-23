document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const currentYearSpan = document.getElementById("current-year"); // Assuming a consistent ID for the copyright year span

    // --- Theme Toggle Functionality ---
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
        // If no saved theme or 'light' is saved, ensure dark-theme is not applied.
        // The default styles in styles.css should handle the "light" theme appearance.
        document.body.classList.remove("dark-theme"); // Ensure dark-theme is removed if light is default/saved
        // You might add a 'light-theme' class here IF your CSS specifically relies on it
        // document.body.classList.add("light-theme"); // Uncomment if your CSS needs a 'light-theme' class explicitly
    }


    // --- Copyright Year Auto-Update Functionality ---
    // IMPORTANT: Ensure all your HTML files have a span with id="current-year" in the footer.
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
