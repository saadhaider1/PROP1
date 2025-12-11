# Agent Messaging Debug Guide

## Issue: Agents Not Receiving Messages

### ✅ Fixes Applied

1. **Updated `get_agent_messages.php`**
   - Added flexible name matching using LIKE operator
   - Added fallback for different user field names
   - Added comprehensive debug information
   - Now matches both exact and partial names

2. **Updated Agent Dashboard**
   - Added detailed console logging
   - Shows debug info from backend
   - Displays agent info for verification
   - Better error handling

### 🔍 How to Debug

#### Step 1: Check Browser Console (Agent Dashboard)
Open browser console (F12) when on agent dashboard and look for:
```
Agent messages response: {...}
Agent info: {...}
Backend debug info: {...}
```

The debug info will show:
- `agent_name_used`: The name being used to match messages
- `user_data`: Full user session data
- `messages_found`: Number of messages found

#### Step 2: Verify Message Sending
When a user sends a message, check browser console for:
```
Message sent successfully!
```

#### Step 3: Check Database Directly
Run this SQL query in phpMyAdmin:
```sql
SELECT * FROM manager_messages ORDER BY created_at DESC;
```

Look for:
- `manager_name` column - should match agent's full name
- `user_id` - should be valid user ID
- `status` - should be 'unread' for new messages

#### Step 4: Check Agent Names Match
Run this SQL to see all agents:
```sql
SELECT u.full_name, a.* FROM agents a 
JOIN users u ON a.user_id = u.id;
```

The `full_name` must exactly match what's sent in messages.

### 🔧 Common Issues & Solutions

#### Issue 1: Agent Name Mismatch
**Problem**: Message sent to "John Doe" but agent's name in DB is "John D. Doe"
**Solution**: The updated code now uses LIKE matching to handle partial matches

#### Issue 2: No Session
**Problem**: Agent not logged in properly
**Solution**: 
1. Logout and login again
2. Check localStorage has user data
3. Verify PHP session is active

#### Issue 3: Wrong User Type
**Problem**: User logged in as investor, not agent
**Solution**: Make sure you're logged in with an agent account

#### Issue 4: No Messages in Database
**Problem**: Messages not being saved
**Solution**: 
1. Check XAMPP MySQL is running
2. Verify `manager_messages` table exists
3. Check PHP error logs

### 📊 Database Schema

```sql
CREATE TABLE IF NOT EXISTS manager_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    manager_name VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('normal', 'high', 'urgent') DEFAULT 'normal',
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    sender_type VARCHAR(20) DEFAULT 'user',
    receiver_type VARCHAR(20) DEFAULT 'agent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replied_at TIMESTAMP NULL,
    reply_message TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 🧪 Test Procedure

1. **Create Test Agent**
   - Signup as agent with name "Test Agent"
   - Verify agent appears in Portfolio Managers page

2. **Send Test Message**
   - Login as regular user
   - Go to Portfolio Managers
   - Send message to "Test Agent"
   - Check browser console for success

3. **Check Agent Dashboard**
   - Logout and login as "Test Agent"
   - Go to Agent Dashboard
   - Check browser console for debug info
   - Message should appear in "Client Messages"

4. **Verify Database**
   - Open phpMyAdmin
   - Check `manager_messages` table
   - Should see new row with `manager_name = 'Test Agent'`

### 🎯 Expected Behavior

**When Message Sent:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "message_id": 1,
  "manager": "Test Agent",
  "timestamp": "2025-11-10 22:10:00"
}
```

**When Agent Fetches Messages:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "user_id": 2,
      "manager_name": "Test Agent",
      "subject": "Test Subject",
      "message": "Test message",
      "priority": "normal",
      "status": "unread",
      "sender_name": "John Doe",
      "sender_email": "john@example.com"
    }
  ],
  "total_count": 1,
  "unread_count": 1,
  "debug": {
    "agent_name_used": "Test Agent",
    "messages_found": 1
  }
}
```

### 📝 Checklist

- [ ] XAMPP Apache and MySQL running
- [ ] User logged in and can access Portfolio Managers
- [ ] Agent account exists and is approved
- [ ] Agent logged in to agent dashboard
- [ ] Message sent successfully (check console)
- [ ] Message appears in database
- [ ] Agent name matches exactly (or uses LIKE matching)
- [ ] Browser console shows debug info
- [ ] Message appears in agent dashboard

### 🆘 Still Not Working?

Check these files for errors:
1. `c:\xampp\htdocs\PROPLEDGER\managers\get_agent_messages.php`
2. `c:\xampp\htdocs\PROPLEDGER\managers\send_message.php`
3. Browser console (F12)
4. XAMPP Apache error logs
5. XAMPP MySQL error logs

### 💡 Quick Fix Commands

**Reset Messages Table:**
```sql
TRUNCATE TABLE manager_messages;
```

**Check All Messages:**
```sql
SELECT m.*, u.full_name as sender 
FROM manager_messages m 
LEFT JOIN users u ON m.user_id = u.id;
```

**Check Agent Names:**
```sql
SELECT u.id, u.full_name, u.user_type 
FROM users u 
WHERE u.user_type = 'agent';
```

---

## Summary

The messaging system now includes:
- ✅ Flexible name matching (exact + LIKE)
- ✅ Comprehensive debug logging
- ✅ Better error handling
- ✅ Multiple fallback options
- ✅ Detailed console output

**Next Steps:**
1. Refresh agent dashboard
2. Check browser console for debug info
3. Send a test message
4. Verify it appears for the agent
