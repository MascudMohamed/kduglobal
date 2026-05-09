import { validateEmail } from "./form-validation.js";

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

  if (name.length < 2) { setErr("name", "Please enter your name."); ok = false; }
  if (!validateEmail(email)) { setErr("email", "Please enter a valid email."); ok = false; }
  if (message.length < 10) { setErr("message", "Please write a short message (10+ characters)."); ok = false; }

  return ok;
}

function boot() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(form)) return;

    const btn = form.querySelector("button[type='submit']");
    btn?.setAttribute("disabled", "disabled");
    if (status) status.textContent = "Sent (frontend demo). Phase 2 will submit to PHP API and store in MySQL.";
    await new Promise((r) => setTimeout(r, 600));
    form.reset();
    btn?.removeAttribute("disabled");
  });
}

boot();

