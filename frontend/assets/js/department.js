function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setImg(id, src, alt) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("src", src);
  if (alt != null) el.setAttribute("alt", alt);
}

async function loadDepartments() {
  const res = await fetch("data/departments.json", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to load departments");
  return res.json();
}

function facts(dep) {
  const items = [
    ["Degree", dep.degree || "—"],
    ["Duration", dep.duration || "—"],
    ["School", dep.school || "—"]
  ];
  return items
    .map(([k, v]) => `<div class="quick__item"><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`)
    .join("");
}

function highlights(dep) {
  const list = Array.isArray(dep.highlights) ? dep.highlights : [];
  if (!list.length) return `<p class="muted" style="margin:0">Highlights will appear here.</p>`;
  return list.map((h) => `<div class="deptHighlights__item"><span class="deptHighlights__dot" aria-hidden="true"></span>${esc(h)}</div>`).join("");
}

function curriculum(dep) {
  const blocks = Array.isArray(dep.curriculum) ? dep.curriculum : [];
  if (!blocks.length) {
    return `<div class="card card__pad" style="grid-column:1/-1"><p class="muted" style="margin:0">Curriculum coming soon.</p></div>`;
  }
  return blocks
    .map((b) => {
      const courses = Array.isArray(b.courses) ? b.courses : [];
      return `
        <article class="card card__pad deptTerm" data-reveal>
          <h3 class="h2">${esc(b.term || "Term")}</h3>
          <ul class="deptTerm__list">
            ${courses.map((c) => `<li>${esc(c)}</li>`).join("")}
          </ul>
        </article>
      `;
    })
    .join("");
}

async function boot() {
  const u = new URL(window.location.href);
  const id = u.searchParams.get("id");
  if (!id) {
    window.location.replace("academics.html#departments");
    return;
  }

  const deps = await loadDepartments();
  const dep = Array.isArray(deps) ? deps.find((d) => d && d.id === id) : null;
  if (!dep) {
    window.location.replace("academics.html#departments");
    return;
  }

  document.title = `${dep.name} | KDU Global`;
  setText("deptSchool", dep.school || "Department");
  setText("deptName", dep.name || "Department");
  setText("deptSummary", dep.summary || "");
  setImg("deptImage", dep.image || "assets/images/academics-hero.svg", dep.name || "");

  const factsEl = document.getElementById("deptFacts");
  if (factsEl) factsEl.innerHTML = facts(dep);

  const hEl = document.getElementById("deptHighlights");
  if (hEl) hEl.innerHTML = highlights(dep);

  const cEl = document.getElementById("deptCurriculum");
  if (cEl) cEl.innerHTML = curriculum(dep);
}

boot().catch(console.error);

