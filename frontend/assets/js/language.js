const KEY = "kdu_lang";

const TEXT = {
  en: {
    news: "News",
    contact: "Contact",
    intro: "Introduction",
    programs: "Programs",
    academics: "Academics",
    admissions: "Admissions",
    newsEvents: "News & Events",
    applyContact: "Apply / Contact",
    menu: "Menu"
  },
  ko: {
    news: "뉴스",
    contact: "문의",
    intro: "소개",
    programs: "학과/전공",
    academics: "학사/학과",
    admissions: "입학",
    newsEvents: "뉴스·행사",
    applyContact: "지원/문의",
    menu: "메뉴"
  }
};

function getLang() {
  return localStorage.getItem(KEY) === "ko" ? "ko" : "en";
}

function setLang(lang) {
  localStorage.setItem(KEY, lang === "ko" ? "ko" : "en");
  document.documentElement.setAttribute("lang", lang === "ko" ? "ko" : "en");
}

function applyLang(lang) {
  const dict = TEXT[lang] || TEXT.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || !dict[key]) return;
    el.textContent = dict[key];
  });
}

export function initLanguage() {
  const initial = getLang();
  setLang(initial);
  applyLang(initial);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    const lang = btn.getAttribute("data-lang") === "ko" ? "ko" : "en";
    setLang(lang);
    applyLang(lang);
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false"));
  });
}

