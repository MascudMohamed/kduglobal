function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function loadDepartments() {
  const res = await fetch("data/departments.json", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to load departments");
  return res.json();
}

function card(dep) {
  const href = `department.html?id=${encodeURIComponent(dep.id)}`;
  const highlights = Array.isArray(dep.highlights) ? dep.highlights.slice(0, 3) : [];

  return `
    <a class="deptCard" href="${href}">
      <div class="deptCard__media">
        <img src="${esc(dep.image)}" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="deptCard__body">
        <div class="deptCard__meta">
          <span class="badge badge--blue">${esc(dep.degree || "Program")}</span>
          <span class="muted-2">${esc(dep.school || "")}</span>
        </div>
        <h3 class="deptCard__title">${esc(dep.name)}</h3>
        <p class="deptCard__summary">${esc(dep.summary || "")}</p>
        <div class="deptCard__tags">
          ${highlights.map((h) => `<span class="chip chip--soft">${esc(h)}</span>`).join("")}
        </div>
        <div class="deptCard__cta">View curriculum →</div>
      </div>
    </a>
  `;
}

async function boot() {
  const grid = document.getElementById("departmentsGrid");
  if (!grid) return;

  const deps = await loadDepartments();
  grid.innerHTML = Array.isArray(deps) ? deps.map(card).join("") : "";
}

boot().catch(console.error);

