/**
 * Formspree — receives submissions even when PHP/MySQL is offline.
 * Runs in parallel with the KDU API when `getKduApiBase()` is available.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgodpzaa";

/**
 * @param {Record<string, string>} fields — arbitrary keys become email fields in Formspree
 * @returns {Promise<Response>}
 */
export function submitFormspree(fields) {
  return fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(fields),
  });
}
