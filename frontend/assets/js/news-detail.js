import { pickLang } from "./language.js";
import { assetHref } from "./assets.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fallbackNewsImage(id) {
  const m = {
    "global-partnerships": "assets/images/intro-hero.svg",
    "ai-lab": "assets/images/dept-data-science.svg",
    "scholarships": "assets/images/academics-hero.svg",
  };
  return m[id] || "assets/images/intro-hero.svg";
}

function getId() {
  const u = new URL(window.location.href);
  return u.searchParams.get("id") || "";
}

async function safeJson(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

let currentItem = null;

function renderArticle(item) {
  const title = pickLang(item, "title");
  const category = pickLang(item, "category");
  const lead = pickLang(item, "highlight") || pickLang(item, "excerpt") || "";
  const date = new Date(item.date);
  const nice = Number.isNaN(date.getTime())
    ? item.date
    : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" });

  const paras = (item.content || []).map((p) => `<p class="muted">${escapeHtml(p)}</p>`).join("");
  const pos = item.objectPosition ? ` style="object-position:${escapeHtml(item.objectPosition)}"` : "";

  document.title = `${title} | KDU Global`;

  return `
    <div class="article__media">
      <img src="${escapeHtml(assetHref(item.image))}" alt="${escapeHtml(title)}" loading="eager" decoding="async"${pos} onerror="this.onerror=null;this.src='${escapeHtml(assetHref(fallbackNewsImage(item.id)))}'" />
    </div>
    <div class="article__body">
      <div class="article__meta">
        <span class="badge badge--blue">${escapeHtml(category)}</span>
        <span class="muted">${escapeHtml(nice)}</span>
      </div>
      <h1 class="h1" style="margin-top:10px">${escapeHtml(title)}</h1>
      <p class="lead">${escapeHtml(lead)}</p>
      <div class="divider"></div>
      ${paras}
    </div>
  `;
}

async function render() {
  const id = getId();
  const root = document.getElementById("newsArticle");
  if (!root) return;

  const news = await safeJson("data/news.json");
  const item = news.find((n) => n.id === id) || news[0];

  if (!item) {
    root.innerHTML = `
      <div class="card__pad">
        <h1 class="h2">News item not found</h1>
        <p class="muted">Please go back to the News page and choose an article.</p>
      </div>
    `;
    return;
  }

  currentItem = item;
  root.innerHTML = renderArticle(item);
}

render().catch((e) => console.error(e));

window.addEventListener("kdu:langchange", () => {
  const root = document.getElementById("newsArticle");
  if (root && currentItem) root.innerHTML = renderArticle(currentItem);
});
