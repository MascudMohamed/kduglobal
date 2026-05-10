import { validateEmail } from "./form-validation.js";
import { getKduApiBase } from "./api-config.js";
import { submitFormspree } from "./formspree.js";

function setErr(name, msg) {
  const el = document.querySelector(`[data-error-for='${CSS.escape(name)}']`);
  if (el) el.textContent = msg || "";
}

function getValue(form, name) {
  const el = form.elements.namedItem(name);
  return el && "value" in el ? String(el.value).trim() : "";
}

function validate(form) {
  const name = getValue(form, "name");
  const email = getValue(form, "email");
  const message = getValue(form, "message");

  let ok = true;
  setErr("name", "");
  setErr("email", "");
  setErr("message", "");

  if (name.length < 2) {
    setErr("name", "Please enter your name.");
    ok = false;
  }
  if (!validateEmail(email)) {
    setErr("email", "Please enter a valid email.");
    ok = false;
  }
  if (message.length < 10) {
    setErr("message", "Please write a short message (10+ characters).");
    ok = false;
  }

  return ok;
}

function boot() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(form)) return;

    const name = getValue(form, "name");
    const email = getValue(form, "email");
    const message = getValue(form, "message");
    const apiBase = getKduApiBase();

    const btn = form.querySelector("button[type='submit']");
    btn?.setAttribute("disabled", "disabled");
    if (status) status.textContent = "Sending…";

    let formSpreeOk = false;
    let apiOk = false;
    let apiData = null;
    let apiRaw = "";

    try {
      const fsRes = await submitFormspree({
        name,
        email,
        message,
        form: "contact",
        _subject: "[KDU Global] Contact form",
        _replyto: email,
      });
      formSpreeOk = fsRes.ok;
      if (!formSpreeOk) {
        console.warn("Formspree contact:", fsRes.status, await fsRes.text().catch(() => ""));
      }
    } catch (err) {
      console.error("Formspree contact failed:", err);
    }

    if (apiBase) {
      try {
        const res = await fetch(`${apiBase}/api/contact.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        apiRaw = await res.text();
        try {
          apiData = apiRaw ? JSON.parse(apiRaw) : {};
        } catch {
          apiData = {};
        }
        apiOk = res.ok;
        if (!apiOk) {
          const errs = apiData.errors || {};
          if (errs.name) setErr("name", errs.name);
          if (errs.email) setErr("email", errs.email);
          if (errs.message) setErr("message", errs.message);
        }
      } catch (err) {
        console.error("Contact API failed:", err);
      }
    }

    if (formSpreeOk || apiOk) {
      if (status) {
        status.textContent =
          apiData?.message ||
          (apiOk ? "Thanks — we received your message." : "Thanks — we received your message (via Formspree).");
      }
      form.reset();
      setErr("name", "");
      setErr("email", "");
      setErr("message", "");
    } else {
      const apiMsg =
        apiData?.errors?.name ||
        apiData?.errors?.email ||
        apiData?.errors?.message ||
        apiData?.error ||
        (apiRaw && apiRaw.length < 220 ? apiRaw : "");
      if (status) {
        status.textContent =
          (typeof apiMsg === "string" && apiMsg ? apiMsg + " " : "") +
          "Could not send. Check Formspree dashboard and your API (if using MySQL).";
      }
    }

    btn?.removeAttribute("disabled");
  });
}

boot();
