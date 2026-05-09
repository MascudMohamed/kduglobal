export function initMobileMenu() {
  const menu = () => document.getElementById("mobileMenu");

  function open() {
    const m = menu();
    if (!m) return;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    const toggle = document.querySelector("[data-mobile-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function close() {
    const m = menu();
    if (!m) return;
    m.hidden = true;
    document.body.style.overflow = "";
    const toggle = document.querySelector("[data-mobile-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-mobile-toggle]")) open();
    if (e.target.closest("[data-mobile-close]")) close();
    const link = e.target.closest("#mobileMenu a");
    if (link) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

