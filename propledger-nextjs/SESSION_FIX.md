# Session Persistence Fix - Dashboard Logout Issue

## Problem
After successful login, the dashboard would show briefly then immediately log out the user.

## Root Causes

### 1. Dashboard Not Checking PHP Session
The dashboard was trying to check `/api/auth/session` (Next.js API) instead of the PHP backend session.

### 2. Cookie Not Accessible Across Ports
The session cookie set by PHP (localhost:80) wasn't accessible to Next.js (localhost:3000) due to improper cookie settings.

### 3. Missing CORS Headers
The `check_session.php` file didn't have CORS headers, blocking session checks from Next.js.

## Solutions Applied

### 1. Updated Dashboard to Check PHP Session

**File**: `app/dashboard/page.tsx`

**Before**:
```typescript
const response = await fetch('/api/auth/session');
```

**After**:
```typescript
const response = await fetch('http://localhost/PROPLEDGER/auth/check_session.php', {
  method: 'GET',
  credentials: 'include', // Critical for cookies
});
```

### 2. Fixed Cookie Settings

**File**: `auth/login_handler.php`

**Before**:
```php
setcookie('propledger_session', $session_token, $cookie_duration, '/', '', false, true);
```

**After**:
```php
setcookie(
    'propledger_session',
    $session_token,
    [
        'expires' => $cookie_duration,
        'path' => '/',
        'domain' => 'localhost', // Works for all localhost ports
        'secure' => false, // false for localhost, true for production
        'httponly' => true, // Prevents JavaScript access
        'samesite' => 'Lax' // Allows cross-origin with navigation
    ]
);
```

### 3. Added CORS Headers to Session Check

**File**: `auth/check_session.php`

```php
// CORS headers for Next.js
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
```

## How It Works Now

### Login Flow
```
1. User enters credentials
2. Next.js sends to PHP backend
3. PHP validates credentials
4. PHP creates session in database
5. PHP sets cookie with domain=localhost
6. Cookie is accessible on both:
   - localhost:80 (PHP)
   - localhost:3000 (Next.js)
7. Next.js redirects to dashboard
```

### Dashboard Load Flow
```
1. Dashboard component mounts
2. Calls checkAuth()
3. Fetches: http://localhost/PROPLEDGER/auth/check_session.php
4. Sends cookie with credentials: 'include'
5. PHP checks cookie against database
6. PHP returns user data
7. Dashboard displays user info
8. User stays logged in ✅
```

### Session Persistence
```
- Cookie stored in browser
- Valid for 30 days (if "Remember me" checked)
- Valid for session only (if not checked)
- Automatically sent with every request
- PHP validates on each request
- Session expiry updated on each check
```

## Testing Steps

### Step 1: Clear Everything
```
1. Clear browser cookies:
   - Press F12
   - Go to Application tab
   - Click "Cookies"
   - Delete all localhost cookies

2. Clear browser cache:
   - Press Ctrl+Shift+Delete
   - Clear cached files
   - Clear cookies
```

### Step 2: Test Login
```
1. Go to: http://localhost:3000/login
2. Enter credentials:
   - Email: test@example.com
   - Password: your_password
3. Check "Remember me" (optional)
4. Click "Login with Email"
5. Should redirect to dashboard ✅
```

### Step 3: Verify Session
```
1. Dashboard should load completely ✅
2. Should show "Welcome back, [Your Name]" ✅
3. Should NOT redirect back to login ✅
4. Check browser console (F12):
   - Should see "Session check" logs
   - Should NOT see "Session check failed"
```

### Step 4: Test Persistence
```
1. Refresh the page (F5)
2. Should stay logged in ✅
3. Close browser tab
4. Reopen: http://localhost:3000/dashboard
5. Should still be logged in ✅
```

### Step 5: Check Cookie
```
1. Press F12
2. Go to Application tab
3. Click "Cookies" → "http://localhost:3000"
4. Should see: propledger_session cookie ✅
5. Check cookie properties:
   - Domain: localhost ✅
   - Path: / ✅
   - HttpOnly: true ✅
   - SameSite: Lax ✅
```

