function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function programCard(p) {
  const tags = (p.tags || []).slice(0, 3).map((t) => `<span class="badge badge--glass">${escapeHtml(t)}</span>`).join("");
  return `
    <article class="card programCard" data-reveal>
      <div class="programCard__media">
        <img data-src="${escapeHtml(p.image || "")}" alt="${escapeHtml(p.title)}" width="900" height="520" />
      </div>
      <div class="programCard__tag"><span class="badge badge--blue">${escapeHtml(p.level)}</span></div>
      <h3 class="programCard__title">${escapeHtml(p.title)}</h3>
      <p class="programCard__desc">${escapeHtml(p.desc)}</p>
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

function applyFilters(list, q, level) {
  const query = q.trim().toLowerCase();
  return list.filter((p) => {
    if (level !== "all" && p.level !== level) return false;
    if (!query) return true;
    const hay = `${p.title} ${p.desc} ${(p.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(query);
  });
}

function render(grid, list) {
  if (!list.length) {
    grid.innerHTML = `
      <div class="card card__pad" style="grid-column:1/-1">
        <h2 class="h2">No results</h2>
        <p class="muted">Try a different keyword or switch the level filter.</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = list.map(programCard).join("");
}

async function boot() {
  const grid = document.getElementById("programsGrid");
  const search = document.getElementById("programSearch");
  const level = document.getElementById("programLevel");
  if (!grid || !search || !level) return;

  const all = await loadPrograms();
  const update = () => render(grid, applyFilters(all, search.value, level.value));

  const u = new URL(window.location.href);
  const q = u.searchParams.get("q");
  if (q) search.value = q;

  search.addEventListener("input", update);
  level.addEventListener("change", update);
  update();
}

boot().catch(console.error);

