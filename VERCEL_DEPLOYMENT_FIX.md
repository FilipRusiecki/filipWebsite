# Vercel Deployment Fix - 405 Method Not Allowed

## Issue
Getting `405 Method Not Allowed` error when trying to login on Vercel deployment.

## Root Cause
The `apiUrl` in `redwood.toml` was set to `/.redwood/functions` (local development path) instead of `/api` (Vercel production path).

## Solution Applied

### 1. Updated Redwood Configuration
Ran `yarn rw setup deploy vercel` which:
- Changed `apiUrl` from `/.redwood/functions` to `/api` in `redwood.toml`
- Created `vercel.json` with proper build configuration

### 2. Added CORS Handling
Added OPTIONS request handling in `api/src/functions/auth.js` to support CORS preflight requests.

### 3. Updated Verify Email Path
Updated `VerifyEmailPage` to use the correct API path based on environment.

## Next Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Fix Vercel deployment: Update API URL and add CORS support"
git push
```

### 2. Redeploy on Vercel
- Vercel will automatically redeploy when you push
- Or manually trigger a redeploy from Vercel dashboard

### 3. Verify Environment Variables
Ensure these are set in Vercel project settings:
- `SESSION_SECRET` - Required
- `BASE_URL` - Your Vercel domain (e.g., `https://filip-website.vercel.app`)
- `DATABASE_URL` - Your production database URL
- `RESEND_API_KEY` - Optional, for email functionality
- `EMAIL_FROM` - Optional, for email functionality

### 4. Test Login
After redeployment:
1. Go to `https://your-domain.vercel.app/admin/login`
2. Try logging in with your admin credentials
3. Should work without 405 error

## Important Notes

- **Local Development**: Still uses `/.redwood/functions` path
- **Vercel Production**: Uses `/api` path
- The `apiUrl` change is environment-aware and handled automatically by RedwoodJS

## If Issues Persist

1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Check logs for any errors

2. **Verify Function Deployment**:
   - Check that `api/src/functions/auth.js` is being deployed
   - Should appear as `/api/auth` in Vercel functions list

3. **Check Database Connection**:
   - Ensure `DATABASE_URL` is set correctly
   - Database should be accessible from Vercel's serverless functions

4. **Clear Browser Cache**:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Or clear browser cache completely

## Files Modified

- `redwood.toml` - Changed `apiUrl` to `/api`
- `vercel.json` - Created with build configuration
- `api/src/functions/auth.js` - Added CORS OPTIONS handling
- `web/src/pages/VerifyEmailPage/VerifyEmailPage.jsx` - Updated API path
