# Authentication & Authorization Setup Guide

This document describes the complete authentication and authorization system implemented for the application.

## Overview

The application uses **dbAuth** (RedwoodJS's built-in database-backed authentication) with:
- Email verification for all new user registrations
- Role-based access control (ADMIN and USER roles)
- Secure admin account creation (admin accounts cannot be created via public signup)
- Production-ready email delivery via Resend
- Vercel serverless function compatibility

## Security Features

### 1. Role-Based Access Control

**Roles:**
- `admin`: Full access to admin dashboard, can view all tickets, respond to tickets, update ticket status
- `user`: Regular users (currently no user-specific features, but role is enforced)

**Admin Access:**
- Admin routes are protected at multiple levels:
  - GraphQL SDL directives (`@requireAuth(roles: ["admin"])`)
  - Service-level authorization checks
  - Route-level protection (`PrivateSet` with `role="admin"`)

**User Access:**
- Users cannot access admin routes or APIs
- Users cannot view tickets they don't own
- Public ticket creation is allowed (anonymous tickets)

### 2. Email Verification

**Requirements:**
- All new user registrations require email verification
- Users cannot log in until their email is verified
- Verification tokens expire after 24 hours
- Admin accounts are pre-verified (created via script)

**Verification Flow:**
1. User signs up → receives verification email
2. User clicks verification link → email is verified
3. User can now log in

### 3. Admin Account Security

**Admin Account Creation:**
- Admin accounts **cannot** be created through public signup
- Only the `createAdmin` script can create admin accounts
- Public signup always creates accounts with `role: "user"`

**Creating an Admin Account:**
```bash
yarn rw exec createAdmin --email admin@example.com --password YourSecurePassword
```

## Viewing users and the database

There is no in-app "user list" or database UI. Use one of these:

### 1. List users in the terminal

Uses the database from your `.env` (`DATABASE_URL`). To see **production** users, point `.env` at your production DB (or run with `DATABASE_URL=... yarn rw exec listUsers`).

```bash
yarn rw exec listUsers
```

Shows all users with email, role, and email-verified status.

### 2. Prisma Studio (browse all tables)

Opens a local UI to browse and edit data. It uses `DATABASE_URL` from `.env`, so use your **production** URL in `.env` if you want to see production data.

```bash
yarn rw prisma studio
```

Opens in the browser (default http://localhost:5555). Open the **User** table to see users; use **Ticket**, **Reply**, etc. for other data.

### 3. Prisma Data Platform / Prisma Cloud

If your project uses [Prisma Data Platform](https://prisma.io/data-platform) or Prisma Cloud, the project dashboard has **Studio** in the sidebar. Use it to open your database and the **User** table.

### 4. Resetting an admin password (for production login)

Passwords are hashed with dbAuth’s scrypt. To fix a 400 on production login, set the password **against the production DB**:

1. In `.env`, set `DATABASE_URL` to your **production** Postgres URL (or run the command with that URL in the environment).
2. Run:
   ```bash
   yarn rw exec manageUser --set-password your-admin@email.com YourNewPassword
   ```
3. Log in on the live site with that **exact** password.

## Environment Variables

### Required Variables

Add these to your `.env` file:

```bash
# Session secret for dbAuth (required)
SESSION_SECRET=your-secret-here

# Base URL of your application (for email links)
# In production, set this to your actual domain
BASE_URL=http://localhost:8910

# Email service configuration (Resend)
# Get your API key from https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email sender address (must be verified in Resend)
EMAIL_FROM=noreply@yourdomain.com
```

### Generating SESSION_SECRET

If you need to generate a new session secret:

```bash
yarn rw g secret
```

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use their test domain
3. Get your API key from the dashboard
4. Add `RESEND_API_KEY` to your `.env` file
5. Set `EMAIL_FROM` to a verified email address

**Note:** In development, if `RESEND_API_KEY` is not set, emails will be logged to the console instead of being sent.

## Database Schema

### User Model

```prisma
model User {
  id                        Int       @id @default(autoincrement())
  email                     String    @unique
  hashedPassword            String
  salt                      String
  resetToken                String?
  resetTokenExpiresAt       DateTime?
  role                      String    @default("user") // "admin" or "user"
  emailVerified             Boolean   @default(false)
  verificationToken         String?
  verificationTokenExpiresAt DateTime?
  createdAt                 DateTime  @default(now())
  updatedAt                 DateTime  @updatedAt
  tickets                   Ticket[]  // Tickets created by this user
}
```

### Ticket Model

```prisma
model Ticket {
  id                Int       @id @default(autoincrement())
  title             String
  description       String
  email             String?   // Email for anonymous tickets
  userId            Int?      // User ID if ticket was created by logged-in user
  user              User?     @relation(fields: [userId], references: [id])
  // ... other fields
}
```

## Authentication Flow

### User Registration

1. User submits registration form (if implemented)
2. `signup` handler in `api/src/functions/auth.js`:
   - Creates user with `role: "user"` (never "admin")
   - Generates verification token
   - Sends verification email
   - Returns user (but `allowUnverifiedLogin: false` prevents login)

3. User receives email with verification link
4. User clicks link → `verifyEmail` function verifies email
5. User can now log in

### User Login

1. User submits credentials
2. `login` handler in `api/src/functions/auth.js`:
   - Verifies email is verified (throws error if not)
   - Returns user data with role
3. Session cookie is set
4. User is redirected to appropriate page

### Admin Login

- Same flow as user login
- Admin accounts are pre-verified
- After login, admin is redirected to `/admin/dashboard`

## API Endpoints

### Authentication Endpoints

- `POST /.redwood/functions/auth` - Login, signup, logout, password reset
- `GET /.redwood/functions/verifyEmail?token=...` - Verify email address

### Protected Endpoints

All admin endpoints require authentication and admin role:

- `GET /graphql` (tickets query) - `@requireAuth(roles: ["admin"])`
- `POST /graphql` (updateTicketStatus, adminReply) - `@requireAuth(roles: ["admin"])`

## Frontend Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected, requires admin role)
- `/verify-email` - Email verification page
- `/support` - Public support page (ticket creation)

## Service-Level Authorization

All ticket services include authorization checks:

```javascript
// Example from tickets.js
export const tickets = () => {
  const currentUser = requireAuth({ roles: ['admin'] })
  // ... rest of function
}
```

This provides **defense in depth** - even if GraphQL directives are bypassed, service-level checks prevent unauthorized access.

## Email Templates

Email templates are defined in `api/src/lib/email.js`:
- Verification email: HTML and plain text versions
- Password reset email: HTML and plain text versions

Templates can be customized by editing the `sendVerificationEmail` and `sendPasswordResetEmail` functions.

## Vercel Deployment

### Environment Variables

Set these in your Vercel project settings:

1. `SESSION_SECRET` - Generate using `yarn rw g secret`
2. `BASE_URL` - Your production domain (e.g., `https://yoursite.com`)
3. `RESEND_API_KEY` - Your Resend API key
4. `EMAIL_FROM` - Verified email address in Resend
5. `DATABASE_URL` - Your production database URL

### Database

For production, you'll need to:
1. Set up a production database (PostgreSQL recommended for Vercel)
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations: `yarn rw prisma migrate deploy`

### Serverless Functions

All functions are compatible with Vercel's serverless environment:
- No filesystem dependencies
- Stateless design
- Environment variable configuration

## Troubleshooting

### Email Not Sending

1. Check `RESEND_API_KEY` is set correctly
2. Verify `EMAIL_FROM` is a verified domain/email in Resend
3. Check server logs for error messages
4. In development, emails are logged to console if `RESEND_API_KEY` is not set

### Cannot Login After Registration

1. Check email was sent (check spam folder)
2. Verify email was clicked and verification completed
3. Check `emailVerified` field in database
4. Try requesting a new verification email (if implemented)

### Admin Access Denied

1. Verify user has `role: "admin"` in database
2. Check user's `emailVerified` is `true`
3. Clear browser cookies and try again
4. Check server logs for authorization errors

### Database Migration Issues

If you encounter migration errors:

```bash
# Reset database (WARNING: deletes all data)
yarn rw prisma migrate reset

# Or apply migrations manually
yarn rw prisma migrate deploy
```

## Security Best Practices

1. **Never commit `.env` file** - Contains sensitive secrets
2. **Use strong passwords** - For admin accounts and SESSION_SECRET
3. **Rotate secrets regularly** - Especially in production
4. **Monitor failed login attempts** - Consider adding rate limiting
5. **Keep dependencies updated** - Run `yarn upgrade` regularly
6. **Use HTTPS in production** - Required for secure cookies

## Future Enhancements

Potential improvements:
- User registration page (currently signup is disabled)
- Password reset flow UI
- Resend verification email functionality
- User profile page
- User can view their own tickets
- Rate limiting for login attempts
- Two-factor authentication (2FA)
- Session management (view active sessions, logout all devices)

## Support

For issues or questions:
1. Check RedwoodJS documentation: https://redwoodjs.com/docs
2. Check dbAuth documentation: https://redwoodjs.com/docs/authentication
3. Review server logs for error messages
4. Check database state using Prisma Studio: `yarn rw prisma studio`
