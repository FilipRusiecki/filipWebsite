/**
 * Script to check if a user exists
 * Run with: yarn rw exec checkUser --email user@example.com
 */

import { db } from '../api/src/lib/db'

export default async (args) => {
  const argv = process.argv.slice(2)

  let email = null
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--email' && argv[i + 1]) {
      email = argv[i + 1]
      i++
    }
  }

  if (!email) {
    console.error('Usage: yarn rw exec checkUser --email user@example.com')
    process.exit(1)
  }

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  if (user) {
    console.log('✅ User found:')
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Role: ${user.role}`)
    console.log(`   Created: ${user.createdAt}`)
  } else {
    console.log('❌ User not found')
    console.log(`   Email: ${email}`)
    console.log('\n💡 To create this user, run:')
    console.log(`   yarn rw exec createAdmin --email ${email} --password YourPassword`)
  }
}
