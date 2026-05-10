import { pickLang, t } from "./language.js";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function loadDepartments() {
  const res = await fetch("data/departments.json", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to load departments");
  return res.json();
}

const DEPT_IMAGE_FALLBACK = {
  "cs-ai": "assets/images/dept-cs-ai.svg",
  "global-business": "assets/images/dept-global-business.svg",
  "data-science": "assets/images/dept-data-science.svg",
  "tech-policy": "assets/images/dept-tech-policy.svg",
};

function card(dep) {
  const href = `department.html?id=${encodeURIComponent(dep.id)}`;
  const highlights = Array.isArray(dep.highlights) ? dep.highlights.slice(0, 3) : [];
  const name = pickLang(dep, "name");
  const summary = pickLang(dep, "summary");
  const school = pickLang(dep, "school");
  const degree = pickLang(dep, "degree");

  return `
    <a class="deptCard" href="${href}">
      <div class="deptCard__media">
        <img src="${esc(dep.image)}" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${esc(DEPT_IMAGE_FALLBACK[dep.id] || "assets/images/academics-hero.svg")}'" />
      </div>
      <div class="deptCard__body">
        <div class="deptCard__meta">
          <span class="badge badge--blue">${esc(degree || "Program")}</span>
          <span class="muted-2">${esc(school || "")}</span>
        </div>
        <h3 class="deptCard__title">${esc(name)}</h3>
        <p class="deptCard__summary">${esc(summary || "")}</p>
        <div class="deptCard__tags">
          ${highlights.map((h) => `<span class="chip chip--soft">${esc(h)}</span>`).join("")}
        </div>
        <div class="deptCard__cta">${esc(t("deptViewCurriculum"))}</div>
      </div>
    </a>
  `;
}

let depsCache = null;

function renderGrid() {
  const grid = document.getElementById("departmentsGrid");
  if (!grid || !depsCache) return;
  grid.innerHTML = Array.isArray(depsCache) ? depsCache.map(card).join("") : "";
}

async function boot() {
  const grid = document.getElementById("departmentsGrid");
  if (!grid) return;

  try {
    depsCache = await loadDepartments();
    renderGrid();
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener("kdu:langchange", renderGrid);

boot();
