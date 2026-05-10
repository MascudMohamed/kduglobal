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

function fallbackProgramImage(id) {
  const m = {
    "smart-computing": "assets/images/dept-cs-ai.svg",
    "artificial-intelligence": "assets/images/dept-data-science.svg",
    "international-hotel-management": "assets/images/dept-tech-policy.svg",
    "international-business-management": "assets/images/dept-global-business.svg",
  };
  return m[id] || "assets/images/intro-hero.svg";
}

function programCard(p) {
  const title = pickLang(p, "title");
  const desc = pickLang(p, "desc");
  const level = pickLang(p, "level");
  const tags = (p.tags || []).slice(0, 3).map((x) => `<span class="badge badge--glass">${escapeHtml(x)}</span>`).join("");
  return `
    <article class="card programCard" data-reveal>
      <div class="programCard__media">
        <img src="${escapeHtml(assetHref(p.image || ""))}" alt="${escapeHtml(title)}" width="900" height="520" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${escapeHtml(assetHref(fallbackProgramImage(p.id)))}'" />
      </div>
      <div class="programCard__tag"><span class="badge badge--blue">${escapeHtml(level)}</span></div>
      <h3 class="programCard__title">${escapeHtml(title)}</h3>
      <p class="programCard__desc">${escapeHtml(desc)}</p>
      <div class="programCard__meta">
        <span class="badge badge--glass">${escapeHtml(p.duration)}</span>
        <span class="badge badge--glass">${escapeHtml(p.campus)}</span>
        ${tags}
      </div>
    </article>
  `;
}

async function loadPrograms() {
  const res = await fetch("data/programs.json", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to load programs");
  return res.json();
}

function searchHaystack(p) {
  const title = `${p.title || ""} ${p.titleKo || ""}`;
  const desc = `${p.desc || ""} ${p.descKo || ""}`;
  return `${title} ${desc} ${(p.tags || []).join(" ")}`.toLowerCase();
}

function applyFilters(list, q, level) {
  const query = q.trim().toLowerCase();
  return list.filter((p) => {
    if (level !== "all" && p.level !== level) return false;
    if (!query) return true;
    return searchHaystack(p).includes(query);
  });
}

function render(grid, list) {
  if (!list.length) {
    grid.innerHTML = `
      <div class="card card__pad" style="grid-column:1/-1">
        <h2 class="h2">${escapeHtml(t("programsNoResults"))}</h2>
        <p class="muted">${escapeHtml(t("programsNoResultsHint"))}</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = list.map(programCard).join("");
}

let allPrograms = [];
let gridEl = null;
let searchEl = null;
let levelEl = null;

function update() {
  if (!gridEl || !searchEl || !levelEl) return;
  render(gridEl, applyFilters(allPrograms, searchEl.value, levelEl.value));
}

async function boot() {
  gridEl = document.getElementById("programsGrid");
  searchEl = document.getElementById("programSearch");
  levelEl = document.getElementById("programLevel");
  if (!gridEl || !searchEl || !levelEl) return;

  allPrograms = await loadPrograms();

  const u = new URL(window.location.href);
  const q = u.searchParams.get("q");
  if (q) searchEl.value = q;

  searchEl.addEventListener("input", update);
  levelEl.addEventListener("change", update);
  update();
}

boot().catch(console.error);

window.addEventListener("kdu:langchange", update);
