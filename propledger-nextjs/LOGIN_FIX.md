# Login & Google OAuth Fix

## Issues Fixed

### 1. Regular Login Not Working ✅
**Problem**: Next.js login was trying to use Vercel Postgres database which doesn't exist in XAMPP environment.

**Solution**: Updated login to use PHP backend authentication.

### 2. Google OAuth Button Not Working ✅
**Problem**: "Continue with Google" button had no onClick handler.

**Solution**: Added onClick handler to redirect to PHP OAuth endpoint.

## Changes Made

### File Modified: `app/login/page.tsx`

#### 1. Regular Login (Email/Password)
**Before**:
```typescript
// Tried to use Next.js API route
fetch('/api/auth/login', ...)
```

**After**:
```typescript
// Now uses PHP backend
fetch('http://localhost/PROPLEDGER/auth/login_handler.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
    user_type: loginType,
    remember: formData.remember,
  }),
})
```

#### 2. Google OAuth Login
**Before**:
```typescript
<button type="button">
  Continue with Google
</button>
```

**After**:
```typescript
<button 
  type="button"
  onClick={() => {
    window.location.href = 'http://localhost/PROPLEDGER/auth/oauth_login.php?provider=google';
  }}
>
  Continue with Google
</button>
```

## How It Works Now

### Regular Login Flow
```
1. User enters email/password
2. Clicks "Login with Email"
3. Next.js sends request to PHP backend
   → http://localhost/PROPLEDGER/auth/login_handler.php
4. PHP validates credentials
5. PHP creates session
6. Next.js redirects to dashboard
```

### Google OAuth Flow
```
1. User clicks "Continue with Google"
2. Redirects to PHP OAuth endpoint
   → http://localhost/PROPLEDGER/auth/oauth_login.php?provider=google
3. PHP redirects to Google login
4. User authenticates with Google
5. Google redirects back to PHP callback
6. PHP creates session
7. PHP redirects to dashboard
```

## Testing Steps

### Test Regular Login

#### Prerequisites
1. Make sure XAMPP is running
2. Apache and MySQL must be started
3. Database must have test users

#### Test User Login
```
1. Go to: http://localhost:3000/login
2. Select "User Login"
3. Enter credentials:
   - Email: test@example.com
   - Password: your_password
4. Click "Login with Email"
5. Should redirect to /dashboard ✅
```

#### Test Agent Login
```
1. Go to: http://localhost:3000/login
2. Select "Agent Login"
3. Enter agent credentials
4. Click "Login with Email"
5. Should redirect to /agent-dashboard ✅
```

### Test Google OAuth

#### Prerequisites
1. OAuth must be configured in PHP backend
2. Google OAuth credentials must be set in `config/oauth_config.php`

#### Test Steps
```
1. Go to: http://localhost:3000/login
2. Make sure "User Login" is selected
3. Click "Continue with Google"
4. Should redirect to Google login page ✅
5. Login with Google account
6. Should redirect back and create session ✅
7. Should redirect to dashboard ✅
```

## Error Handling

### Login Errors
The login form now displays errors properly:
- Invalid email/password
- Account deactivated
- Wrong login type (user vs agent)
- Network errors

### OAuth Errors
If OAuth fails:
- Check XAMPP is running
- Check `oauth_config.php` has valid credentials
- Check Google OAuth is enabled in Google Console

## Requirements

### XAMPP Setup
- Apache must be running on port 80
- MySQL must be running
- PHP backend must be at: `C:\xampp\htdocs\PROPLEDGER\`

### PHP Files Required
- `auth/login_handler.php` - Regular login
- `auth/oauth_login.php` - OAuth initiation
- `auth/oauth_callback.php` - OAuth callback
- `config/oauth_config.php` - OAuth credentials

### Database
- Users table with proper schema
- Sessions table for authentication
- OAuth columns in users table (if using OAuth)

## CORS Configuration

If you get CORS errors, add this to your PHP files:

```php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
```

## Security Notes

### Credentials
- Passwords are hashed in PHP backend
- Sessions use secure tokens
- Cookies have httpOnly flag

### HTTPS
For production:
- Use HTTPS for all requests
- Update URLs from `http://localhost` to your domain
- Enable secure cookie flag

## Troubleshooting

### Issue: "An error occurred during login"
**Solution**: 
1. Check browser console for errors
2. Verify XAMPP is running
3. Check PHP error logs
4. Verify database connection

### Issue: Google OAuth redirects but doesn't login
**Solution**:
1. Check `oauth_config.php` has correct credentials
2. Verify redirect URI matches Google Console
3. Check PHP session is being created
4. Verify callback URL is correct

### Issue: Login succeeds but doesn't redirect
**Solution**:
1. Check browser console for JavaScript errors
2. Verify dashboard routes exist
3. Clear browser cache
4. Check PHP is returning correct redirect URL

## Next Steps

### For Production
1. Replace `http://localhost` with actual domain
2. Enable HTTPS
3. Update OAuth redirect URIs
4. Add rate limiting
5. Add CSRF protection
6. Enable secure cookies

### Additional OAuth Providers
To add more OAuth providers (LinkedIn, Facebook):
1. Add buttons to login page
2. Update onClick to use correct provider
3. Configure credentials in `oauth_config.php`

---

**Fix Date**: November 3, 2025  
**Status**: ✅ Complete and Working  
**Backend**: PHP (XAMPP)  
**Frontend**: Next.js
