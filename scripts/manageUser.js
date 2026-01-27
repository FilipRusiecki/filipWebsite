/**
 * Script to manage users (verify email, delete user, set password).
 * Uses the same DB as your .env DATABASE_URL (use prod URL to fix prod login).
 *
 * Usage:
 *   yarn rw exec manageUser --verify-email user@example.com
 *   yarn rw exec manageUser --delete-email user@example.com
 *   yarn rw exec manageUser --set-password user@example.com NewPassword123
 */

import { db } from '../api/src/lib/db'
import crypto from 'crypto'

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return { hashedPassword: hash, salt }
}

export default async () => {
  const argv = process.argv.slice(2)

  let action = null
  let email = null
  let password = null

  // Parse arguments
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--verify-email' && argv[i + 1]) {
      action = 'verify'
      email = argv[i + 1]
      i++
    } else if (argv[i] === '--delete-email' && argv[i + 1]) {
      action = 'delete'
      email = argv[i + 1]
      i++
    } else if (argv[i] === '--set-password' && argv[i + 1] && argv[i + 2]) {
      action = 'setpassword'
      email = argv[i + 1]
      password = argv[i + 2]
      i += 2
    }
  }

  if (!action || !email) {
    console.error('Usage:')
    console.error('  yarn rw exec manageUser --verify-email user@example.com')
    console.error('  yarn rw exec manageUser --delete-email user@example.com')
    console.error('  yarn rw exec manageUser --set-password user@example.com NewPassword123')
    process.exit(1)
  }

  if (action === 'setpassword' && !password) {
    console.error('--set-password requires email and password')
    process.exit(1)
  }

  try {
    // Find the user
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.error(`❌ User not found: ${email}`)
      process.exit(1)
    }

    if (action === 'verify') {
      // Verify the user's email
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          verificationToken: null,
          verificationTokenExpiresAt: null,
        },
      })

      console.log(`✅ Email verified for user:`)
      console.log(`   Email: ${updatedUser.email}`)
      console.log(`   Role: ${updatedUser.role}`)
      console.log(`   Email Verified: ${updatedUser.emailVerified ? 'Yes' : 'No'}`)
      console.log(`\n💡 User can now log in!`)
    } else if (action === 'setpassword') {
      const { hashedPassword, salt } = hashPassword(password)
      await db.user.update({
        where: { id: user.id },
        data: { hashedPassword, salt },
      })
      console.log(`✅ Password updated for user:`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`\n💡 Log in with this email and your new password.`)
    } else if (action === 'delete') {
      // Delete the user
      await db.user.delete({
        where: { id: user.id },
      })

      console.log(`✅ User deleted successfully:`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   ID: ${user.id}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}
