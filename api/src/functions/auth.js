import { db } from 'src/lib/db'
import { DbAuthHandler } from '@redwoodjs/auth-dbauth-api'
import crypto from 'crypto'
import { sendVerificationEmail, sendPasswordResetEmail } from 'src/lib/email'

export const handler = async (event, context) => {
  // Handle CORS preflight requests (OPTIONS)
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    }
  }

  try {
    // Verify SESSION_SECRET is set
    if (!process.env.SESSION_SECRET) {
      console.error('❌ SESSION_SECRET is not set in environment variables!')
      console.error('   Make sure .env file exists and contains SESSION_SECRET=...')
      throw new Error('SESSION_SECRET environment variable is required for dbAuth')
    }

    // Get base URL from environment or construct from request
    const getBaseUrl = () => {
      if (process.env.BASE_URL) {
        return process.env.BASE_URL
      }
      // Try to construct from request headers (for development)
      if (event?.headers?.host) {
        const protocol = event.headers['x-forwarded-proto'] || 'http'
        return `${protocol}://${event.headers.host}`
      }
      return 'http://localhost:8910'
    }

    const forgotPasswordOptions = {
      // handler() is invoked after verifying that a user was found with the given
      // username. This is where you can send the user an email with a link to
      // reset their password.
      handler: async (user, _session) => {
        try {
          const baseUrl = getBaseUrl()
          await sendPasswordResetEmail(user.email, user.resetToken, baseUrl)
        } catch (error) {
          console.error('Failed to send password reset email:', error)
          // Don't throw - password reset token is still set, user can check email manually
        }
        return user
      },
      // How long the resetToken is valid for, in milliseconds (default is 24 hours)
      expires: 60 * 60 * 24 * 1000,
    }

  const loginOptions = {
    // handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they're
    // suspended, or maybe they haven't verified their email yet), throw an error and
    // it will be returned by the `logIn()` function from `useAuth()`.
    handler: (user) => {
      // Check if email is verified (required for all users)
      if (!user.emailVerified) {
        throw new Error('Please verify your email address before logging in. Check your inbox for the verification email.')
      }

      // Return user with role included so it's available in getUserMetadata
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    },
    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Username ${username} not found',
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if a username is registered.
      incorrectPassword: 'Incorrect password for ${username}',
    },
    expires: 60 * 60 * 24 * 7 * 1000, // 7 days
  }

  const signupOptions = {
    // Whatever you return from this will be returned by the `signUp()` function
    // that is destructured from `useAuth()`
    handler: async ({ username, hashedPassword, salt, userAttributes }) => {
      // SECURITY: Prevent admin role creation via public signup
      // Only the createAdmin script should be able to create admin users
      const role = userAttributes?.role
      if (role === 'admin') {
        throw new Error('Cannot create admin account through public registration')
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex')
      const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Create user with "user" role (never "admin" from public signup)
      const user = await db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt,
          role: 'user', // Always "user" for public signups
          emailVerified: false,
          verificationToken: verificationToken,
          verificationTokenExpiresAt: verificationTokenExpiresAt,
        },
      })

      // Send verification email
      try {
        const baseUrl = getBaseUrl()
        await sendVerificationEmail(username, verificationToken, baseUrl)
      } catch (error) {
        console.error('Failed to send verification email:', error)
        // Don't throw - user is created, they can request a new verification email
      }

      return user
    },
    // Users must verify email before logging in
    allowUnverifiedLogin: false,
    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: 'Username `${username}` already in use',
    },
  }

  // DbAuthHandler should now be available from @redwoodjs/auth-dbauth-api

  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,
    // The name of the property you'd call on `db` to access your user table.
    // i.e. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',
    // A list of fields on your user model that are used as credentials
    // to login. These fields will be checked when logging in.
    // i.e. `['email', 'username']` would allow logging in with either email or username.
    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
      emailVerified: 'emailVerified',
      verificationToken: 'verificationToken',
      verificationTokenExpiresAt: 'verificationTokenExpiresAt',
    },

    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    signup: signupOptions,
  })

    const result = await authHandler.invoke()
    return result
  } catch (error) {
    console.error('🚨 Auth handler error:', error)
    console.error('Error stack:', error.stack)
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      code: error.code,
    })

    // Return proper RedwoodJS function response format
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Authentication error',
        message: error.message || 'An unexpected error occurred',
      }),
    }
  }
}