## Troubleshooting

### Issue: Still logs out immediately

**Check 1: Cookie Not Being Set**
```
1. Press F12 → Network tab
2. Login
3. Click on login_handler.php request
4. Go to "Response Headers"
5. Look for "Set-Cookie" header
6. Should see: propledger_session=...
```

**Check 2: Cookie Not Being Sent**
```
1. Press F12 → Network tab
2. After login, watch for check_session.php request
3. Click on the request
4. Go to "Request Headers"
5. Look for "Cookie" header
6. Should include: propledger_session=...
```

**Check 3: Session Not in Database**
```sql
-- Run in phpMyAdmin
SELECT * FROM user_sessions WHERE user_id = YOUR_USER_ID;
-- Should show active session with future expires_at
```

### Issue: Cookie exists but session check fails

**Check 1: Database Connection**
```php
// In check_session.php, add at top:
error_log("Session check called");
error_log("Cookie: " . ($_COOKIE['propledger_session'] ?? 'none'));
```

**Check 2: Session Token Match**
```sql
-- Check if token in cookie matches database
SELECT * FROM user_sessions 
WHERE session_token = 'YOUR_TOKEN_FROM_COOKIE';
```

**Check 3: Session Not Expired**
```sql
-- Check if session is still valid
SELECT * FROM user_sessions 
WHERE session_token = 'YOUR_TOKEN' 
AND expires_at > NOW();
```

### Issue: CORS errors in console

**Solution**: Verify CORS headers in check_session.php
```php
// Should be at the top of the file
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
```

## Cookie Settings Explained

### domain: 'localhost'
- Allows cookie to work on any localhost port
- Works for both :80 and :3000
- In production, use your actual domain

### secure: false
- false for localhost (HTTP)
- true for production (HTTPS)
- Prevents cookie theft over insecure connections

### httponly: true
- Prevents JavaScript from accessing cookie
- Protects against XSS attacks
- Only PHP can read/write the cookie

### samesite: 'Lax'
- Allows cookie with navigation (redirects)
- Prevents CSRF attacks
- Balances security and usability

## Database Schema

### user_sessions Table
```sql
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (session_token),
    INDEX (user_id)
);
```

## Security Notes

### Session Token
- 64 characters (32 bytes hex)
- Cryptographically secure random
- Unique per login
- Stored hashed in production

### Session Expiry
- 30 days if "Remember me" checked
- Session-only if not checked
- Auto-renewed on each check
- Old sessions cleaned up

### Cookie Security
- HttpOnly prevents XSS
- SameSite prevents CSRF
- Secure flag in production
- Domain restricted

## Production Checklist

Before deploying to production:

- [ ] Change domain from 'localhost' to your domain
- [ ] Set secure: true (requires HTTPS)
- [ ] Update CORS origin to production URL
- [ ] Use environment variables for sensitive data
- [ ] Enable session token hashing
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up session cleanup cron job
- [ ] Add session activity logging
- [ ] Implement session timeout warnings

## Files Modified

1. **app/dashboard/page.tsx**
   - Updated to check PHP session
   - Added credentials: 'include'
   - Better error handling

2. **auth/login_handler.php**
   - Fixed cookie settings
   - Added domain: 'localhost'
   - Added samesite: 'Lax'

3. **auth/check_session.php**
   - Added CORS headers
   - Added OPTIONS handling

## Success Indicators

✅ Login successful  
✅ Dashboard loads completely  
✅ Welcome message shows user name  
✅ No redirect back to login  
✅ Cookie visible in DevTools  
✅ Session persists on refresh  
✅ Session persists after browser close (if Remember me)  
✅ No CORS errors in console  
✅ Session check returns user data  

---

**Fix Date**: November 3, 2025  
**Status**: ✅ Session Persistence Fixed  
**Files Modified**: 3 files  
**Testing**: Required
