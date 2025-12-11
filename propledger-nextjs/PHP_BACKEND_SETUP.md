# PHP Backend Authentication Setup

## ✅ Configuration Complete

The Next.js application has been configured to use the existing PHP/MySQL backend for authentication.

## 🔧 What Was Changed

### Login Page (`app/login/page.tsx`)
- Now connects to: `http://localhost/PROPLEDGER/auth/login_handler.php`
- Stores user data in localStorage after successful login
- Redirects to appropriate dashboard based on user type

### Signup Page (`app/signup/page.tsx`)
- Now connects to: `http://localhost/PROPLEDGER/auth/signup_handler.php`
- Sends proper field names matching PHP backend expectations
- Stores user data in localStorage after successful signup

## 📋 Requirements

### 1. XAMPP Must Be Running
Make sure Apache and MySQL are running in XAMPP Control Panel.

### 2. Database Setup
Ensure the PROPLEDGER database exists with the following tables:
- `users` - User accounts
- `sessions` - User sessions
- `agents` - Agent-specific data (if using agent features)

### 3. PHP Backend Files
The following PHP files must exist in `c:\xampp\htdocs\PROPLEDGER\auth\`:
- `login_handler.php` - Handles login requests
- `signup_handler.php` - Handles signup requests
- `check_session.php` - Validates user sessions
- `logout_handler.php` - Handles logout

## 🚀 How to Use

### Login
1. Start XAMPP (Apache + MySQL)
2. Navigate to `http://localhost:3001/login`
3. Enter your credentials
4. Click "Login with Email"

### Signup
1. Navigate to `http://localhost:3001/signup`
2. Fill in the registration form
3. Choose "Investor" or "Agent" type
4. Click "Create Account"

## 🔍 Troubleshooting

### "Connection error" message
- **Cause**: XAMPP is not running or PHP backend is not accessible
- **Solution**: Start XAMPP and ensure Apache is running on port 80

### "Invalid email or password"
- **Cause**: Wrong credentials or user doesn't exist
- **Solution**: Check credentials or create a new account via signup

### CORS errors in browser console
- **Cause**: PHP backend not allowing cross-origin requests
- **Solution**: Add CORS headers to PHP files:
  ```php
  header('Access-Control-Allow-Origin: http://localhost:3001');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  ```

## 📊 Data Flow

1. User submits login/signup form in Next.js app
2. Request sent to PHP backend (`http://localhost/PROPLEDGER/auth/...`)
3. PHP validates credentials against MySQL database
4. PHP returns success/error response with user data
5. Next.js stores user data in localStorage
6. User redirected to dashboard

## 🔐 Session Management

- Sessions are managed by PHP backend using cookies
- User data is also stored in localStorage for Next.js app
- Both cookie and localStorage are used for authentication state

## 📝 Notes

- Next.js app runs on: `http://localhost:3001`
- PHP backend runs on: `http://localhost/PROPLEDGER/`
- Both must be running simultaneously for login to work
