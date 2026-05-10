const KEY = "kdu_lang";

/**
 * All UI copy: add matching keys for `en` and `ko`.
 * Use `data-i18n="key"` on elements, `data-i18n-placeholder`, `data-i18n-aria`, `data-i18n-alt`.
 */
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
    menu: "Menu",
    skipLink: "Skip to content",
    openApplicationForm: "Open application form",
    brandSub: "KDU Global · International Education",
    socialFacebook: "Facebook",
    socialYoutube: "YouTube",
    socialFollow: "Follow KDU Global",
    ticker1: "September intake — ongoing now. Don’t miss out — apply today.",
    ticker2: "KDU Global international admissions — Fall 2026 applications open.",
    ticker3: "Scholarships — merit awards for global students. Check eligibility.",
    ticker4a: "Need help?",
    ticker4b: "Contact admissions",
    ticker4c: "— we reply fast.",
    badge247: "24/7 Support",
    badgeScholar: "Scholarships",
    learnMore: "Learn more",
    homeHeroPrev: "Previous slide",
    homeHeroNext: "Next slide",
    homeSlide1b1: "KDU Global",
    homeSlide1b2: "International Admissions",
    homeSlide1h: "Study in Korea with a global-ready experience.",
    homeSlide1p: "Clear admissions guidance, strong student support, and career-ready learning for international students.",
    homeSlide1a1: "Admissions",
    homeSlide1a2: "Explore Programs",
    homeSlide1a3: "Talk to an advisor",
    homeSlide2b1: "Global Partnerships",
    homeSlide2b2: "Mobility · Collaboration",
    homeSlide2h: "International pathways that open doors.",
    homeSlide2p: "Partnerships and exchange opportunities designed to support global outcomes.",
    homeSlide2a1: "News & Events",
    homeSlide2a2: "About KDU Global",
    homeSlide3b1: "Campus Life",
    homeSlide3b2: "Safe · Connected · Supportive",
    homeSlide3h: "A welcoming campus for international students.",
    homeSlide3p: "Services, guidance, and student communities built for belonging and success.",
    homeSlide3a1: "Student Support",
    homeSlide3a2: "Visa guide",
    homeSlide4b1: "Scholarships",
    homeSlide4b2: "Merit-based awards",
    homeSlide4h: "Scholarship opportunities for global talent.",
    homeSlide4p: "Explore scholarship tracks and get support preparing your application.",
    homeSlide4a1: "Scholarships",
    homeSlide4a2: "Ask Admissions",
    homeFinderKicker: "Find your course",
    homeFinderH: "Find your program",
    homeFinderLead: "Search our international bachelor’s degrees and explore your pathway.",
    homeFinderPh: "Search by keyword (AI, business, hotel…)",
    homeFinderSearch: "Search",
    homeChipBrowse: "Browse all programs",
    homeChipApply: "How to apply",
    homeChipScholar: "Scholarships",
    homeQuick1: "Quick actions",
    homeQ1a1: "Admissions guide",
    homeQ1a1s: "Steps & requirements",
    homeQ1b1: "Programs",
    homeQ1b1s: "Browse degrees",
    homeQ1c1: "News & events",
    homeQ1c1s: "Latest updates",
    homeQuick2: "International support",
    homeQ2a1: "Visa & documents",
    homeQ2a1s: "Checklists",
    homeQ2b1: "Scholarships",
    homeQ2b1s: "Eligibility",
    homeQ2c1: "Talk to an advisor",
    homeQ2c1s: "Fast guidance",
    homeStat1: "Countries represented",
    homeStat2: "Global partner institutions",
    homeStat3: "Student satisfaction",
    homeStat4: "Scholarship pathways",
    homeCampusK: "Campus",
    homeCampusH: "Explore the Kyungdong University campus.",
    homeCap1: "KDU Global campus",
    homeCap2: "Academic buildings",
    homeCap3: "Student spaces",
    homeCap4: "Global campus environment",
    homePresK: "Leadership",
    homePresH: "President’s Message",
    homePresP:
      "Welcome to Kyungdong University. Our commitment is to support international students with clear pathways, strong academics, and a global-ready campus experience.",
    homeTestK: "Testimonials",
    homeTestH: "Hear from KDU Global students.",
    homeTestP: "Student stories and outcomes (prototype content).",
    homeProgK: "Programs",
    homeProgH: "Career-ready programs with global outcomes.",
    homeProgP: "Explore flexible pathways designed for international students.",
    homeProgBtn: "View all programs",
    homeNewsK: "News & Events",
    homeNewsH: "Latest updates for international students.",
    homeNewsP: "Announcements, webinars, open days, and student success stories.",
    homeNewsBtn: "Open News",
    homeNlK: "Newsletter",
    homeNlH: "Get deadlines, scholarships, and events.",
    homeNlEmail: "Email",
    homeNlPh: "you@example.com",
    homeNlSub: "Subscribe",
    footerBlurb:
      "KDU Global supports international students with clear admissions guidance, modern programs, and global-ready learning experiences.",
    footerWhatsApp: "WhatsApp",
    footerEmail: "Email",
    footerNews: "News",
    footerUni: "University",
    footerAbout: "About KDU",
    footerIntl: "International",
    footerVisa: "Visa guide",
    footerScholar: "Scholarships",
    footerUg: "Undergraduate",
    footerGrad: "Graduate",
    footerContact: "Contact",
    footerAddr: "Seoul, Republic of Korea",
    footerMap: "Campus map",
    footerCopy: "Kyungdong University (KDU Global). All rights reserved.",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerA11y: "Accessibility",
    programsNoResults: "No results",
    programsNoResultsHint: "Try a different keyword or switch the level filter.",
    deptViewCurriculum: "View curriculum →",
    factDegree: "Degree",
    factDuration: "Duration",
    factSchool: "School",
    academicsPageTitle: "Departments designed for global outcomes.",
    academicsPageLead:
      "Browse departments, view curriculum outlines, and explore study pathways for international students.",
    academicsPageCtaDept: "View departments",
    academicsDeptSectionKicker: "Departments",
    academicsDeptSectionTitle: "Explore academic departments",
    academicsDeptSectionLead: "Select a department to view an overview and curriculum (prototype content).",
    academicsHeroImgAlt: "Academic departments",
    deptBackToDepts: "Back to departments",
    deptProgramDetails: "Program details",
    deptHighlightsTitle: "Highlights",
    deptCurriculumKicker: "Curriculum",
    deptCurriculumTitle: "Curriculum overview",
    deptCurriculumLead: "A clear, term-by-term outline (prototype content).",
    deptLoading: "Loading…",
    deptWait: "Please wait.",
    deptHighlightsEmpty: "Highlights will appear here.",
    deptCurriculumSoon: "Curriculum coming soon.",
    deptTermDefault: "Term",
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
    menu: "메뉴",
    skipLink: "본문으로 건너뛰기",
    openApplicationForm: "지원서 열기",
    brandSub: "KDU Global · 국제교육",
    socialFacebook: "페이스북",
    socialYoutube: "유튜브",
    socialFollow: "KDU Global 팔로우",
    ticker1: "9월 학기 모집 진행 중 — 놓치지 마세요. 지금 지원하세요.",
    ticker2: "KDU Global 국제 입학 — 2026년 가을 학기 지원 접수 중.",
    ticker3: "장학금 — 글로벌 학생 대상 우수 장학 지원. 자격을 확인하세요.",
    ticker4a: "도움이 필요하신가요?",
    ticker4b: "입학처 문의",
    ticker4c: "— 빠르게 답변드립니다.",
    badge247: "24/7 지원",
    badgeScholar: "장학금",
    learnMore: "더 알아보기",
    homeHeroPrev: "이전 슬라이드",
    homeHeroNext: "다음 슬라이드",
    homeSlide1b1: "KDU Global",
    homeSlide1b2: "국제 입학",
    homeSlide1h: "한국에서 글로벌 역량을 키우는 유학 경험.",
    homeSlide1p: "명확한 입학 안내, 든든한 학생 지원, 국제 학생을 위한 실무형 교육.",
    homeSlide1a1: "입학",
    homeSlide1a2: "학과 둘러보기",
    homeSlide1a3: "상담 요청",
    homeSlide2b1: "글로벌 파트너십",
    homeSlide2b2: "교류 · 협력",
    homeSlide2h: "세계로 열리는 국제 교육 경로.",
    homeSlide2p: "글로벌 성과를 위한 교류·협력 기회를 설계했습니다.",
    homeSlide2a1: "뉴스·행사",
    homeSlide2a2: "KDU Global 소개",
    homeSlide3b1: "캠퍼스 라이프",
    homeSlide3b2: "안전 · 연결 · 지원",
    homeSlide3h: "국제 학생을 환영하는 캠퍼스.",
    homeSlide3p: "소속감과 성공을 위한 서비스, 멘토링, 학생 커뮤니티.",
    homeSlide3a1: "학생 지원",
    homeSlide3a2: "비자 안내",
    homeSlide4b1: "장학금",
    homeSlide4b2: "우수 장학",
    homeSlide4h: "글로벌 인재를 위한 장학 기회.",
    homeSlide4p: "장학 트랙을 확인하고 지원 준비를 도와드립니다.",
    homeSlide4a1: "장학금",
    homeSlide4a2: "입학 문의",
    homeFinderKicker: "학과 찾기",
    homeFinderH: "프로그램 검색",
    homeFinderLead: "국제 학사 학위를 검색하고 나만의 진로를 설계하세요.",
    homeFinderPh: "키워드 검색 (AI, 경영, 호텔…)",
    homeFinderSearch: "검색",
    homeChipBrowse: "전체 학과 보기",
    homeChipApply: "지원 방법",
    homeChipScholar: "장학금",
    homeQuick1: "빠른 메뉴",
    homeQ1a1: "입학 안내",
    homeQ1a1s: "절차 및 요건",
    homeQ1b1: "학과",
    homeQ1b1s: "학위 과정",
    homeQ1c1: "뉴스·행사",
    homeQ1c1s: "최신 소식",
    homeQuick2: "국제 학생 지원",
    homeQ2a1: "비자·서류",
    homeQ2a1s: "체크리스트",
    homeQ2b1: "장학금",
    homeQ2b1s: "자격 안내",
    homeQ2c1: "상담 신청",
    homeQ2c1s: "빠른 안내",
    homeStat1: "출신 국가",
    homeStat2: "해외 협력 기관",
    homeStat3: "학생 만족도",
    homeStat4: "장학 경로",
    homeCampusK: "캠퍼스",
    homeCampusH: "경동대학교 캠퍼스를 둘러보세요.",
    homeCap1: "KDU Global 캠퍼스",
    homeCap2: "교육 시설",
    homeCap3: "학생 공간",
    homeCap4: "글로벌 캠퍼스",
    homePresK: "총장 인사",
    homePresH: "총장 메시지",
    homePresP:
      "경동대학교에 오신 것을 환영합니다. 국제 학생 여러분께 명확한 진로, 탄탄한 학문, 그리고 글로벌 캠퍼스 경험을 약속드립니다.",
    homeTestK: "학생 후기",
    homeTestH: "KDU Global 학생들의 이야기",
    homeTestP: "학생 성공 사례(샘플 콘텐츠).",
    homeProgK: "학과",
    homeProgH: "글로벌 역량을 키우는 실무 중심 프로그램.",
    homeProgP: "국제 학생을 위한 유연한 진로 설계.",
    homeProgBtn: "전체 학과 보기",
    homeNewsK: "뉴스·행사",
    homeNewsH: "국제 학생을 위한 최신 소식.",
    homeNewsP: "공지, 웨비나, 오픈캠퍼스, 성공 스토리.",
    homeNewsBtn: "뉴스 보기",
    homeNlK: "뉴스레터",
    homeNlH: "마감일, 장학금, 행사 소식을 받아보세요.",
    homeNlEmail: "이메일",
    homeNlPh: "you@example.com",
    homeNlSub: "구독",
    footerBlurb:
      "KDU Global은 명확한 입학 안내와 현대적인 학과, 글로벌 역량 교육으로 국제 학생을 지원합니다.",
    footerWhatsApp: "WhatsApp",
    footerEmail: "이메일",
    footerNews: "뉴스",
    footerUni: "대학",
    footerAbout: "학교 소개",
    footerIntl: "국제",
    footerVisa: "비자 안내",
    footerScholar: "장학금",
    footerUg: "학사",
    footerGrad: "대학원",
    footerContact: "연락처",
    footerAddr: "대한민국 서울",
    footerMap: "캠퍼스 지도",
    footerCopy: "경동대학교 (KDU Global). 무단 복제 금지.",
    footerPrivacy: "개인정보",
    footerTerms: "이용약관",
    footerA11y: "접근성",
    programsNoResults: "결과 없음",
    programsNoResultsHint: "다른 검색어나 단계 필터를 사용해 보세요.",
    deptViewCurriculum: "커리큘럼 보기 →",
    factDegree: "학위",
    factDuration: "기간",
    factSchool: "학교/단과",
    academicsPageTitle: "글로벌 역량을 위한 학과 구성.",
    academicsPageLead: "학과를 살펴보고 커리큘럼 개요와 유학생 학습 경로를 확인하세요.",
    academicsPageCtaDept: "학과 보기",
    academicsDeptSectionKicker: "학과",
    academicsDeptSectionTitle: "학과 탐색",
    academicsDeptSectionLead: "학과를 선택하면 개요와 커리큘럼(샘플)을 볼 수 있습니다.",
    academicsHeroImgAlt: "학과 안내",
    deptBackToDepts: "학과 목록으로",
    deptProgramDetails: "프로그램 정보",
    deptHighlightsTitle: "주요 내용",
    deptCurriculumKicker: "커리큘럼",
    deptCurriculumTitle: "커리큘럼 개요",
    deptCurriculumLead: "학기별 개요(샘플 내용)입니다.",
    deptLoading: "불러오는 중…",
    deptWait: "잠시만 기다려 주세요.",
    deptHighlightsEmpty: "주요 내용이 여기에 표시됩니다.",
    deptCurriculumSoon: "커리큘럼 정보를 준비 중입니다.",
    deptTermDefault: "학기",
  },
};

