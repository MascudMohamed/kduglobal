import { mountShell } from "./component-loader.js";
import { initMobileMenu } from "./mobile-menu.js";
import { initHeroSlider } from "./slider.js";
import { initReveals } from "./animations.js";
import { initCounters } from "./counters.js";
import { initLazyLoad } from "./lazyload.js";
import { initLanguage } from "./language.js";

function markActiveNav() {
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = document.querySelectorAll(".nav__link, .mobile-menu__link");
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("#")) return;
    if (href === path) a.setAttribute("aria-current", "page");
  });
}

async function boot() {
  await mountShell();
  initMobileMenu();
  markActiveNav();
  initLanguage();
  initHeroSlider();
  initReveals();
  initCounters();
  initLazyLoad();
}

boot().catch((e) => {
  console.error(e);
});

