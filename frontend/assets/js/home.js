import { validateEmail } from "./form-validation.js";
import { pickLang, t } from "./language.js";
import { assetHref } from "./assets.js";
import { getKduApiBase } from "./api-config.js";
import { submitFormspree } from "./formspree.js";

async function safeJson(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

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

function fallbackNewsImage(id) {
  const m = {
    "global-partnerships": "assets/images/intro-hero.svg",
    "ai-lab": "assets/images/dept-data-science.svg",
    "scholarships": "assets/images/academics-hero.svg",
  };
  return m[id] || "assets/images/intro-hero.svg";
}

function fallbackTestimonialImage(id) {
  const m = { t1: "assets/images/dept-cs-ai.svg", t2: "assets/images/dept-global-business.svg", t3: "assets/images/dept-global-business.svg" };
  return m[id] || "assets/images/intro-hero.svg";
}

function programCard(p) {
  const title = pickLang(p, "title");
  const desc = pickLang(p, "desc");
  const level = pickLang(p, "level");
  const tags = (p.tags || []).slice(0, 3).map((tag) => `<span class="badge badge--glass">${tag}</span>`).join("");
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

function newsCard(n) {
  const title = pickLang(n, "title");
  const highlight = pickLang(n, "highlight");
  const category = pickLang(n, "category");
  const date = new Date(n.date);
  const nice = Number.isNaN(date.getTime()) ? n.date : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const pos = n.objectPosition ? ` style="object-position:${escapeHtml(n.objectPosition)}"` : "";
  return `
    <article class="card newsCard" data-reveal>
      <div class="newsCard__media">
        <img src="${escapeHtml(n.image || "")}" alt="${escapeHtml(title)}" width="700" height="420" loading="lazy" decoding="async"${pos} onerror="this.onerror=null;this.src='${escapeHtml(fallbackNewsImage(n.id))}'" />
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

async function renderHomeData() {
  const [programs, news] = await Promise.all([safeJson("data/programs.json"), safeJson("data/news.json")]);

  const programGrid = document.getElementById("programGrid");
  if (programGrid) {
    programGrid.innerHTML = programs.slice(0, 3).map(programCard).join("");
  }

  const newsGrid = document.getElementById("newsGrid");
  if (newsGrid) {
    newsGrid.innerHTML = news.slice(0, 3).map(newsCard).join("");
  }
}

function testimonialCard(item) {
  const quote = pickLang(item, "quote");
  const country = pickLang(item, "country");
  const dept = pickLang(item, "dept");
  return `
    <article class="card testimonialCard" data-reveal>
      <div class="testimonialCard__media">
        <img src="${escapeHtml(assetHref(item.image))}" alt="${escapeHtml(item.name)} - KDU Global student" width="560" height="360" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${escapeHtml(assetHref(fallbackTestimonialImage(item.id)))}'" />
      </div>
      <div class="testimonialCard__body">
        <div class="badge badge--blue">KDU Global</div>
        <p class="testimonialCard__quote">“${escapeHtml(quote)}”</p>
        <div class="testimonialCard__meta">
          <strong>${escapeHtml(item.name)}</strong>
          <span class="muted">${escapeHtml(country)} · ${escapeHtml(dept)}</span>
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

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  const status = document.getElementById("newsletterStatus");
  const email = form.querySelector("input[name='email']");
  const emailErr = document.querySelector("[data-error-for='email']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!email) return;

    const value = email.value.trim();
    const ok = validateEmail(value);
    if (emailErr) emailErr.textContent = ok ? "" : "Please enter a valid email.";
    if (!ok) return;

    const apiBase = getKduApiBase();

    form.querySelector("button[type='submit']")?.setAttribute("disabled", "disabled");
    if (status) status.textContent = "Sending…";

    let formSpreeOk = false;
    let apiOk = false;
    let apiMessage = "";

    try {
      const fsRes = await submitFormspree({
        email: value,
        source: "homepage",
        form: "newsletter",
        _subject: "[KDU Global] Newsletter signup",
        _replyto: value,
      });
      formSpreeOk = fsRes.ok;
      if (!formSpreeOk) {
        console.warn("Formspree newsletter:", fsRes.status, await fsRes.text().catch(() => ""));
      }
    } catch (err) {
      console.error("Formspree newsletter failed:", err);
    }

    try {
      if (apiBase) {
        const url = `${apiBase}/api/newsletter.php`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: value, source: "homepage" }),
        });
        const raw = await res.text();
        let data = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          data = {};
        }
        apiOk = res.ok;
        apiMessage = data.message || "";
        if (!res.ok && status) {
          const msg = data?.errors?.email || data?.error || (raw && raw.length < 200 ? raw : "") || `Request failed (${res.status})`;
          if (!formSpreeOk) status.textContent = msg;
        }
      }
    } catch (err) {
      console.error("Newsletter API failed:", err);
      if (!formSpreeOk && status) {
        status.textContent = err?.message || "Could not reach the API. Formspree may still have received your email.";
      }
    }

    if (formSpreeOk || apiOk) {
      if (status) {
        status.textContent = apiMessage || "Thanks — you are subscribed.";
      }
      form.reset();
    } else if (status && !status.textContent?.includes("Request failed")) {
      status.textContent = "Could not subscribe. Check Formspree and your API.";
    }

    form.querySelector("button[type='submit']")?.removeAttribute("disabled");
  });
}

renderHomeData().catch(console.error);
renderTestimonials().catch(console.error);
initNewsletter();

window.addEventListener("kdu:langchange", () => {
  renderHomeData().catch(console.error);
  renderTestimonials().catch(console.error);
});

document.addEventListener("submit", (e) => {
  const form = e.target?.closest?.("[data-program-finder]");
  if (!form) return;
  e.preventDefault();
  const q = form.querySelector("input[name='q']")?.value?.trim() || "";
  const url = new URL("programs.html", window.location.href);
  if (q) url.searchParams.set("q", q);
  window.location.href = url.toString();
});
