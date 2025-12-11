# 🚀 PROPLEDGER - Complete Startup Guide

## 📋 Prerequisites

Before starting the project, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **XAMPP** (Apache + MySQL) - [Download](https://www.apachefriends.org/)
- ✅ **Git** (optional) - [Download](https://git-scm.com/)
- ✅ **VS Code** or any code editor

---

## 🔧 Initial Setup (One-Time Only)

### Step 1: Install Dependencies

Open terminal in the Next.js project folder and run:

```bash
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm install
```

This will install all required packages from `package.json`.

### Step 2: Verify Installation

Check if installation was successful:

```bash
npm --version
node --version
```

---

## 🎯 How to Start the Project

### Method 1: Using Terminal (Recommended)

#### **Step 1: Start XAMPP**
1. Open XAMPP Control Panel
2. Click **Start** for Apache
3. Click **Start** for MySQL
4. Verify both are running (green status)

#### **Step 2: Start Next.js Development Server**

Open terminal (Command Prompt, PowerShell, or Git Bash):

```bash
# Navigate to project directory
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs

# Start development server
npm run dev
```

**Alternative commands:**
```bash
# If npm run dev doesn't work, try:
npx next dev

# Or specify port:
npm run dev -- -p 3000
```

#### **Step 3: Access the Application**

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost/PROPLEDGER/

---

### Method 2: Using VS Code Integrated Terminal

1. Open VS Code
2. Open the project folder: `File > Open Folder > c:\xampp\htdocs\PROPLEDGER\propledger-nextjs`
3. Open integrated terminal: `View > Terminal` or press `` Ctrl + ` ``
4. Run: `npm run dev`

---

### Method 3: Using npm Scripts

The project has these npm scripts defined in `package.json`:

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📊 Startup Checklist

Before accessing the application, verify:

- [ ] XAMPP Apache is running (port 80)
- [ ] XAMPP MySQL is running (port 3306)
- [ ] Next.js dev server is running (port 3000)
- [ ] No port conflicts
- [ ] Database exists (`propledger_db`)
- [ ] Tables are created

---

## 🔍 Troubleshooting

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Option 1: Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
npm run dev -- -p 3001
```

### Issue 2: Module Not Found

**Error:** `Cannot find module 'next'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue 3: XAMPP Not Running

**Error:** `Connection error. Please make sure XAMPP is running`

**Solution:**
1. Open XAMPP Control Panel
2. Start Apache and MySQL
3. Check if ports 80 and 3306 are free
4. Verify services are running (green status)

### Issue 4: Database Connection Error

**Error:** `Database connection failed`

**Solution:**
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Check if `propledger_db` database exists
3. Run database setup script:
   ```
   http://localhost/PROPLEDGER/php/setup_database.php
   ```

### Issue 5: npm Command Not Found

**Error:** `'npm' is not recognized`

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart terminal after installation
3. Verify: `npm --version`

---

## 🌐 Default URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Next.js Frontend | http://localhost:3000 | Main application |
| PHP Backend | http://localhost/PROPLEDGER/ | API endpoints |
| phpMyAdmin | http://localhost/phpmyadmin | Database management |
| Debug Messages | http://localhost/PROPLEDGER/check_messages.php | Message debugging |

---

## 📁 Project Structure

```
c:\xampp\htdocs\PROPLEDGER\
├── propledger-nextjs\          # Next.js Frontend
│   ├── app\                    # App Router pages
│   ├── components\             # React components
│   ├── lib\                    # Utilities & helpers
│   ├── public\                 # Static assets
│   ├── package.json            # Dependencies
│   └── next.config.js          # Next.js config
│
├── auth\                       # Authentication PHP files
├── managers\                   # Messaging PHP files
├── config\                     # Database configuration
└── php\                        # Database setup scripts
```

---

## 🎨 Development Workflow

### 1. **Daily Startup**

```bash
# Terminal 1: Start XAMPP (or use GUI)
# No command needed - use XAMPP Control Panel

# Terminal 2: Start Next.js
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm run dev
```

### 2. **Making Changes**

- Edit files in VS Code
- Save changes (Ctrl + S)
- Browser auto-refreshes (Hot Module Replacement)
- Check terminal for errors

### 3. **Testing**

1. Open browser: http://localhost:3000
2. Test features
3. Check browser console (F12)
4. Check terminal for server logs

### 4. **Stopping Servers**

```bash
# Stop Next.js: Press Ctrl + C in terminal

# Stop XAMPP: Use XAMPP Control Panel
```

---

## 🔑 Environment Variables (Optional)

Create `.env.local` file in `propledger-nextjs` folder:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost/PROPLEDGER

# Database (for reference)
DB_HOST=localhost
DB_NAME=propledger_db
DB_USER=root
DB_PASS=

# Session
SESSION_SECRET=your-secret-key-here
```

---

## 📦 Package Management

### Install New Package

```bash
npm install package-name

# Example:
npm install axios
npm install @types/node --save-dev
```

### Update Packages

```bash
# Update all packages
npm update

# Update specific package
npm update package-name
```

### Remove Package

```bash
npm uninstall package-name
```

---

## 🏗️ Building for Production

### Step 1: Create Production Build

```bash
npm run build
```

This creates an optimized production build in `.next` folder.

### Step 2: Start Production Server

```bash
npm start
```

### Step 3: Test Production Build

Visit: http://localhost:3000

---

## 🐛 Debugging

### Enable Verbose Logging

```bash
# Windows PowerShell
$env:NODE_OPTIONS="--inspect"
npm run dev

# Windows CMD
set NODE_OPTIONS=--inspect
npm run dev
```

### View Logs

- **Next.js logs**: Terminal where `npm run dev` is running
- **PHP logs**: `c:\xampp\apache\logs\error.log`
- **MySQL logs**: `c:\xampp\mysql\data\*.err`

---

## 🔄 Common Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

---

## 📱 Accessing from Other Devices

### On Same Network

1. Find your computer's IP address:
   ```bash
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. Start Next.js with host flag:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. Access from other device:
   ```
   http://192.168.1.100:3000
   ```

---

## ⚡ Performance Tips

### 1. **Fast Refresh**
- Enabled by default
- Preserves component state
- Instant feedback on changes

### 2. **Turbopack (Experimental)**
```bash
npm run dev -- --turbo
```

### 3. **Clear Cache**
```bash
rm -rf .next
npm run dev
```

---

## 🎓 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 📞 Quick Help

### Terminal Not Working?

1. Close terminal
2. Open new terminal as Administrator
3. Navigate to project folder
4. Run `npm run dev`

### Changes Not Reflecting?

1. Hard refresh browser: `Ctrl + Shift + R`
2. Clear browser cache
3. Restart Next.js server
4. Check terminal for errors

### Database Issues?

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Check if database exists
3. Run setup script
4. Verify table structure

---

## ✅ Success Indicators

You know everything is working when:

- ✅ Terminal shows: `Ready in X ms`
- ✅ Browser loads: http://localhost:3000
- ✅ No errors in terminal
- ✅ No errors in browser console
- ✅ XAMPP shows green status
- ✅ Login works successfully
- ✅ Pages load smoothly

---

## 🎯 Next Steps After Startup

1. **Test Login**: http://localhost:3000/login
2. **Test Signup**: http://localhost:3000/signup
3. **Check Dashboard**: http://localhost:3000/dashboard
4. **Test Messaging**: Send a test message
5. **Verify Database**: Check phpMyAdmin

---

## 📋 Maintenance

### Daily
- Start XAMPP
- Start Next.js dev server
- Check for errors

### Weekly
- Update packages: `npm update`
- Clear cache: `rm -rf .next`
- Backup database

### Monthly
- Review logs
- Update dependencies
- Test all features

---

**Last Updated:** November 10, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

---

## 🚀 Quick Start Command

```bash
# Copy and paste this entire block:
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs && npm run dev
```

**That's it! Your PROPLEDGER application should now be running!** 🎉
