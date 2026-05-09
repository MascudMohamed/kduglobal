const DEFAULT_BASE_URL = "../backend/api";

export const Api = (() => {
  let baseUrl = DEFAULT_BASE_URL;

  function setBaseUrl(url) {
    baseUrl = url.replace(/\/+$/, "");
  }

  async function request(path, options = {}) {
    const url = `${baseUrl}/${path.replace(/^\/+/, "")}`;
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {})
      },
      ...options
    });

    const contentType = res.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) {
      const message = typeof payload === "object" && payload && payload.error ? payload.error : `Request failed (${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }

    return payload;
  }

  return {
    setBaseUrl,
    getPrograms: () => request("fetch-programs.php"),
    getNews: (page = 1) => request(`fetch-news.php?page=${encodeURIComponent(page)}`),
    getEvents: () => request("fetch-events.php"),
    submitContact: (data) => request("submit-contact.php", { method: "POST", body: JSON.stringify(data) }),
    submitApplication: (data) => request("submit-application.php", { method: "POST", body: JSON.stringify(data) }),
    search: (q) => request(`search.php?q=${encodeURIComponent(q)}`)
  };
})();

