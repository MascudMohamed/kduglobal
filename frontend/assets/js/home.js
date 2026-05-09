import { validateEmail } from "./form-validation.js";

async function safeJson(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function programCard(p) {
  const tags = (p.tags || []).slice(0, 3).map((t) => `<span class="badge badge--glass">${t}</span>`).join("");
  return `
    <article class="card programCard" data-reveal>
      <div class="programCard__media">
        <img data-src="${escapeHtml(p.image || "")}" alt="${escapeHtml(p.title)}" width="900" height="520" />
      </div>
      <div class="programCard__tag"><span class="badge badge--blue">${p.level}</span></div>
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

function newsCard(n) {
  const date = new Date(n.date);
  const nice = Number.isNaN(date.getTime()) ? n.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const pos = n.objectPosition ? ` style="object-position:${escapeHtml(n.objectPosition)}"` : "";
  return `
    <article class="card newsCard" data-reveal>
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

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function renderHomeData() {
  const [programs, news] = await Promise.all([
    safeJson("data/programs.json"),
    safeJson("data/news.json")
  ]);

  const programGrid = document.getElementById("programGrid");
  if (programGrid) {
    programGrid.innerHTML = programs.slice(0, 3).map(programCard).join("");
  }

  const newsGrid = document.getElementById("newsGrid");
  if (newsGrid) {
    newsGrid.innerHTML = news.slice(0, 3).map(newsCard).join("");
  }
}

function testimonialCard(t) {
  return `
    <article class="card testimonialCard" data-reveal>
      <div class="testimonialCard__media">
        <img data-src="${escapeHtml(t.image)}" alt="${escapeHtml(t.name)} - KDU Global student" width="560" height="360" />
      </div>
      <div class="testimonialCard__body">
        <div class="badge badge--blue">KDU Global</div>
        <p class="testimonialCard__quote">“${escapeHtml(t.quote)}”</p>
        <div class="testimonialCard__meta">
          <strong>${escapeHtml(t.name)}</strong>
          <span class="muted">${escapeHtml(t.country)} · ${escapeHtml(t.dept)}</span>
        </div>
      </div>
    </article>
  `;
}

async function renderTestimonials() {
  const grid = document.getElementById("testimonialGrid");
  if (!grid) return;
  const items = await safeJson("data/testimonials.json");
  grid.innerHTML = items.slice(0, 3).map(testimonialCard).join("");
}

function getApiBase() {
  const m = document.querySelector('meta[name="kdu-api-base"]');
  const v = m?.getAttribute("content")?.trim();
  return v || "";
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  const status = document.getElementById("newsletterStatus");
  const email = form.querySelector("input[name='email']");
  const emailErr = document.querySelector("[data-error-for='email']");
  const apiBase = getApiBase();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!email) return;

    const value = email.value.trim();
    const ok = validateEmail(value);
    if (emailErr) emailErr.textContent = ok ? "" : "Please enter a valid email.";
    if (!ok) return;

    form.querySelector("button[type='submit']")?.setAttribute("disabled", "disabled");
    if (status) status.textContent = apiBase ? "Sending…" : "Subscribed (demo — set kdu-api-base meta to use backend).";

    try {
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/newsletter.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: value, source: "homepage" }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg =
            data?.errors?.email || data?.error || `Request failed (${res.status})`;
          if (status) status.textContent = msg;
        } else if (status) {
          status.textContent = data.message || "Thanks — you are subscribed.";
          form.reset();
        }
      } else {
        await new Promise((r) => setTimeout(r, 500));
        if (status) status.textContent = "Subscribed (demo). Add <meta name=\"kdu-api-base\" content=\"...\"> to use the API.";
        form.reset();
      }
    } catch {
      if (status) status.textContent = "Could not reach server. Check API URL and CORS.";
    } finally {
      form.querySelector("button[type='submit']")?.removeAttribute("disabled");
    }
  });
}

renderHomeData().catch(console.error);
renderTestimonials().catch(console.error);
initNewsletter();

document.addEventListener("submit", (e) => {
  const form = e.target?.closest?.("[data-program-finder]");
  if (!form) return;
  e.preventDefault();
  const q = form.querySelector("input[name='q']")?.value?.trim() || "";
  const url = new URL("programs.html", window.location.href);
  if (q) url.searchParams.set("q", q);
  window.location.href = url.toString();
});

