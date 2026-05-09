## Global International University Website System

Enterprise-style full stack prototype (frontend-first).

### Structure

- `frontend/`: static HTML/CSS/JS (no inline CSS/JS)
- `backend/`: PHP + MySQL REST-style API (Phase 2)
- `admin/`: admin panel (Phase 3)
- `database/`: schema + seed (Phase 2)

### Run (Frontend only)

Because the frontend loads reusable HTML components with `fetch()`, you should serve it with a local server (not by double-clicking HTML files).

- **PHP built-in server (recommended for Windows)**

```bash
cd frontend
php -S localhost:8080
```

Open `http://localhost:8080`.

