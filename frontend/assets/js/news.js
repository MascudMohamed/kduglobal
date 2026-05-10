import { pickLang, t } from "./language.js";
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

function fallbackEventImage(id) {
  const m = {
    "open-day": "assets/images/admissions-hero.svg",
    "scholarship-webinar": "assets/images/intro-hero.svg",
    "campus-tour": "assets/images/academics-hero.svg",
  };
  return m[id] || "assets/images/intro-hero.svg";
}

async function safeJson(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function newsItem(n) {
  const title = pickLang(n, "title");
  const highlight = pickLang(n, "highlight");
  const category = pickLang(n, "category");
  const date = new Date(n.date);
  const nice = Number.isNaN(date.getTime()) ? n.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const pos = n.objectPosition ? ` style="object-position:${escapeHtml(n.objectPosition)}"` : "";
  return `
    <article class="card newsCard">
      <div class="newsCard__media">
        <img src="${escapeHtml(assetHref(n.image || ""))}" alt="${escapeHtml(title)}" width="700" height="420" loading="lazy" decoding="async"${pos} onerror="this.onerror=null;this.src='${escapeHtml(assetHref(fallbackNewsImage(n.id)))}'" />
      </div>
      <div class="newsCard__meta">
        <span class="badge badge--glass">${escapeHtml(category)}</span>
        <span>${escapeHtml(nice)}</span>
      </div>
      <h3 class="newsCard__title">${escapeHtml(title)}</h3>
      <p class="programCard__desc">${escapeHtml(highlight)}</p>
      <a class="btn" href="news-detail.html?id=${encodeURIComponent(n.id)}">${escapeHtml(t("learnMore"))}</a>
    </article>
  `;
}

function eventItem(e) {
  const date = new Date(e.date);
  const nice = Number.isNaN(date.getTime()) ? e.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  return `
    <article class="card eventCard">
      <div class="eventCard__media">
        <img src="${escapeHtml(assetHref(e.image || ""))}" alt="${escapeHtml(e.title)}" width="700" height="420" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${escapeHtml(assetHref(fallbackEventImage(e.id)))}'" />
      </div>
      <div class="eventCard__body">
        <div class="eventCard__meta">
          <span class="badge badge--blue">${escapeHtml(e.type)}</span>
          <span class="badge badge--glass">${escapeHtml(nice)}</span>
        </div>
        <h3 class="eventCard__title">${escapeHtml(e.title)}</h3>
        <p class="muted" style="margin:0">${escapeHtml(e.location)}</p>
        <a class="btn" href="contact.html">Register / Ask</a>
      </div>
    </article>
  `;
}

let cachedNews = [];
let cachedEvents = [];

function renderLists() {
  const newsList = document.getElementById("newsList");
  if (newsList) newsList.innerHTML = cachedNews.map(newsItem).join("");

  const eventsList = document.getElementById("eventsList");
  if (eventsList) eventsList.innerHTML = cachedEvents.map(eventItem).join("");
}

async function boot() {
  const [news, events] = await Promise.all([safeJson("data/news.json"), safeJson("data/events.json")]);
  cachedNews = news;
  cachedEvents = events;
  renderLists();
}

boot().catch(console.error);

window.addEventListener("kdu:langchange", renderLists);