export function getLang() {
  return localStorage.getItem(KEY) === "ko" ? "ko" : "en";
}

/** Localized string for dynamic templates (cards, etc.) */
export function t(key) {
  const lang = getLang();
  const dict = TEXT[lang] || TEXT.en;
  return dict[key] ?? TEXT.en[key] ?? "";
}

/** JSON fields: title + optional titleKo */
export function pickLang(obj, field) {
  if (!obj) return "";
  const lang = getLang();
  const koKey = `${field}Ko`;
  if (lang === "ko" && obj[koKey]) return String(obj[koKey]);
  const v = obj[field];
  return v != null ? String(v) : "";
}

export function setLang(lang) {
  localStorage.setItem(KEY, lang === "ko" ? "ko" : "en");
  document.documentElement.setAttribute("lang", lang === "ko" ? "ko" : "en");
}

function applyI18nToDocument() {
  const lang = getLang();
  const dict = TEXT[lang] || TEXT.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || dict[key] == null) return;
    el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key || dict[key] == null) return;
    el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key || dict[key] == null) return;
    el.setAttribute("aria-label", dict[key]);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (!key || dict[key] == null) return;
    el.setAttribute("alt", dict[key]);
  });
}

export function initLanguage() {
  const initial = getLang();
  setLang(initial);
  applyI18nToDocument();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    const lang = btn.getAttribute("data-lang") === "ko" ? "ko" : "en";
    setLang(lang);
    applyI18nToDocument();
    document.querySelectorAll("[data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false")
    );
    window.dispatchEvent(new CustomEvent("kdu:langchange", { detail: { lang } }));
  });
}
