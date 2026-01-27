# Vercel Admin Login 400 Fix

If you get **POST /api/auth 400 (Bad Request)** when logging in on the deployed site, the API is rejecting the login. Most often the cause is **DATABASE_URL** on Vercel.

## Fix: Use the direct PostgreSQL URL on Vercel

The API must use the **direct** PostgreSQL connection string, not the Accelerate URL.

1. **Get the direct URL**  
   Vercel → **Storage** → your database (`prisma-postgres-pink-queen`) → **Quickstart** → **.env.local** tab.  
   Copy the line that starts with `postgres://` (not `prisma+postgres://`), e.g.:
   ```bash
   postgres://...@db.prisma.io:5432/postgres?sslmode=require
   ```

2. **Set it in Vercel**  
   Vercel → your project → **Settings** → **Environment Variables**.  
   - Set **DATABASE_URL** to that full `postgres://...` string.  
   - Apply to **Production** (and Preview if you use it).  
   - Save.

3. **Redeploy**  
   **Deployments** → ⋮ on the latest deployment → **Redeploy**.

## Required variables for login

| Variable       | Value / note |
|----------------|--------------|
| **DATABASE_URL** | Direct Postgres URL: `postgres://...@db.prisma.io:5432/postgres?sslmode=require` |
| **SESSION_SECRET** | Same value you use locally (e.g. from `yarn rw g secret`) |
| **BASE_URL**   | `https://filip-website.vercel.app` (or your real domain) |

Do **not** use the Accelerate URL (`prisma+postgres://accelerate.prisma-data.net/...`) for **DATABASE_URL** in this setup.

## Confirm the admin user exists

The admin was created against the same DB when you ran:

```bash
yarn rw exec createAdmin --email fifuniek080@gmail.com --password YourPassword
```

with your local `.env` pointing at the **direct** Postgres URL. If DATABASE_URL on Vercel is that same URL, that admin user is the one used when you log in on the deployed site.
