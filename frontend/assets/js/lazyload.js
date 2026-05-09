export function initLazyLoad() {
  const imgs = Array.from(document.querySelectorAll("img[data-src]"));
  if (!imgs.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const img = e.target;
        img.src = img.getAttribute("data-src") || "";
        img.loading = "lazy";
        img.removeAttribute("data-src");
        io.unobserve(img);
      }
    },
    { rootMargin: "200px 0px", threshold: 0.01 }
  );

  imgs.forEach((img) => io.observe(img));
}

