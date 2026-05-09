function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function renderArticle(item) {
  const date = new Date(item.date);
  const nice = Number.isNaN(date.getTime())
    ? item.date
    : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" });

  const paras = (item.content || []).map((p) => `<p class="muted">${escapeHtml(p)}</p>`).join("");
  const pos = item.objectPosition ? ` style="object-position:${escapeHtml(item.objectPosition)}"` : "";

  document.title = `${item.title} | KDU Global`;

  return `
    <div class="article__media">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="eager" decoding="async"${pos} />
    </div>
    <div class="article__body">
      <div class="article__meta">
        <span class="badge badge--blue">${escapeHtml(item.category)}</span>
        <span class="muted">${escapeHtml(nice)}</span>
      </div>
      <h1 class="h1" style="margin-top:10px">${escapeHtml(item.title)}</h1>
      <p class="lead">${escapeHtml(item.highlight || item.excerpt || "")}</p>
      <div class="divider"></div>
      ${paras}
    </div>
  `;
}

async function boot() {
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

  root.innerHTML = renderArticle(item);
}

boot().catch((e) => console.error(e));

