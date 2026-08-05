# FRVG / filipWebsite — Stack & Setup Reference

Use this document when scaffolding a **new** site with the same tools and patterns as this project (`FilipRusiecki/filipWebsite`, live as `www.frvg.net`).

This repo is the **Filip Rusiecki Video Games / Play With Friends** marketing + support site. A new site should live in a **separate folder**, **separate GitHub repo**, **separate Cursor workspace**, and **separate Vercel project**.

---

## Stack (match this)

| Layer | Technology | Notes |
|--------|------------|--------|
| Framework | **RedwoodJS 8.9** | Full-stack monorepo (`web` + `api`) |
| UI | **React 18** | Pages under `web/src/pages` |
| Bundler | **Vite** | Via `@redwoodjs/vite` |
| Styling | **Tailwind CSS 3** + PostCSS | Config: `web/config/tailwind.config.js` |
| Animation | **Framer Motion** | Used on marketing/portfolio pages |
| API | **GraphQL** | `@redwoodjs/graphql-server`, services in `api/src/services` |
| ORM | **Prisma** | Schema: `api/db/schema.prisma` |
| Database | **PostgreSQL** | `DATABASE_URL` env var |
| Auth | **dbAuth** | `@redwoodjs/auth-dbauth-web` + `-api` |
| Email | **Resend** | API dependency for transactional mail |
| Package manager | **Yarn 4.4** (workspaces) | `packageManager: yarn@4.4.0` |
| Node | **20.x** | Engines pin `=20.x` |
| Hosting | **Vercel** | Build: `yarn rw build`; Corepack enabled |

### Root tooling highlights

- Workspaces: `api`, `web`
- Prettier + Tailwind plugin
- Redwood ESLint config
- Prisma seed: `yarn rw exec seed`

---

## Repo layout

```
filipWebsite/
├── api/                 # Backend
│   ├── db/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── functions/   # Serverless (GraphQL, auth, etc.)
│   │   ├── graphql/
│   │   ├── lib/
│   │   └── services/
│   └── package.json
├── web/                 # Frontend
│   ├── public/          # Static assets (images, favicon)
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── Routes.jsx
│   │   └── auth.js      # dbAuth client
│   └── package.json
├── scripts/             # e.g. seed
├── redwood.toml         # Redwood app config
├── vercel.json          # Vercel build overrides
├── package.json         # Yarn workspaces root
└── README.md
```

### `redwood.toml` (this project)

- Web port: **8910**
- API port: **8912**
- `apiUrl = "/api"`

### `vercel.json` (this project)

```json
{
  "build": {
    "env": {
      "ENABLE_EXPERIMENTAL_COREPACK": "1"
    }
  },
  "buildCommand": "yarn rw build --verbose"
}
```

---

## Auth & data (this project)

- **dbAuth** for admin/user sessions (`web/src/auth.js`)
- Prisma models include User, Ticket, Update, and related app data
- Admin role gating for dashboard features
- Do **not** copy production `.env` / secrets into a new project

---

## Frontend patterns (this project)

- Tailwind theme tokens: `game-dark`, `game-accent`, `game-light` (see Tailwind config)
- Routes in `web/src/Routes.jsx`
- Portfolio at `/portfolio` (`PortfolioPage`) — projects/skills/experience as in-page data
- Public images under `web/public/images/...`
- Framer Motion for section/card entrance animations

---

## Local commands

```bash
# Install
yarn install

# Dev (web + api)
yarn rw dev
# or: yarn redwood dev
# → http://localhost:8910

# DB migrate
yarn rw prisma migrate dev

# Seed
yarn rw exec seed

# Build (same as Vercel)
yarn rw build
```

---

## Scaffolding a NEW site the same way

### 1. Separate everything

1. New folder (e.g. `C:\Users\FIFI\myNewSite`)
2. New Cursor window → Open that folder
3. New GitHub repo under the same personal account (Hobby Vercel prefers personal-scope repos)
4. New Vercel project → import **only** that repo

Do **not** reuse this repo’s Vercel project (`frvideogames` / `www.frvg.net`).

### 2. Create the Redwood app

```bash
yarn create redwood-app .
# or: yarn create redwood-app my-new-site && cd my-new-site
```

Aim for:

- Node **20**
- Yarn (enable Corepack if needed: `corepack enable`)
- Tailwind: `yarn rw setup ui tailwind`
- Auth (if needed): `yarn rw setup auth dbAuth`
- Postgres in `schema.prisma` (`provider = "postgresql"`)
- Optional: `yarn add framer-motion`

Newer Redwood majors than 8.9 are OK for a new site unless you need a bit-for-bit version match.

### 3. Git

```bash
git init
git add .
git commit -m "Initial Redwood app"
git remote add origin https://github.com/FilipRusiecki/<NEW_REPO>.git
git push -u origin main
```

### 4. Vercel

1. Vercel → **Add New** → **Project**
2. Import the new GitHub repo
3. Ensure build uses Redwood/Yarn (mirror `vercel.json` Corepack + `yarn rw build` if needed)
4. Set env vars **on that project only**, e.g.:
   - `DATABASE_URL`
   - Auth secrets / session secrets
   - `RESEND_API_KEY` (if using email)
5. Deploy

### Vercel Hobby notes

- Multiple projects on one account are allowed (shared usage quotas)
- Concurrent builds: limited on Hobby
- Hobby is for personal/non-commercial use under Vercel’s terms
- Env vars, domains, and Git links are per-project

---

## What NOT to copy blindly

- Production `.env` / database credentials
- This site’s domain / Vercel project settings
- Hardcoded FRVG-only content (Steam app IDs, portfolio data) unless the new site needs them
- Assuming one Vercel project for two repos — keep projects separate

---

## Agent checklist (new twin project)

- [ ] New folder + Cursor workspace
- [ ] RedwoodJS + React + Vite
- [ ] Tailwind set up
- [ ] Yarn workspaces / Node 20
- [ ] Prisma + PostgreSQL
- [ ] dbAuth only if auth is required
- [ ] Separate GitHub repo
- [ ] Separate Vercel project + env vars
- [ ] `vercel.json` Corepack + `yarn rw build` if Yarn 4
- [ ] No shared secrets with FRVG production

---

## Related links

- Redwood docs: https://redwoodjs.com/docs
- This repo (example): `FilipRusiecki/filipWebsite`
- Live FRVG site: https://www.frvg.net
