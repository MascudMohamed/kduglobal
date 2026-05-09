function sameOrigin(url) {
  try {
    const u = new URL(url, window.location.href);
    return u.origin === window.location.origin;
  } catch {
    return false;
  }
}

async function loadFragment(targetSelector, fragmentPath) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const res = await fetch(fragmentPath, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load component: ${fragmentPath}`);

  const html = await res.text();
  target.innerHTML = html;

  const scripts = Array.from(target.querySelectorAll("script"));
  for (const s of scripts) {
    const clone = document.createElement("script");
    for (const attr of s.attributes) clone.setAttribute(attr.name, attr.value);
    clone.textContent = s.textContent;
    s.replaceWith(clone);
  }
}

export async function mountShell() {
  await loadFragment("[data-component='navbar']", "components/navbar.html");
  await loadFragment("[data-component='footer']", "components/footer.html");

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  if (!sameOrigin(window.location.href)) {
    console.warn("Run via a local server for component loading to work correctly.");
  }
}

