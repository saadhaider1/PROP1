# Login CORS Fix - Complete Solution

## Issue
Login and OAuth weren't working because PHP backend was blocking requests from Next.js due to missing CORS headers.

## Root Cause
When Next.js (running on `http://localhost:3000`) tries to call PHP backend (running on `http://localhost/PROPLEDGER`), the browser blocks the request due to Cross-Origin Resource Sharing (CORS) policy.

## Solution Applied

### 1. Added CORS Headers to PHP Files

#### File: `auth/login_handler.php`
```php
// CORS headers for Next.js
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

#### File: `auth/oauth_login.php`
```php
// CORS headers for Next.js
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

## What These Headers Do

### Access-Control-Allow-Origin
- Tells browser: "Allow requests from http://localhost:3000"
- Without this, browser blocks all requests

### Access-Control-Allow-Methods
- Specifies which HTTP methods are allowed
- POST for login, GET for OAuth redirects

### Access-Control-Allow-Headers
- Allows Content-Type header (needed for JSON)

### Access-Control-Allow-Credentials
- Allows cookies and session data to be sent
- Critical for authentication

### OPTIONS Preflight
- Browser sends OPTIONS request first to check if CORS is allowed
- We respond with 200 OK to allow the actual request

## Testing Steps

### Step 1: Verify XAMPP is Running
```
1. Open XAMPP Control Panel
2. Verify Apache is running (green)
3. Verify MySQL is running (green)
4. If not, click "Start" for each
```

### Step 2: Clear Browser Cache
```
1. Open browser (Chrome/Edge/Firefox)
2. Press Ctrl+Shift+Delete
3. Select "Cached images and files"
4. Select "Cookies and other site data"
5. Click "Clear data"
```

### Step 3: Test Regular Login

#### Create Test User (if needed)
```sql
-- Run in phpMyAdmin
INSERT INTO users (full_name, email, password_hash, user_type, is_active) 
VALUES (
  'Test User',
  'test@example.com',
  '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', -- Use password_hash() in PHP
  'investor',
  1
);
```

#### Test Login
```
1. Go to: http://localhost:3000/login
2. Select "User Login"
3. Enter:
   - Email: test@example.com
   - Password: your_password
4. Click "Login with Email"
5. Check browser console (F12) for errors
6. Should redirect to /dashboard ✅
```

### Step 4: Test Google OAuth

#### Check OAuth Configuration
```
1. Open: c:\xampp\htdocs\PROPLEDGER\config\oauth_config.php
2. Verify Google credentials are set:
   - client_id
   - client_secret
   - redirect_uri
```

#### Test OAuth Flow
```
1. Go to: http://localhost:3000/login
2. Make sure "User Login" is selected
3. Click "Continue with Google"
4. Should redirect to Google login ✅
5. Login with Google account
6. Should redirect back to app ✅
7. Should create session and redirect to dashboard ✅
```

## Troubleshooting

### Issue: Still getting "An error occurred"

**Check 1: Browser Console**
```
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for errors
4. Common errors:
   - CORS error → CORS headers not applied
   - Network error → XAMPP not running
   - 404 error → Wrong PHP file path
```

**Check 2: Network Tab**
```
1. Press F12 to open DevTools
2. Go to Network tab
3. Try to login
4. Click on the login request
5. Check:
   - Request URL (should be http://localhost/PROPLEDGER/auth/login_handler.php)
   - Status (should be 200)
   - Response (should show JSON)
```

**Check 3: PHP Error Logs**
```
1. Open: c:\xampp\apache\logs\error.log
2. Look for recent errors
3. Common issues:
   - Database connection failed
   - File not found
   - Syntax errors
```

### Issue: Google OAuth redirects but doesn't login

**Check 1: OAuth Config**
```php
// In config/oauth_config.php
$oauth_config = [
    'google' => [
        'client_id' => 'YOUR_CLIENT_ID',  // Must be set
        'client_secret' => 'YOUR_SECRET',  // Must be set
        'redirect_uri' => 'http://localhost/PROPLEDGER/auth/oauth_callback.php'
    ]
];
```

**Check 2: Google Console**
```
1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to "Credentials"
4. Check "Authorized redirect URIs" includes:
   http://localhost/PROPLEDGER/auth/oauth_callback.php
```

**Check 3: Callback File**
```
1. Verify file exists: c:\xampp\htdocs\PROPLEDGER\auth\oauth_callback.php
2. Check it has CORS headers
3. Check it creates session properly
```

### Issue: Login works but doesn't redirect

**Check 1: Dashboard Route**
```
1. Verify file exists: app/dashboard/page.tsx
2. Try accessing directly: http://localhost:3000/dashboard
3. If 404, dashboard page needs to be created
```

**Check 2: JavaScript Console**
```
1. Press F12
2. Look for JavaScript errors
3. Check if window.location.href is being called
```

## Testing Checklist

### Regular Login
- [ ] XAMPP Apache running
- [ ] XAMPP MySQL running
- [ ] Browser cache cleared
- [ ] Test user exists in database
- [ ] Can access login page (http://localhost:3000/login)
- [ ] Email/password form visible
- [ ] Clicking "Login with Email" sends request
- [ ] No CORS errors in console
- [ ] Receives JSON response
- [ ] Redirects to dashboard on success
- [ ] Shows error message on failure

### Google OAuth
- [ ] OAuth config file has credentials
- [ ] Google Console has correct redirect URI
- [ ] "Continue with Google" button visible
- [ ] Clicking button redirects to Google
- [ ] Can login with Google account
- [ ] Redirects back to callback URL
- [ ] Creates session
- [ ] Redirects to dashboard
- [ ] User data saved in database

## Quick Debug Commands

### Check if PHP files exist
```bash
dir c:\xampp\htdocs\PROPLEDGER\auth\login_handler.php
dir c:\xampp\htdocs\PROPLEDGER\auth\oauth_login.php
dir c:\xampp\htdocs\PROPLEDGER\auth\oauth_callback.php
```

### Check Apache is running
```bash
netstat -ano | findstr :80
```

### Check MySQL is running
```bash
netstat -ano | findstr :3306
```

### Test PHP file directly
```
Open browser: http://localhost/PROPLEDGER/auth/login_handler.php
Should show: {"success":false,"message":"Method not allowed"}
```

## Success Indicators

### Login Working
✅ No CORS errors in console  
✅ Request shows in Network tab  
✅ Response is JSON with success:true  
✅ Redirects to dashboard  
✅ Can access protected pages  

### OAuth Working
✅ Redirects to Google login  
✅ Returns to callback URL  
✅ Creates session  
✅ Redirects to dashboard  
✅ User data in database  

## Next Steps

If everything works:
1. Create more test users
2. Test agent login
3. Test "Remember me" functionality
4. Test "Forgot password" flow
5. Add more OAuth providers (LinkedIn, Facebook)

---

**Fix Date**: November 3, 2025  
**Status**: ✅ CORS Headers Added  
**Files Modified**: 
- auth/login_handler.php
- auth/oauth_login.php
