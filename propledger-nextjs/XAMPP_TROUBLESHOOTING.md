# XAMPP Connection Error - Complete Fix Guide

## Current Issue
"Connection error. Please make sure XAMPP is running" when trying to create agent account.

## Root Cause
The Next.js app needs to communicate with the PHP backend running on XAMPP, but there might be connection or database issues.

## Step-by-Step Fix

### **Step 1: Verify XAMPP Services**

1. Open **XAMPP Control Panel**
2. Check these services are **Running** (green):
   - ✅ **Apache** - Must be running
   - ✅ **MySQL** - Must be running
3. If not running, click **Start** for each

### **Step 2: Verify Database Exists**

1. Open browser: http://localhost/phpmyadmin
2. Check if database `propledger_db` exists
3. If NOT exists, create it:
   - Click "New" in left sidebar
   - Database name: `propledger_db`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

### **Step 3: Create Required Tables**

Run this SQL in phpMyAdmin (SQL tab):

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    user_type ENUM('investor', 'agent', 'property_owner', 'developer') NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    newsletter_subscribed BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    license_number VARCHAR(100),
    experience VARCHAR(100),
    specialization VARCHAR(255),
    city VARCHAR(100),
    agency VARCHAR(255),
    phone VARCHAR(20),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
    commission_rate DECIMAL(5,2),
    total_sales DECIMAL(15,2),
    rating DECIMAL(3,2) DEFAULT 4.50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Manager messages table
CREATE TABLE IF NOT EXISTS manager_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    manager_name VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('normal', 'high', 'urgent') DEFAULT 'normal',
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    sender_type ENUM('user', 'agent') DEFAULT 'user',
    receiver_type ENUM('user', 'agent') DEFAULT 'agent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replied_at TIMESTAMP NULL,
    reply_message TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### **Step 4: Test PHP Backend Directly**

1. Open browser: http://localhost/PROPLEDGER/auth/signup_handler.php
2. You should see a JSON error (this is normal - it means PHP is working)
3. If you see "Connection failed" - check database credentials

### **Step 5: Verify Database Credentials**

Check file: `c:\xampp\htdocs\PROPLEDGER\config\database.php`

Should contain:
```php
$host = 'localhost';
$dbname = 'propledger_db';
$username = 'root';
$password = '';  // Empty for default XAMPP
```

### **Step 6: Test the Signup**

1. Make sure Next.js dev server is running: `npm run dev`
2. Visit: http://localhost:3000/signup
3. Click "Agent" tab
4. Fill in form:
   - Full Name: **haseeb ahmed**
   - Email: **xaadhaider2@gmail.com**
   - Phone: **+923149522678**
   - City: **taxila**
   - License: **TYU-1422**
   - Experience: **0-2 years** (select from dropdown)
   - Specialization: **RESIDENTIAL**
   - Password: (8+ characters)
5. Check "I agree to the agent guidelines"
6. Click "Create Account"

### **Step 7: Check Browser Console**

1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. Look for errors
4. Common errors and fixes:

#### Error: "Failed to fetch"
**Fix**: XAMPP Apache not running - start it

#### Error: "Connection failed"
**Fix**: Database doesn't exist - create `propledger_db`

#### Error: "Table doesn't exist"
**Fix**: Run the SQL from Step 3

#### Error: "Email already registered"
**Fix**: Use different email or delete from database:
```sql
DELETE FROM users WHERE email = 'xaadhaider2@gmail.com';
```

### **Step 8: Verify Tables Were Created**

In phpMyAdmin:
1. Select `propledger_db` database
2. You should see these tables:
   - users
   - agents
   - user_sessions
   - manager_messages

### **Step 9: Test Agent Creation**

After successful signup, verify in phpMyAdmin:

```sql
-- Check if user was created
SELECT * FROM users ORDER BY id DESC LIMIT 1;

-- Check if agent was created
SELECT * FROM agents ORDER BY id DESC LIMIT 1;
```

### **Step 10: Verify Agent Appears on Managers Page**

1. Visit: http://localhost:3000/managers
2. Your agent should appear in the grid
3. If not, check browser console for errors

## Common Issues & Solutions

### Issue 1: Port 80 Already in Use
**Symptoms**: Apache won't start in XAMPP
**Solution**:
1. Stop Skype or other apps using port 80
2. Or change Apache port in XAMPP config

### Issue 2: MySQL Won't Start
**Symptoms**: MySQL shows red in XAMPP
**Solution**:
1. Check if another MySQL is running
2. Stop it or change XAMPP MySQL port

### Issue 3: Database Connection Failed
**Symptoms**: "Connection failed" error
**Solution**:
1. Verify database name is `propledger_db`
2. Check username is `root`
3. Check password is empty (default XAMPP)

### Issue 4: CORS Error
**Symptoms**: "CORS policy" error in console
**Solution**: Already fixed in PHP handler with CORS headers

### Issue 5: JSON Parse Error
**Symptoms**: "Unexpected token" error
**Solution**: Already fixed - now sending JSON instead of FormData

## Verification Checklist

Before testing, verify:
- [ ] XAMPP Apache: Running (green)
- [ ] XAMPP MySQL: Running (green)
- [ ] Database `propledger_db` exists
- [ ] Tables created (users, agents, user_sessions)
- [ ] Next.js dev server running (npm run dev)
- [ ] Browser at http://localhost:3000/signup

## Quick Test Commands

### Test PHP Backend
```bash
# In browser
http://localhost/PROPLEDGER/auth/signup_handler.php
```

### Test Database Connection
```bash
# In browser
http://localhost/phpmyadmin
```

### Test Next.js
```bash
# In browser
http://localhost:3000/signup
```

## Success Indicators

✅ XAMPP Apache: Green "Running"  
✅ XAMPP MySQL: Green "Running"  
✅ phpMyAdmin opens successfully  
✅ Database `propledger_db` visible  
✅ Tables exist in database  
✅ Signup form loads without errors  
✅ No "Connection error" message  
✅ Agent account created successfully  
✅ Agent appears on `/managers` page  

## Still Having Issues?

### Check Apache Error Log
1. XAMPP Control Panel
2. Click "Logs" button next to Apache
3. Look for errors

### Check MySQL Error Log
1. XAMPP Control Panel
2. Click "Logs" button next to MySQL
3. Look for errors

### Enable PHP Error Display
Add to `c:\xampp\htdocs\PROPLEDGER\auth\signup_handler.php` at top:
```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Contact Points

If still not working, check:
1. XAMPP version (should be 8.0+)
2. PHP version (should be 8.0+)
3. MySQL version (should be 8.0+)
4. Windows firewall settings
5. Antivirus blocking ports

## Final Notes

- Default XAMPP MySQL password is empty
- Default XAMPP MySQL username is `root`
- Apache must run on port 80 (or configure different port)
- MySQL must run on port 3306 (or configure different port)
- Both services must be running simultaneously
