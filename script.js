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

    // Fetch AI News
    async function fetchAINews() {
        const apiKey = '0656dcd9c763499b85deab7407345ce3'; // your NewsAPI key
        const url = `https://newsapi.org/v2/everything?q=artificial%20intelligence&sortBy=publishedAt&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            newsContainer.innerHTML = "";
            data.articles.slice(0, 5).forEach(article => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");
                newsItem.innerHTML = `
                    <a href="${article.url}" target="_blank">
                        <img src="${article.urlToImage || 'default-thumbnail.jpg'}" alt="News Thumbnail">
                        <h3>${article.title}</h3>
                    </a>
                    <p>${article.description || "No description available."}</p>
                `;
                newsContainer.appendChild(newsItem);
            });
        } catch (error) {
            console.error("Error fetching AI news:", error);
            newsContainer.innerHTML = "<p>Failed to load AI news.</p>";
        }
    }

    fetchAINews();
});
