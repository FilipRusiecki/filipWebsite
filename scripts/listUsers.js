/**
 * Script to list all users in the database
 * Run with: yarn rw exec listUsers
 */

import { db } from '../api/src/lib/db'

export default async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (users.length === 0) {
      console.log('❌ No users found in database.')
      console.log('\n💡 To create an admin user, run:')
      console.log('   yarn rw exec createAdmin --email admin@example.com --password YourSecurePassword')
      return
    }

    console.log(`\n📋 Found ${users.length} user(s):\n`)
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. User #${user.id}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Email Verified: ${user.emailVerified ? '✅ Yes' : '❌ No'}`)
      console.log(`   Created: ${user.createdAt.toLocaleString()}`)
      console.log('')
    })

    const adminUsers = users.filter(u => u.role === 'admin')
    if (adminUsers.length > 0) {
      console.log(`\n👑 Admin users (${adminUsers.length}):`)
      adminUsers.forEach(user => {
        console.log(`   - ${user.email} ${user.emailVerified ? '(verified)' : '(NOT verified - cannot login)'}`)
      })
    }

    const regularUsers = users.filter(u => u.role === 'user')
    if (regularUsers.length > 0) {
      console.log(`\n👤 Regular users (${regularUsers.length}):`)
      regularUsers.forEach(user => {
        console.log(`   - ${user.email} ${user.emailVerified ? '(verified)' : '(NOT verified - cannot login)'}`)
      })
    }
  } catch (error) {
    console.error('❌ Error listing users:', error)
    process.exit(1)
  }
}
