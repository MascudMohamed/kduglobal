function animateNumber(el, to, durationMs = 1100) {
  const from = 0;
  const start = performance.now();
  const fmt = new Intl.NumberFormat();

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = fmt.format(val);
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  const els = Array.from(document.querySelectorAll("[data-count-to]"));
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        const to = Number(el.getAttribute("data-count-to") || "0");
        animateNumber(el, to);
        io.unobserve(el);
      }
    },
    { threshold: 0.35 }
  );

  els.forEach((el) => io.observe(el));
}

