/**
 * Script to manage users (verify email, delete user, etc.)
 * 
 * Usage:
 *   yarn rw exec manageUser --verify-email user@example.com
 *   yarn rw exec manageUser --delete-email user@example.com
 */

import { db } from '../api/src/lib/db'

export default async () => {
  const argv = process.argv.slice(2)

  let action = null
  let email = null

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
    }
  }

  if (!action || !email) {
    console.error('Usage:')
    console.error('  yarn rw exec manageUser --verify-email user@example.com')
    console.error('  yarn rw exec manageUser --delete-email user@example.com')
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
