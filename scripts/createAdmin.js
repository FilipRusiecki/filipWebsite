/**
 * Script to create an admin user
 * Run with: yarn rw exec createAdmin
 *
 * Usage:
 *   yarn rw exec createAdmin --email admin@example.com --password YourSecurePassword
 */

import { db } from '../api/src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

// Uses dbAuth's scrypt-based hashPassword so login works in production

export default async (args) => {
  // Parse command line arguments from process.argv
  // RedwoodJS exec passes remaining args after the script name
  const argv = process.argv.slice(2) // Skip 'node' and script path

  let email = null
  let password = null

  // Parse --email and --password flags
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--email' && argv[i + 1]) {
      email = argv[i + 1]
      i++ // Skip the next argument as we've consumed it
    } else if (argv[i] === '--password' && argv[i + 1]) {
      password = argv[i + 1]
      i++ // Skip the next argument as we've consumed it
    }
  }

  // Also check if passed as function argument (for compatibility)
  if (!email && args?.email) {
    email = args.email
  }
  if (!password && args?.password) {
    password = args.password
  }

  if (!email || !password) {
    console.error('Usage: yarn rw exec createAdmin --email admin@example.com --password YourSecurePassword')
    console.error('')
    console.error('Received arguments:', { email, password: password ? '***' : null, argv, args })
    process.exit(1)
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log(`User with email ${email} already exists.`)
    process.exit(0)
  }

  // Hash password using dbAuth's scrypt (must match api auth)
  const [hashedPassword, salt] = hashPassword(password)

  // Create user with email verified (admin accounts are trusted)
  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      salt,
      role: 'admin',
      emailVerified: true, // Admin accounts are pre-verified
    },
  })

  console.log(`✅ Admin user created successfully!`)
  console.log(`   Email: ${user.email}`)
  console.log(`   Role: ${user.role}`)
  console.log(`   ID: ${user.id}`)
}
