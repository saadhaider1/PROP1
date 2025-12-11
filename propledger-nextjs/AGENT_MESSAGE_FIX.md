# Agent Messaging - Complete Fix & Testing

## 🔧 Fixes Applied

### 1. Added CORS Headers to All Endpoints
- ✅ `send_message.php` - Now has proper CORS
- ✅ `get_agent_messages.php` - Now has proper CORS  
- ✅ `send_agent_reply.php` - Now has proper CORS

### 2. Enhanced Name Matching
- ✅ Uses both exact match AND LIKE pattern
- ✅ Handles partial name matches
- ✅ Multiple fallback options

### 3. Added Debug Logging
- ✅ Console logs in MessageModal
- ✅ Console logs in Agent Dashboard
- ✅ Backend debug info in response

---

## 🧪 Step-by-Step Testing

### Step 1: Verify Database Setup

Open phpMyAdmin and run these queries:

**Check if manager_messages table exists:**
```sql
SHOW TABLES LIKE 'manager_messages';
```

**If it doesn't exist, create it:**
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

### Step 2: Verify Agent Exists

**Check agents in database:**
```sql
SELECT u.id, u.full_name, u.email, u.user_type, a.status
FROM users u
LEFT JOIN agents a ON u.id = a.user_id
WHERE u.user_type = 'agent';
```

**If no agents exist, you need to create one:**
1. Go to `http://localhost:3000/signup`
2. Select "Agent" tab
3. Fill in all required fields
4. Submit

### Step 3: Send a Test Message

1. **Login as a regular user** (not agent)
2. Go to `http://localhost:3000/managers`
3. You should see agents listed
4. Click "Contact Agent" on any agent
5. Click "Send Message"
6. Fill in the form:
   - Subject: "Test Message"
   - Message: "This is a test"
   - Priority: "Normal"
7. Click "Send Message"
8. **Open Browser Console (F12)** and look for:
   ```
   Sending message to agent: {manager: "Agent Name", subject: "Test Message", ...}
   Message send response: {success: true, ...}
   ```

### Step 4: Verify Message in Database

**Check if message was saved:**
```sql
SELECT * FROM manager_messages ORDER BY created_at DESC LIMIT 5;
```

You should see:
- `manager_name` = The agent's full name
- `subject` = "Test Message"
- `message` = "This is a test"
- `status` = "unread"

### Step 5: Check Agent Dashboard

1. **Logout** from user account
2. **Login as the agent** you sent the message to
3. Go to `http://localhost:3000/agent-dashboard`
4. **Open Browser Console (F12)** and look for:
   ```
   Agent info: {id: 1, name: "Agent Name", ...}
   Agent messages response: {success: true, messages: [...], debug: {...}}
   Backend debug info: {agent_name_used: "Agent Name", messages_found: 1}
   Found 1 messages for agent
   ```

5. The message should appear in "Client Messages" section

---

## 🔍 Troubleshooting

### Issue 1: "No messages yet" on Agent Dashboard

**Check Console Logs:**
```
Backend debug info: {agent_name_used: "...", messages_found: 0}
```

**Possible Causes:**
1. **Name Mismatch**: Agent name in message doesn't match agent's full_name
2. **No Messages**: No messages sent to this agent
3. **Wrong Agent**: Logged in as different agent

**Solution:**
```sql
-- Check what names are in messages
SELECT DISTINCT manager_name FROM manager_messages;

-- Check agent's actual name
SELECT full_name FROM users WHERE user_type = 'agent';

-- Update message if names don't match
UPDATE manager_messages 
SET manager_name = 'Correct Agent Name' 
WHERE manager_name = 'Wrong Name';
```

### Issue 2: Message Not Sending

**Check Console for Errors:**
- Look for "Connection error" or "Failed to send"
- Check Network tab for failed requests

**Verify XAMPP:**
1. Apache must be running
2. MySQL must be running
3. Test: `http://localhost/PROPLEDGER/managers/send_message.php`

### Issue 3: Authentication Error

**Check Session:**
```sql
SELECT * FROM user_sessions WHERE expires_at > NOW();
```

**Solution:**
1. Logout and login again
2. Clear browser cookies
3. Check localStorage has user data

---

## 📊 Manual Database Test

If nothing works, manually insert a test message:

```sql
-- Get user ID (sender)
SELECT id, full_name FROM users WHERE user_type != 'agent' LIMIT 1;

-- Get agent name
SELECT full_name FROM users WHERE user_type = 'agent' LIMIT 1;

-- Insert test message (replace IDs and names)
INSERT INTO manager_messages 
(user_id, manager_name, subject, message, priority, status, created_at)
VALUES 
(1, 'Agent Full Name Here', 'Manual Test', 'This is a manual test message', 'normal', 'unread', NOW());
```

Then refresh agent dashboard - message should appear!

---

## ✅ Expected Results

### When Sending Message:
**Browser Console:**
```javascript
Sending message to agent: {
  manager: "haseeb ahmed",
  subject: "investments",
  message: "hey",
  priority: "normal"
}

Message send response: {
  success: true,
  message: "Message sent successfully!",
  message_id: 1,
  manager: "haseeb ahmed",
  timestamp: "2025-11-10 22:15:00"
}
```

### When Viewing as Agent:
**Browser Console:**
```javascript
Agent info: {
  id: 3,
  name: "haseeb ahmed",
  email: "agent@example.com",
  type: "agent"
}

Agent messages response: {
  success: true,
  messages: [
    {
      id: 1,
      user_id: 2,
      manager_name: "haseeb ahmed",
      subject: "investments",
      message: "hey",
      priority: "normal",
      status: "unread",
      sender_name: "John Doe",
      sender_email: "user@example.com",
      created_at: "2025-11-10 22:15:00"
    }
  ],
  total_count: 1,
  unread_count: 1,
  debug: {
    agent_name_used: "haseeb ahmed",
    messages_found: 1
  }
}

Found 1 messages for agent
```

**Dashboard Display:**
- Message card with subject "investments"
- "New" badge (teal)
- Sender info: "John Doe (user@example.com)"
- Message text: "hey"
- "Reply to Client" button

---

## 🎯 Quick Checklist

- [ ] XAMPP Apache running
- [ ] XAMPP MySQL running
- [ ] `manager_messages` table exists
- [ ] At least one agent exists in database
- [ ] User logged in (not agent)
- [ ] Message sent successfully (check console)
- [ ] Message in database (check phpMyAdmin)
- [ ] Agent logged in
- [ ] Agent dashboard loaded
- [ ] Console shows debug info
- [ ] Message appears in "Client Messages"

---

## 🆘 Still Not Working?

1. **Clear browser cache and cookies**
2. **Restart XAMPP** (Apache + MySQL)
3. **Check PHP error logs**: `c:\xampp\apache\logs\error.log`
4. **Check browser console** for ALL errors
5. **Run SQL queries** to verify data
6. **Take screenshot** of console logs and share

---

## 📞 Debug Checklist

When asking for help, provide:
1. Screenshot of browser console (F12)
2. Result of: `SELECT * FROM manager_messages;`
3. Result of: `SELECT id, full_name, user_type FROM users WHERE user_type = 'agent';`
4. Screenshot of agent dashboard
5. XAMPP status (Apache + MySQL running?)

---

**Last Updated:** November 10, 2025
**Status:** All CORS headers added, flexible name matching enabled, debug logging active
