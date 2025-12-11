# 🔓 CORS Fix - Multi-Port Support for PROPLEDGER

## 🎯 Problem Solved

**Issue:** When running Next.js on different ports (3001, 3002, etc.), the PHP backend was blocking requests due to CORS restrictions.

**Error:** `Access to fetch at 'http://localhost/PROPLEDGER/...' from origin 'http://localhost:3001' has been blocked by CORS policy`

**Solution:** Updated all PHP files to accept requests from **any localhost port**.

---

## ✅ Files Updated (9 Files)

### Authentication Files (`/auth/`)
1. ✅ `login_handler.php` - Login endpoint
2. ✅ `signup_handler.php` - Registration endpoint
3. ✅ `check_session.php` - Session validation

### Messaging Files (`/managers/`)
4. ✅ `get_agent_messages.php` - Agent messages retrieval
5. ✅ `get_messages.php` - User messages retrieval
6. ✅ `send_agent_reply.php` - Agent reply endpoint
7. ✅ `send_message.php` - Send message endpoint
8. ✅ `get_agents.php` - Get agents list

---

## 🔧 What Changed

### Before (Port-Specific):
```php
// Only allowed port 3000
header('Access-Control-Allow-Origin: http://localhost:3000');
```

### After (Any Port):
```php
// Allow any localhost port (3000, 3001, 3002, etc.)
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (preg_match('/^http:\/\/localhost(:\d+)?$/', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: http://localhost:3000');
}
```

---

## 🚀 How to Use Different Ports

### Method 1: Specify Port in Command
```bash
# Port 3001
npm run dev -- -p 3001

# Port 3002
npm run dev -- -p 3002

# Port 8080
npm run dev -- -p 8080
```

### Method 2: Environment Variable
Create `.env.local`:
```env
PORT=3001
```

Then run:
```bash
npm run dev
```

### Method 3: Package.json Script
Add to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:3001": "next dev -p 3001",
    "dev:3002": "next dev -p 3002"
  }
}
```

Run:
```bash
npm run dev:3001
```

---

## ✅ Supported Ports

The backend now accepts requests from:
- ✅ `http://localhost:3000`
- ✅ `http://localhost:3001`
- ✅ `http://localhost:3002`
- ✅ `http://localhost:3003`
- ✅ `http://localhost:8080`
- ✅ **Any localhost port!**

---

## 🔒 Security Features

### What's Allowed:
- ✅ `http://localhost` (any port)
- ✅ `http://localhost:3000`
- ✅ `http://localhost:3001`
- ✅ `http://localhost:XXXX`

### What's Blocked:
- ❌ `http://example.com`
- ❌ `http://192.168.1.100`
- ❌ `https://malicious-site.com`
- ❌ Any non-localhost origin

### Regex Pattern Used:
```php
preg_match('/^http:\/\/localhost(:\d+)?$/', $origin)
```

This pattern:
- Matches `http://localhost` exactly
- Optionally matches `:` followed by digits (port number)
- Rejects anything else

---

## 🧪 Testing

### Test Different Ports:

**Terminal 1 - Port 3000:**
```bash
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm run dev
```
Access: http://localhost:3000

**Terminal 2 - Port 3001:**
```bash
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm run dev -- -p 3001
```
Access: http://localhost:3001

**Terminal 3 - Port 8080:**
```bash
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm run dev -- -p 8080
```
Access: http://localhost:8080

---

## 🔍 Verify CORS is Working

### 1. Open Browser Console (F12)
### 2. Check Network Tab
### 3. Look for Response Headers:

```
Access-Control-Allow-Origin: http://localhost:3001
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

The `Access-Control-Allow-Origin` should match your current port!

---

## 🐛 Troubleshooting

### Issue: Still Getting CORS Error

**Check:**
1. ✅ XAMPP Apache is running
2. ✅ Clear browser cache (Ctrl + Shift + Delete)
3. ✅ Hard refresh (Ctrl + Shift + R)
4. ✅ Check browser console for exact error
5. ✅ Verify PHP files were updated

**Solution:**
```bash
# Restart Apache in XAMPP
# Clear browser cache
# Restart Next.js dev server
```

### Issue: Port Already in Use

**Error:** `Port 3001 is already in use`

**Solution:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3002
```

### Issue: Changes Not Reflecting

**Solution:**
1. Stop Next.js server (Ctrl + C)
2. Clear `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`

---

## 📊 Updated Endpoints

All these endpoints now support any localhost port:

### Authentication
- `POST http://localhost/PROPLEDGER/auth/login_handler.php`
- `POST http://localhost/PROPLEDGER/auth/signup_handler.php`
- `GET http://localhost/PROPLEDGER/auth/check_session.php`

### Messaging
- `GET http://localhost/PROPLEDGER/managers/get_agent_messages.php`
- `GET http://localhost/PROPLEDGER/managers/get_messages.php`
- `POST http://localhost/PROPLEDGER/managers/send_message.php`
- `POST http://localhost/PROPLEDGER/managers/send_agent_reply.php`

### Agents
- `GET http://localhost/PROPLEDGER/managers/get_agents.php`

---

## 🎯 Use Cases

### Development Team
Multiple developers can run on different ports:
- Developer 1: Port 3000
- Developer 2: Port 3001
- Developer 3: Port 3002

### Testing
Run multiple instances for testing:
- Production build: Port 3000
- Development: Port 3001
- Testing: Port 3002

### Port Conflicts
If port 3000 is taken, easily switch to another port without backend changes!

---

## 📝 Code Example

### Frontend (Any Port)
```typescript
// Works on any localhost port!
const response = await fetch('http://localhost/PROPLEDGER/auth/login_handler.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password })
});
```

### Backend Response
```php
// Automatically matches your frontend port
Access-Control-Allow-Origin: http://localhost:3001
```

---

## ✅ Benefits

1. **Flexibility** - Run on any port without configuration
2. **Development** - Multiple developers, different ports
3. **Testing** - Run multiple instances simultaneously
4. **No Conflicts** - Easy port switching
5. **Security** - Still restricted to localhost only
6. **Convenience** - No manual CORS configuration needed

---

## 🔄 Future Enhancements

For production deployment, you may want to:

1. **Add Production URLs:**
```php
$allowed_origins = [
    'https://propledger.com',
    'https://www.propledger.com'
];
```

2. **Environment-Based CORS:**
```php
if (getenv('APP_ENV') === 'production') {
    // Strict CORS
} else {
    // Allow localhost any port
}
```

3. **IP Whitelist:**
```php
// Allow specific IP addresses
if (preg_match('/^http:\/\/(localhost|192\.168\.1\.\d+)(:\d+)?$/', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
```

---

## 📞 Quick Reference

### Start on Different Port:
```bash
npm run dev -- -p 3001
```

### Check Current Port:
Look at terminal output:
```
- Local:        http://localhost:3001
```

### Verify CORS:
Open browser console → Network tab → Check response headers

---

## ✅ Success Indicators

You know CORS is working when:
- ✅ No CORS errors in browser console
- ✅ Login works on any port
- ✅ API calls succeed
- ✅ Response headers show correct origin
- ✅ Cookies are set properly

---

**Last Updated:** November 10, 2025  
**Version:** 2.0.0  
**Status:** ✅ Multi-Port Support Enabled

---

## 🎉 Summary

Your PROPLEDGER application now works on **ANY localhost port**! 

Just run:
```bash
npm run dev -- -p <YOUR_PORT>
```

And everything will work seamlessly! 🚀
