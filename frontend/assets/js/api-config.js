/**
 * API base URL for newsletter, contact, etc.
 *
 * - On localhost / 127.0.0.1: uses XAMPP by default (`Kdu_backend/public`) so Live Server works
 *   without a working Railway URL. Override with <meta name="kdu-api-base-local" content="...">.
 * - On production (Vercel, etc.): uses <meta name="kdu-api-base" content="https://your-api...">.
 * - To force a remote API while on localhost, set kdu-api-base to a real URL other than the
 *   default placeholder below.
 */
const RAILWAY_PLACEHOLDER = /^https?:\/\/kdu-backend-production\.up\.railway\.app\/?$/i;
const LOCAL_DEFAULT = "http://127.0.0.1/Kdu_backend/public";

function trimSlash(s) {
  return String(s || "").replace(/\/+$/, "");
}

export function getKduApiBase() {
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "[::1]";

  const localMeta = document.querySelector('meta[name="kdu-api-base-local"]')?.getAttribute("content")?.trim();
  const metaRaw = document.querySelector('meta[name="kdu-api-base"]')?.getAttribute("content")?.trim() ?? "";

  if (isLocal) {
    const localBase = trimSlash(localMeta || LOCAL_DEFAULT);
    const remote = trimSlash(metaRaw);
    const useXampp = !metaRaw || RAILWAY_PLACEHOLDER.test(remote);
    return useXampp ? localBase : remote;
  }

  return trimSlash(metaRaw);
}
