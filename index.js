const rssUrl = "https://www.facebook.com/profile.php?id=100054287840786";

async function loadRSS() {
    try {
        const response = await fetch(rssUrl);
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const entries = xml.getElementsByTagName("entry");
        const feedDiv = document.getElementById("feed");

        for (let i = 0; i < Math.min(entries.length, 5); i++) {
            const title = entries[i].getElementsByTagName("title")[0].textContent;
            const content = entries[i].getElementsByTagName("content")[0].textContent;

            const article = document.createElement("article");
            article.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
            feedDiv.appendChild(article);
        }
    } catch (err) {
        document.getElementById("feed").innerHTML = "Unable to load Facebook feed.";
        console.error(err);
    }
}

loadRSS();