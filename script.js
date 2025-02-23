document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const newsContainer = document.getElementById("news-container");

    // Theme Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");

        // Save theme preference
        localStorage.setItem('theme', document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.add("light-theme");
    }

    // ✅ API Key & Fetch AI News
    const apiKey = "";

    async function fetchAINews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=artificial%20intelligence&sortBy=publishedAt&apiKey=${apiKey}`);
            const data = await response.json();

            if (data.articles) {
                newsContainer.innerHTML = ""; // Clear default text

                data.articles.slice(0, 5).forEach(article => {  // Show only 5 articles
                    const newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");

                    newsItem.innerHTML = `
                        <a href="${article.url}" target="_blank">
                            <img src="${article.urlToImage || 'images/default-thumbnail.jpg'}" alt="News Thumbnail">
                            <h3>${article.title}</h3>
                        </a>
                        <p>${article.description || "No description available."}</p>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            }
        } catch (error) {
            newsContainer.innerHTML = "<p>Failed to load AI news. Try again later.</p>";
            console.error("Error fetching news:", error);
        }
    }

    // ✅ Call function on page load
    fetchAINews();
});
