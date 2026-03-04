# Professional Project Duplication Prompt

Use this prompt to create a **new project** that replicates the same architecture, technologies, and feature set as this one, but with **your own context** (different product name, game, brand, content, and optional integrations). Do not modify the existing project; create a fresh project in a new directory.

---

## 1. Project overview

Build a **full-stack marketing + support website** for a product (e.g. a video game or software product) with:

- **Public marketing site**: homepage, about, FAQ, updates/patch notes, optional feature pages (e.g. cosmetics, achievements).
- **Support system**: user-submitted support tickets and bug reports, with link-based access and optional admin dashboard for staff.
- **Admin area**: login and dashboard for staff to view and reply to tickets (role-based access).
- **Authentication**: email/password auth for admins only; optional email verification. No public sign-up required for ticket submission (tickets can be anonymous with email).

The site should feel like a **product/game landing site**: dark theme, clear CTAs (e.g. store/wishlist link), and consistent branding.

---

## 2. Technology stack (use the same)

- **Framework**: [RedwoodJS](https://redwoodjs.com/) (full-stack: React + GraphQL API + Prisma). Use a current stable version (e.g. 8.x).
- **Runtime**: Node 20.x.
- **Package manager**: Yarn (workspaces: `web`, `api`).
- **Database**: PostgreSQL (via Prisma ORM).
- **Auth**: Redwood’s built-in auth (e.g. dbAuth) for **admin users only** (no public user registration required for support).
- **Frontend**: React (JSX), Redwood Router, **Tailwind CSS** for styling, **Framer Motion** for subtle animations.
- **API**: GraphQL (Redwood’s default); serve from `/api`.

Do **not** introduce other frameworks (e.g. Next.js, Express-only) or different styling systems; keep the stack aligned with the reference project.

---

## 3. Data model (Prisma schema)

Implement the following concepts (adapt table/field names to your naming preferences; keep the same behavior):

**Users (admin only)**

- `User`: id, email, hashedPassword, salt, resetToken, resetTokenExpiresAt, role (e.g. `"admin"` / `"user"`), emailVerified, verificationToken, verificationTokenExpiresAt, timestamps. Only users with an admin role can access the admin dashboard.

**Support system**

- **Ticket**: id, title, description, email (optional), userId (optional), viewToken (optional, for link-based access), ticketType (e.g. `"support"` | `"bug_report"`), status (e.g. `open`, `in_progress`, `resolved`, `closed`). For bug reports only: gameVersion, platform, stepsToReproduce, expectedBehavior, actualBehavior, frequency, severity. Timestamps.
- **Reply**: id, ticketId, content, isAdmin (boolean for staff replies), createdAt. Cascade delete when ticket is deleted.

**Content**

- **Update**: id, title, version, content (full body), summary (short teaser), isPublished, timestamps. Used for patch notes / updates page.

Rules:

- Tickets are created **without** requiring login; optionally associate with `userId` if you add logged-in users later.
- Access to a ticket by ID must require either: (a) valid `viewToken` in the URL for that ticket, or (b) current user is admin. Never expose ticket content by ID alone to anonymous users.
- Use PostgreSQL; keep migrations under version control.

---

## 4. Routes and pages

Implement these routes (path and page names can be adapted to your naming):

| Path | Purpose |
|------|--------|
| `/` | Home page (hero, features, CTAs, optional “latest update” teaser) |
| `/updates` | List of published updates/patch notes |
| `/faq` | FAQ page (content from your context) |
| `/about` | About / team page |
| `/cosmetics` | Optional: e.g. in-game cosmetics or similar (can be placeholder) |
| `/achievements` | Optional: e.g. achievements or similar (can be placeholder) |
| `/support` | Support hub: form to create ticket + optional list or message to use link |
| `/support/{id}` | Single ticket view (only if token in query or user is admin) |
| `/verify-email` | Email verification callback for admin auth |
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Private: list of all tickets, drill into ticket, reply as admin |

Use a **PrivateSet** (or equivalent) so `/admin/dashboard` is only accessible to authenticated users with the admin role. Unauthenticated users should be redirected to `/admin/login`. Use a loading state while auth is resolving.

---

## 5. Core features to implement

**Ticket creation (no login required)**

- Form: title, description, optional email. On submit, create a Ticket and generate a unique `viewToken`. Redirect or show success UI with the **one-time link** (e.g. `/support/{id}?token=...`). Clearly remind the user to **save or bookmark this link**; it is the only way to access the ticket later.

**Bug report variant**

- Optional second form (or same page, different type): same as above plus fields: gameVersion, platform, stepsToReproduce, expectedBehavior, actualBehavior, frequency, severity. Store as same Ticket model with `ticketType: "bug_report"`.

**Ticket view page**

- For `/support/{id}`: require either `token` query parameter matching `viewToken` or current user is admin. If valid, show ticket details and replies. Include a short, visible reminder: “Save or bookmark this page; you need this link to view your ticket and replies later.” Provide “Copy link” if applicable.

**Replies**

- **User replies (public ticket view)**: Allow adding a reply only if the client proves access to the ticket—e.g. by sending the same `viewToken` in the mutation (e.g. `createReply(ticketId, content, token)`). The API must verify that `token` matches the ticket's `viewToken` before creating the reply. Set `isAdmin: false` server-side. Do **not** allow unauthenticated replies with only `ticketId` (otherwise anyone could reply to any ticket). **Admin replies**: Use a separate mutation (e.g. `adminReply`) that requires admin auth and sets `isAdmin: true` server-side; never trust client-supplied `isAdmin: true`. Store `isAdmin: true` for replies created by an authenticated admin; otherwise `isAdmin: false`. Display replies in chronological order with a clear “staff” vs “user” distinction.

**Admin dashboard**

- List all tickets (filter/sort optional). Click to open a ticket and reply as admin. No need to expose raw `viewToken` in the UI; admins see tickets by role.

**Updates / patch notes**

- CRUD for Update (admin-only if you add it later). Public `/updates` page: list entries where `isPublished === true`, show `title`, `version`, `summary`, and link to full content. Home page can show the latest published update summary.

**Auth**

- Admin login (email + password). Optional: email verification flow (verification token, `verify-email` page). Password reset flow if desired. No public sign-up form.

---

## 6. Design and UX (match the reference style)

- **Theme**: Dark-first. Background and surfaces use a dark gray (e.g. `#252325`); primary text a light gray (e.g. `#D6D6D6`); accent (buttons, links, labels) a gold/amber (e.g. `#D1AD4A`). Use Tailwind with a `class` dark mode; apply dark by default (e.g. add `dark` to root in layout or App).
- **Tailwind**: Define custom colors in `tailwind.config.js` (e.g. `game-dark`, `game-accent`, `game-light`) and use them consistently. No extra CSS framework.
- **Layout**: Sticky top nav with logo/brand name and main links; footer with copyright, optional “Early Access” or similar line, and social/store links (placeholders are fine).
- **Animations**: Use Framer Motion for subtle entrance/scroll animations (e.g. fade/slide on sections or cards). Keep motion minimal and performant.
- **Forms**: Same style for all forms: dark inputs, accent border on focus, clear labels and error/success messages. Success state after ticket submit: show ticket ID and the **save-this-link** message and copy button.
- **Responsiveness**: Mobile-first; nav collapses to a hamburger on small screens; content stacks and remains readable.

Replace all placeholder content (game name, team, FAQ, Steam link, etc.) with **your** product name, team, links, and copy.

---

## 7. Security and access control

**Ticket access**

- **Reading a ticket**: `ticket(id, token)` must return a ticket only if (a) the current user is admin, or (b) the optional `token` argument matches the ticket's `viewToken`. Never return ticket content by ID alone to anonymous users. Do not expose `viewToken` in the API response (strip it before returning) except in the `createTicket` response so the user can build the link.
- **viewToken**: Generate with a cryptographically secure random (e.g. `crypto.randomBytes(24).toString('hex')`). Treat it as a secret; anyone with the token can read and reply to the ticket.

**Mutations**

- **createTicket**: Public (no auth). Generate and store a new `viewToken`; return the created ticket including `viewToken` so the client can show the one-time link.
- **createReply**: Must **not** accept only `ticketId` from unauthenticated callers—otherwise anyone could post replies to any ticket. Require either (a) a valid `token` for that ticket (check `token === ticket.viewToken`), or (b) current user is admin. Set `isAdmin: false` for token-based replies; never trust client-supplied `isAdmin`.
- **adminReply** (or equivalent): Require admin auth; set `isAdmin: true` server-side. Use this for staff replies only.
- All other ticket/update mutations (e.g. update status): require admin auth.

**Admin and auth**

- **Admin routes**: Enforce `role === "admin"` in the router (PrivateSet) and in the API for admin-only queries/mutations. Never expose admin-only operations to unauthenticated or non-admin users.
- **Secrets**: Use env vars for `DATABASE_URL`, auth/session secret, and any third-party keys. Do not commit secrets. Use HTTPS in production.

**Hardening (recommended for production)**

- **Rate limiting**: Apply rate limits or CAPTCHA to `createTicket` and `createReply` to prevent spam and abuse.
- **Input validation**: Enforce maximum lengths and sanitize/escape user content (title, description, reply body) to prevent DoS and XSS. Validate enums (e.g. status, ticketType, platform) against a whitelist.

---

## 8. Optional integrations (replace with your context)

- **Store link**: One prominent CTA (e.g. “Wishlist on Steam” or “Buy on Steam”) pointing to your product’s store page. Use your real URL.
- **Social links**: Footer links for Discord, Instagram, TikTok, Twitter/X, Reddit, etc. Can be placeholders or “Coming soon” if not ready.
- **Email**: Optional: send a confirmation or reply-notification email when a ticket is created or when an admin replies. Use your own email provider and Redwood’s email utilities.

Keep the **same UX patterns** (e.g. support flow, reminder to save link, admin reply flow); only the branding and URLs change.

---

## 9. Deliverables

1. A **new** Redwood app in a new folder (not modifying this repo).
2. **Same stack**: Redwood, React, GraphQL, Prisma, PostgreSQL, Tailwind, Framer Motion, dbAuth for admins.
3. **Same feature set**: public marketing pages, support + bug report forms, link-based ticket view with save-link reminder, replies, admin dashboard with ticket list and reply-as-admin.
4. **Same design system**: dark theme, custom Tailwind colors, sticky nav, footer, form and success-state styling.
5. **Your context**: product name, tagline, about/team, FAQ, update content, store/social links, and any optional email or store integration use your own values and keys.

Use this document as the **single source of requirements** when generating or implementing the new project. If something is ambiguous, prefer the behavior described in the reference project (support link reminder, token-based ticket access, admin-only dashboard, and dark game-style UI).
