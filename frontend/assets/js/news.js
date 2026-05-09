function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function safeJson(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function newsItem(n) {
  const date = new Date(n.date);
  const nice = Number.isNaN(date.getTime()) ? n.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const pos = n.objectPosition ? ` style="object-position:${escapeHtml(n.objectPosition)}"` : "";
  return `
    <article class="card newsCard">
      <div class="newsCard__media">
        <img data-src="${escapeHtml(n.image || "")}" alt="${escapeHtml(n.title)}" width="700" height="420"${pos} />
      </div>
      <div class="newsCard__meta">
        <span class="badge badge--glass">${escapeHtml(n.category)}</span>
        <span>${escapeHtml(nice)}</span>
      </div>
      <h3 class="newsCard__title">${escapeHtml(n.title)}</h3>
      <p class="programCard__desc">${escapeHtml(n.highlight || n.excerpt || "")}</p>
      <a class="btn" href="news-detail.html?id=${encodeURIComponent(n.id)}">Learn more</a>
    </article>
  `;
}

function eventItem(e) {
  const date = new Date(e.date);
  const nice = Number.isNaN(date.getTime()) ? e.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  return `
    <article class="card eventCard">
      <div class="eventCard__media">
        <img data-src="${escapeHtml(e.image || "")}" alt="${escapeHtml(e.title)}" width="700" height="420" />
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

async function boot() {
  const [news, events] = await Promise.all([
    safeJson("data/news.json"),
    safeJson("data/events.json")
  ]);

  const newsList = document.getElementById("newsList");
  if (newsList) newsList.innerHTML = news.map(newsItem).join("");

  const eventsList = document.getElementById("eventsList");
  if (eventsList) eventsList.innerHTML = events.map(eventItem).join("");
}

boot().catch(console.error);

