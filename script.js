document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const currentYearSpan = document.getElementById("current-year");

    // --- Theme Toggle Functionality ---
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.documentElement.classList.toggle("dark");

            // Save theme preference
            localStorage.setItem('theme', document.documentElement.classList.contains("dark") ? "dark" : "light");
        });
    }

    // Load saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    // --- Copyright Year Auto-Update ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
