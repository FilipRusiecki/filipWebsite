/**
 * Temporary debug endpoint to check auth/DB status.
 * Open: https://filip-website.vercel.app/api/authDebug
 * Remove or restrict this in production once login works.
 */
import { db } from 'src/lib/db'

export const handler = async () => {
  const out = {
    DATABASE_URL_set: !!process.env.DATABASE_URL,
    SESSION_SECRET_set: !!process.env.SESSION_SECRET,
    db_reachable: null,
    admin_user_exists: null,
    message: '',
  }

  try {
    await db.$queryRaw`SELECT 1`
    out.db_reachable = true
  } catch (e) {
    out.db_reachable = false
    out.message = `DB error: ${e?.message || String(e)}`
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(out, null, 2),
    }
  }

  try {
    const admin = await db.user.findFirst({
      where: { role: 'admin' },
      select: { id: true, email: true, emailVerified: true, role: true },
    })
    out.admin_user_exists = !!admin
    if (admin) {
      out.admin_email = admin.email
      out.admin_verified = admin.emailVerified
    }
  } catch (e) {
    out.admin_user_exists = false
    out.message = (out.message ? out.message + '; ' : '') + `User lookup: ${e?.message || String(e)}`
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(out, null, 2),
  }
}
