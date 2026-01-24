/**
 * Email service for sending verification and password reset emails
 * Uses Resend API for production-ready email delivery
 * Compatible with Vercel serverless functions
 */

/**
 * Send email verification email
 * @param {string} email - Recipient email address
 * @param {string} verificationToken - Token for email verification
 * @param {string} baseUrl - Base URL of the application (e.g., https://yoursite.com)
 */
export const sendVerificationEmail = async (email, verificationToken, baseUrl) => {
  // If no email service is configured, log to console (for development)
  if (!process.env.RESEND_API_KEY) {
    console.log('📧 [DEV] Verification email would be sent to:', email)
    console.log('📧 [DEV] Verification link:', `${baseUrl}/verify-email?token=${verificationToken}`)
    return { success: true, dev: true }
  }

  try {
    const { Resend } = await import('resend')
    const resendClient = new Resend(process.env.RESEND_API_KEY)

    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`

    const { data, error } = await resendClient.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: email,
      subject: 'Verify your email address',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Verify Your Email</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Verify Email</a>
              </div>
              <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 12px; color: #667eea; word-break: break-all;">${verificationUrl}</p>
              <p style="font-size: 12px; color: #666; margin-top: 30px;">This link will expire in 24 hours.</p>
            </div>
          </body>
        </html>
      `,
      text: `Thank you for registering! Please verify your email address by visiting: ${verificationUrl}\n\nThis link will expire in 24 hours.`,
    })

    if (error) {
      console.error('❌ Error sending verification email:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('❌ Failed to send verification email:', error)
    throw error
  }
}

/**
 * Send password reset email
 * @param {string} email - Recipient email address
 * @param {string} resetToken - Token for password reset
 * @param {string} baseUrl - Base URL of the application
 */
export const sendPasswordResetEmail = async (email, resetToken, baseUrl) => {
  // If no email service is configured, log to console (for development)
  if (!process.env.RESEND_API_KEY) {
    console.log('📧 [DEV] Password reset email would be sent to:', email)
    console.log('📧 [DEV] Reset link:', `${baseUrl}/reset-password?resetToken=${resetToken}`)
    return { success: true, dev: true }
  }

  try {
    const { Resend } = await import('resend')
    const resendClient = new Resend(process.env.RESEND_API_KEY)

    const resetUrl = `${baseUrl}/reset-password?resetToken=${resetToken}`

    const { data, error } = await resendClient.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: email,
      subject: 'Reset your password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Reset Your Password</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>You requested to reset your password. Click the button below to reset it:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
              </div>
              <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 12px; color: #667eea; word-break: break-all;">${resetUrl}</p>
              <p style="font-size: 12px; color: #666; margin-top: 30px;">This link will expire in 24 hours.</p>
              <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email.</p>
            </div>
          </body>
        </html>
      `,
      text: `You requested to reset your password. Visit: ${resetUrl}\n\nThis link will expire in 24 hours.\n\nIf you didn't request this, please ignore this email.`,
    })

    if (error) {
      console.error('❌ Error sending password reset email:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error)
    throw error
  }
}
