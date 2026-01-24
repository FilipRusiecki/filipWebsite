import { db } from 'src/lib/db'

/**
 * Verify user email address using verification token
 * GET /verify-email?token=...
 */
export const handler = async (event) => {
  try {
    // Get token from query string
    const token = event.queryStringParameters?.token

    if (!token) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Verification token is required',
        }),
      }
    }

    // Find user with this verification token
    const user = await db.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiresAt: {
          gt: new Date(), // Token must not be expired
        },
      },
    })

    if (!user) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Invalid or expired verification token',
        }),
      }
    }

    // Verify the email
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    })

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Email verified successfully',
      }),
    }
  } catch (error) {
    console.error('Email verification error:', error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to verify email',
        message: error.message,
      }),
    }
  }
}
