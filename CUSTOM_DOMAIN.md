# Connecting frvg.net (GoDaddy) to Your Vercel Site

Your site is deployed on Vercel (e.g. `filip-website.vercel.app`). To use **frvg.net** from GoDaddy:

---

## Step 1: Add the domain in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and open your project.
2. Open **Settings** → **Domains**.
3. Click **Add** (or **Add Domain**).
4. Enter **frvg.net** and add it.
5. (Optional) Add **www.frvg.net** so both work. Vercel will usually suggest this.
6. Vercel will show you which DNS records to create. Keep that tab open.

---

## Step 2: Point GoDaddy DNS to Vercel

In **GoDaddy**:

1. Sign in at [godaddy.com](https://www.godaddy.com) → **My Products**.
2. Find **frvg.net** → click **DNS** or **Manage DNS**.

Then add the records Vercel asked for. Typical setup:

### Apex domain (frvg.net)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 600 (or default) |

- **Name**: `@` (means “root” = frvg.net).
- **Value**: `76.76.21.21` (Vercel’s IP).

### www (www.frvg.net)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 (or default) |

- **Name**: `www`.
- **Value**: use exactly what Vercel shows (often `cname.vercel-dns.com` or a project-specific host like `xxx.vercel-dns.com`).

Use the **exact** values from your project’s Domains page in Vercel; they can vary per project.

---

## Step 3: Wait for DNS

- Often works in a few minutes; can take up to **24–48 hours**.
- In Vercel → **Settings** → **Domains**, the domain will turn from “Pending” to a checkmark when it’s verified.

---

## Step 4: Set BASE_URL in Vercel (for email links)

Auth emails (verify, reset password) use `BASE_URL` for links. Set it to your live domain:

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Add or edit:
   - **Name**: `BASE_URL`
   - **Value**: `https://frvg.net` (or `https://www.frvg.net` if you use www as main)
   - **Environment**: Production (and Preview if you use custom domains there).

Save and redeploy so auth emails use `https://frvg.net` in links.

---

## Step 5: Redirect www ↔ non‑www (optional)

In Vercel → **Settings** → **Domains** you can:

- Add both **frvg.net** and **www.frvg.net**.
- Set one as **Primary**; the other can redirect to it.

That way both `https://frvg.net` and `https://www.frvg.net` work and one “wins.”

---

## GoDaddy quick reference

- **DNS**: My Products → frvg.net → **DNS** or **Manage DNS**.
- **A record**: Type = A, Name = `@`, Value = `76.76.21.21`.
- **CNAME**: Type = CNAME, Name = `www`, Value = what Vercel shows (e.g. `cname.vercel-dns.com`).
- **Nameservers**: Leave at GoDaddy unless you move DNS to Vercel (not required for this setup).

---

## If it doesn’t work

1. **Double-check** the Values in GoDaddy match **exactly** what Vercel shows (no extra spaces, correct type).
2. **Clear cache**: try in an incognito window or another device/network.
3. **Propagation**: use [whatsmydns.net](https://www.whatsmydns.net) for frvg.net; wait until it shows the new A/CNAME.
4. **Vercel status**: Domains page should show the domain as verified (green/checkmark).

After DNS is correct and BASE_URL is set, your site and auth links will use **frvg.net**.
