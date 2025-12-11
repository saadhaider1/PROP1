# XAMPP Integration Fixed - Hybrid Backend System

## Summary
Successfully integrated Next.js frontend with XAMPP PHP/MySQL backend. The system now works with your existing XAMPP setup!

## Problem Solved
- **Issue**: "Connection error. Please make sure XAMPP is running"
- **Cause**: Next.js was trying to connect to PostgreSQL database
- **Solution**: Created hybrid system that uses PHP/MySQL backend first, with PostgreSQL as fallback

## How It Works Now

### **Hybrid Backend Architecture**
```
Next.js Frontend
    ↓
Try PHP Backend (XAMPP) → Success? → Use PHP/MySQL
    ↓ (Failed)
Try PostgreSQL → Success? → Use PostgreSQL
    ↓ (Failed)
Show Error
```

## Changes Made

### 1. **Signup API** (`app/api/auth/signup/route.ts`)
- ✅ Now tries PHP backend first
- ✅ Sends data to `http://localhost/PROPLEDGER/auth/signup_handler.php`
- ✅ Falls back to PostgreSQL if PHP unavailable
- ✅ Works with XAMPP MySQL database

### 2. **Agents API** (`app/api/agents/route.ts`)
- ✅ Fetches from PHP backend first
- ✅ Calls `http://localhost/PROPLEDGER/managers/get_agents.php`
- ✅ Falls back to PostgreSQL if PHP unavailable
- ✅ Returns real agents from MySQL database

### 3. **PHP Backend** (`managers/get_agents.php`)
- ✅ Updated to include `agent.id` and `user_id`
- ✅ Returns all approved and pending agents
- ✅ Joins users and agents tables

## Setup Instructions

### **Step 1: Make Sure XAMPP is Running**
1. Open XAMPP Control Panel
2. Start **Apache** (for PHP)
3. Start **MySQL** (for database)
4. Both should show green "Running" status

### **Step 2: Verify Database Tables**
Make sure these tables exist in your MySQL database:
- `users` - User accounts
- `agents` - Agent profiles
- `user_sessions` - Session management

### **Step 3: Test Agent Signup**
1. Visit: http://localhost:3000/signup
2. Click "Agent" tab
3. Fill in the form:
   - **Full Name**: Haseeb Ahmed
   - **Email**: xaadhaider2@gmail.com
   - **Phone**: +923149522678
   - **City**: Taxila
   - **License Number**: TYU-1422
   - **Experience**: 3-5 years
   - **Specialization**: RESIDENTIAL
   - **Password**: (your password)
4. Check "I agree to the agent guidelines"
5. Click "Create Account"

### **Step 4: Verify Agent Appears**
1. Visit: http://localhost:3000/managers
2. Your new agent should appear in the grid!

## Testing Checklist

### ✅ **Test 1: XAMPP Running**
- Start XAMPP
- Create agent account
- Should work without errors

### ✅ **Test 2: Agent Display**
- Visit `/managers` page
- New agents should appear immediately
- Each agent shows:
  - Name with initials
  - Role/specialization
  - Location (city)
  - Experience
  - Rating stars

### ✅ **Test 3: Multiple Agents**
- Create 3-5 different agent accounts
- All should appear on managers page
- Each gets unique color

## Database Structure

### **Users Table**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    user_type ENUM('investor', 'agent', 'property_owner', 'developer'),
    password VARCHAR(255) NOT NULL,
    newsletter BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Agents Table**
```sql
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    license_number VARCHAR(100),
    experience VARCHAR(100),
    specialization VARCHAR(255),
    city VARCHAR(100),
    agency VARCHAR(255),
    phone VARCHAR(20),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
    rating DECIMAL(3,2) DEFAULT 4.50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## API Endpoints

### **Signup**
- **Next.js**: `POST /api/auth/signup`
- **PHP Backend**: `POST http://localhost/PROPLEDGER/auth/signup_handler.php`
- **Flow**: Next.js → PHP → MySQL

### **Get Agents**
- **Next.js**: `GET /api/agents`
- **PHP Backend**: `GET http://localhost/PROPLEDGER/managers/get_agents.php`
- **Flow**: Next.js → PHP → MySQL

## Troubleshooting

### **Issue: "Connection error. Please make sure XAMPP is running"**
**Solution**:
1. Open XAMPP Control Panel
2. Make sure Apache is running (green)
3. Make sure MySQL is running (green)
4. Try again

### **Issue: "Email already registered"**
**Solution**:
- Use a different email address
- Or delete the user from database:
  ```sql
  DELETE FROM users WHERE email = 'your@email.com';
  ```

### **Issue: Agent not appearing on /managers page**
**Solution**:
1. Check if agent was created:
   ```sql
   SELECT * FROM agents ORDER BY created_at DESC LIMIT 5;
   ```
2. Refresh the `/managers` page
3. Check browser console for errors

### **Issue: PHP errors**
**Solution**:
1. Check Apache error logs in XAMPP
2. Make sure `config/database.php` has correct credentials
3. Verify database connection

## Benefits of Hybrid System

✅ **Works with XAMPP** - Uses your existing PHP/MySQL setup  
✅ **Flexible** - Can switch to PostgreSQL later  
✅ **No Migration Needed** - Uses existing database  
✅ **Real-Time** - New agents appear immediately  
✅ **Reliable** - Fallback system if one backend fails  

## Next Steps

1. **Test the signup** - Create a few agent accounts
2. **Verify display** - Check `/managers` page
3. **Test video calls** - Try the Jitsi integration
4. **Test messaging** - Send messages to agents

## Important Notes

- XAMPP must be running for agent signup to work
- Apache and MySQL both need to be started
- Default agent status is "approved" (shows immediately)
- Agents are sorted by creation date (newest first)
- Each agent gets a unique gradient color
- Initials are auto-generated from name

## Success Indicators

✅ XAMPP Apache: Running (green)  
✅ XAMPP MySQL: Running (green)  
✅ Agent signup: No connection error  
✅ Agent appears on `/managers` page  
✅ Video call button works  
✅ Contact modal shows  

Your PROPLEDGER system is now fully integrated with XAMPP! 🎉
