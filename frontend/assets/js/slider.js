export function initHeroSlider() {
  const root = document.querySelector("[data-hero]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const prevBtn = root.querySelector("[data-hero-prev]");
  const nextBtn = root.querySelector("[data-hero-next]");
  let idx = 0;
  let timer = null;

  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.hidden = n !== idx;
      s.setAttribute("aria-hidden", n === idx ? "false" : "true");
    });
  }

  function next() {
    show(idx + 1);
  }

  function prev() {
    show(idx - 1);
  }

  function start() {
    stop();
    timer = window.setInterval(next, 3000);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  prevBtn?.addEventListener("click", () => { prev(); start(); });
  nextBtn?.addEventListener("click", () => { next(); start(); });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  show(0);
  start();
}

