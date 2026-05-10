let io = null;

function ensureObserver() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const img = e.target;
        const src = img.getAttribute("data-src");
        if (!src) continue;
        img.src = src;
        img.loading = "lazy";
        img.removeAttribute("data-src");
        io.unobserve(img);
      }
    },
    { rootMargin: "200px 0px", threshold: 0.01 }
  );
  return io;
}

/** Run once at startup: watch every lazy image already in the document. */
export function initLazyLoad() {
  const observer = ensureObserver();
  document.querySelectorAll("img[data-src]").forEach((img) => observer.observe(img));
}

/**
 * After injecting HTML (e.g. testimonials, programs, news), register new `img[data-src]` nodes.
 * Without this, images never get `src` and stay broken — especially after KR/EN re-renders.
 */
export function observeLazyImages(root) {
  if (!root) return;
  const observer = ensureObserver();
  root.querySelectorAll("img[data-src]").forEach((img) => observer.observe(img));
}
