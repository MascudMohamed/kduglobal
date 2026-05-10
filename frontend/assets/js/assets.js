/**
 * Resolve a site-relative asset path (e.g. "assets/images/photo.png") against the
 * current document URL so images work from subfolders (e.g. /Kdu/frontend/index.html).
 */
export function assetHref(relativePath) {
  if (!relativePath) return "";
  try {
    return new URL(relativePath, document.baseURI).href;
  } catch {
    return String(relativePath);
  }
}
