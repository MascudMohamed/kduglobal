# Deploy KDU Global frontend on Vercel

## Why you saw `404 NOT_FOUND`

Vercel serves files from the **project root**. Your `index.html` lives in **`frontend/`**, so the root had no entry file.

This repo now runs **`npm run build`**, which copies **`frontend/` → `public/`**. Vercel is configured to publish **`public/`**.

## Deploy steps

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New Project** → import the repo.
3. Vercel should detect:
   - **Build Command:** `npm run build`
   - **Output Directory:** `public`
4. Deploy.

If Vercel does not pick up `vercel.json`, set manually under **Build & Output Settings**:

- **Framework Preset:** Other  
- **Build Command:** `npm run build`  
- **Output Directory:** `public`  
- **Install Command:** `npm install` (default)

## Alternative (no build)

In the Vercel project: **Settings → General → Root Directory** → set to **`frontend`** and redeploy.  
(You can use either approach; this repo uses the `public/` copy so the repo root stays the “monorepo” root.)

## PHP + MySQL backend

**Vercel only hosts your static frontend** (HTML/CSS/JS). It does **not** run your XAMPP PHP API.

- Host PHP API on: **Railway, Render, a2hosting, Hostinger VPS, etc.**, or your school server.
- Then update **`frontend/index.html`**:

  ```html
  <meta name="kdu-api-base" content="https://your-api.example.com" />
  ```

- Add that API origin to **`CORS_ORIGINS`** in `Kdu_backend/config/env.local.php` on the server.

## Microsoft Forms / links

Application links in HTML are already absolute; they work on Vercel as-is.
