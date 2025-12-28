
# Renewal Management – React + FastAPI (PostgreSQL)

## Backend

### 1. Create & activate venv

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # on Windows
# or: source .venv/bin/activate  # macOS/Linux
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. PostgreSQL configuration

This project is preconfigured to use:

- HOST = localhost
- PORT = 5432
- DB_NAME = postgres
- DB_USER = postgres
- DB_PASS = Welcome@123

The connection string is already set in `backend/.env` as:

```env
DATABASE_URL=postgresql+psycopg2://postgres:Welcome%40123@localhost:5432/postgres
SECRET_KEY=change-this-in-production
```

If your credentials change, update `DATABASE_URL` accordingly.

SMTP config is optional and not required for the app to work. Email notifications
use a safe placeholder that only prints to console. Later you can set:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASSWORD=your-password
SMTP_FROM=renewals@example.com
```

and implement real sending in `app/services/notifications.py`.

### 4. Run backend

```bash
cd backend
.venv\Scripts\activate  # if not already
uvicorn app.main:app --reload
```

Backend will run at: `http://localhost:8000`

On first startup a default admin is created:

- Email: `admin@example.com`
- Password: `admin123`

API docs: `http://localhost:8000/docs`

---

## Frontend

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run dev server

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

It calls the backend at `http://localhost:8000` (configured via `VITE_API_BASE_URL`).

---

## Login

Use:

- Email: `admin@example.com`
- Password: `admin123`

Then you can access:

- Dashboard – pipeline and AI-ready insights
- Renewals – list, filters, status workflow
- Users – manage users (Admin only)
- Audit Logs – track actions (Admin only)
