
const games = {
    pc: [],

    mobile: [
        {
            id: "mondo",
            name: "MONDO",
            category: "MOBILE GAME / RPG",
            cover: "mondo-cover.jpg",

            shortDescription:
                "Убивай монстров, становись сильнее и покупай новое оружие.",

            description:
                "MONDO — игра в жанре RPG. В ней вы должны убивать монстров, развивать своего персонажа и покупать новое оружие. Стань сильнее и исследуй игровой мир!",

            tags: ["RPG", "ADVENTURE", "MOBILE"],

            versions: [
                {
                    name: "Версия 1.0",
                    status: "ПЕРВЫЙ РЕЛИЗ",
                    url: "https://drive.google.com/uc?export=download&id=1eJQHZVhhXDOVX1DorUCNlteK2g1bjAMk"
                }
            ],

        screenshots: [
            "mondo.скрины/mondo-screen1.jpg",
            "mondo.скрины/mondo-screen2.jpg",
            "mondo.скрины/mondo-screen3.jpg"
]
        }
    ]
};

let currentPlatform = "mobile";


function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
    showPage("home");
}

function backToCatalog() {
    showPage("catalog");
}


function openPlatform(platform) {
    currentPlatform = platform;

    document.getElementById("catalogTitle").textContent =
        platform === "pc" ? "ИГРЫ ДЛЯ ПК" : "ИГРЫ ДЛЯ ТЕЛЕФОНОВ";

    document.getElementById("catalogDescription").textContent =
        platform === "pc"
            ? "Компьютерные игры от PIXEL FORGE"
            : "Мобильные игры от PIXEL FORGE";

    const grid = document.getElementById("gamesGrid");
    grid.innerHTML = "";

    const platformGames = games[platform];

    if (platformGames.length === 0) {
        grid.innerHTML = `
            <div class="empty-message">
                <h3>ПОКА НЕТ ИГР</h3>
                <p>Скоро здесь появятся новые проекты PIXEL FORGE.</p>
            </div>
        `;
    }

    platformGames.forEach((game, index) => {
        const card = document.createElement("article");
        card.className = "game-card";

        const image = document.createElement("div");
        image.className = "card-image";

        const img = document.createElement("img");
        img.src = game.cover;
        img.alt = game.name;
        image.appendChild(img);

        const content = document.createElement("div");
        content.className = "card-content";

        const number = document.createElement("div");
        number.className = "game-number";
        number.textContent = "PROJECT_" + String(index + 1).padStart(2, "0");

        const name = document.createElement("h3");
        name.textContent = game.name;

        const description = document.createElement("p");
        description.textContent = game.shortDescription;

        const open = document.createElement("div");
        open.className = "card-open";
        open.textContent = "ПОДРОБНЕЕ →";

        content.append(number, name, description, open);
        card.append(image, content);

        card.addEventListener("click", () => openGame(game.id));

        grid.appendChild(card);
    });

    showPage("catalog");
}


function openGame(gameId) {
    const game = games[currentPlatform].find(item => item.id === gameId);
    if (!game) return;

    document.getElementById("detailName").textContent = game.name;
    document.getElementById("detailCategory").textContent = game.category;
    document.getElementById("detailCover").src = game.cover;
    document.getElementById("detailDescription").textContent = game.shortDescription;
    document.getElementById("detailFullDescription").textContent = game.description;

    /* ТЕГИ */

    const tags = document.querySelector(".game-tags");
    tags.innerHTML = "";

    game.tags.forEach(tag => {
        const element = document.createElement("span");
        element.textContent = tag;
        tags.appendChild(element);
    });

    /* ВЕРСИИ */

    const versionsList = document.getElementById("versionsList");
    versionsList.innerHTML = "";

    game.versions.forEach(version => {
        const item = document.createElement("div");
        item.className = "version-item";

        const info = document.createElement("div");

        const name = document.createElement("div");
        name.className = "version-name";
        name.textContent = version.name;

        const status = document.createElement("div");
        status.className = "version-status";
        status.textContent = version.status;

        info.append(name, status);

        const link = document.createElement("a");
        link.className = "version-download";
        link.textContent = "СКАЧАТЬ ↓";
        link.href = version.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        item.append(info, link);
        versionsList.appendChild(item);
    });

    document.getElementById("versionsPanel").hidden = true;

    /* СКРИНШОТЫ */

    const gallery = document.getElementById("screenshotsGrid");
    gallery.innerHTML = "";

    game.screenshots.forEach((src, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "screenshot";

        const img = document.createElement("img");
        img.src = src;
        img.alt = game.name + " — скриншот " + (index + 1);
        img.loading = "lazy";

        img.addEventListener("click", () => {
            openViewer(src);
        });

        wrapper.appendChild(img);
        gallery.appendChild(wrapper);
    });

    showPage("gamePage");
}


/* МЕНЮ ВЕРСИЙ */

function toggleVersions() {
    const panel = document.getElementById("versionsPanel");
    panel.hidden = !panel.hidden;
}


/* ПРОСМОТР СКРИНШОТА */

function openViewer(src) {
    const viewer = document.getElementById("imageViewer");
    document.getElementById("viewerImage").src = src;
    viewer.classList.add("open");
}

function closeViewer() {
    document.getElementById("imageViewer").classList.remove("open");
    document.getElementById("viewerImage").src = "";
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeViewer();
    }
});
