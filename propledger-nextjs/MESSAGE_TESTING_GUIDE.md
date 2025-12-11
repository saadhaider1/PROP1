# Complete Message Testing Guide

## 🔍 Step 1: Check Database Status

Visit this URL in your browser:
```
http://localhost/PROPLEDGER/check_messages.php
```

This debug page will show you:
- ✅ If `manager_messages` table exists
- ✅ All messages in the database
- ✅ All agents in the database
- ✅ If message names match agent names
- ✅ Test queries for each agent

---

## 🧪 Step 2: Complete Test Procedure

### **A. Send a Test Message**

1. **Login as a regular user** (NOT an agent)
   - Go to `http://localhost:3000/login`
   - Login with investor/user account

2. **Navigate to Portfolio Managers**
   - Go to `http://localhost:3000/managers`
   - You should see a list of agents

3. **Send a message**
   - Click "Contact Agent" on any agent
   - Click "Send Message" 💬
   - Fill in:
     - Subject: "Test Message"
     - Message: "This is a test message"
     - Priority: "Normal"
   - Click "Send Message"

4. **Check Browser Console (F12)**
   - Should see:
     ```
     Sending message to agent: {manager: "Agent Name", subject: "Test Message", ...}
     Message send response: {success: true, message_id: 1, ...}
     ```

5. **Verify in Debug Page**
   - Refresh `http://localhost/PROPLEDGER/check_messages.php`
   - Should see your message in "All Messages in Database"
   - Note the "To Agent" column - this is the `manager_name`

### **B. View Message as Agent**

1. **Logout** from user account

2. **Login as the agent** you sent the message to
   - Use the exact agent account that matches the name

3. **Go to Agent Dashboard**
   - Navigate to `http://localhost:3000/agent-dashboard`

4. **Check Browser Console (F12)**
   - Should see:
     ```
     Agent info: {id: X, name: "Agent Name", email: "...", type: "agent"}
     Agent messages response: {success: true, messages: [...], debug: {...}}
     Backend debug info: {agent_name_used: "Agent Name", messages_found: 1}
     Found 1 messages for agent
     ```

5. **Check Dashboard Display**
   - Scroll to "Client Messages" section
   - Should see the message card with:
     - Subject: "Test Message"
     - "New" badge (teal color)
     - Sender info
     - Message text
     - "Reply to Client" button

---

## 🔧 Troubleshooting

### Issue 1: No Messages in Database

**Check:**
```
http://localhost/PROPLEDGER/check_messages.php
```

**If "No messages found":**
1. XAMPP MySQL is running?
2. `manager_messages` table exists?
3. Message actually sent? (check console for errors)

**Solution:**
- Run the CREATE TABLE SQL from the debug page
- Try sending message again

### Issue 2: Agent Not Seeing Messages

**Check Browser Console:**
```javascript
Backend debug info: {
  agent_name_used: "Agent Name",
  messages_found: 0  // ← This is the problem!
}
```

**Possible Causes:**

**A. Name Mismatch**
- Message sent to: "John Doe"
- Agent's name in DB: "john doe" or "John D. Doe"

**Solution:**
```sql
-- Check exact names
SELECT DISTINCT manager_name FROM manager_messages;
SELECT full_name FROM users WHERE user_type = 'agent';

-- Update if mismatch
UPDATE manager_messages 
SET manager_name = 'Correct Agent Name' 
WHERE manager_name = 'Wrong Name';
```

**B. Wrong Agent Logged In**
- Message sent to "Agent A"
- But logged in as "Agent B"

**Solution:**
- Logout and login as the correct agent
- Check debug page to see which agent has messages

**C. No Messages Sent**
- Check debug page shows 0 messages total

**Solution:**
- Send a test message first

### Issue 3: CORS Errors

**Console shows:**
```
Access to fetch at 'http://localhost/PROPLEDGER/...' has been blocked by CORS policy
```

**Solution:**
- All CORS headers have been added
- Restart XAMPP Apache
- Clear browser cache
- Try again

### Issue 4: Authentication Error

**Console shows:**
```
{success: false, message: "Authentication required"}
```

**Solution:**
1. Logout and login again
2. Check localStorage has user data:
   ```javascript
   localStorage.getItem('user')
   ```
3. Clear cookies and login again

---

## 📊 Expected Flow

### **1. User Sends Message:**
```
User Dashboard → Portfolio Managers → Contact Agent → Send Message
                                                           ↓
                                                    send_message.php
                                                           ↓
                                                    Database INSERT
                                                           ↓
                                              manager_messages table
```

### **2. Agent Views Message:**
```
Agent Dashboard → Load Messages → get_agent_messages.php
                                          ↓
                                   Query Database
                                          ↓
                          WHERE manager_name = agent's full_name
                                          ↓
                                   Return Messages
                                          ↓
                                   Display in UI
```

---

## ✅ Success Criteria

### **Message Sent Successfully:**
- ✅ Console shows success response
- ✅ Debug page shows message in database
- ✅ `manager_name` matches agent's `full_name`
- ✅ `status` is "unread"

### **Agent Sees Message:**
- ✅ Console shows `messages_found: 1` or more
- ✅ Message card appears in "Client Messages"
- ✅ Shows correct sender info
- ✅ "Reply to Client" button visible
- ✅ Status badges display correctly

---

## 🎯 Quick Checklist

Before asking for help, verify:

- [ ] XAMPP Apache running
- [ ] XAMPP MySQL running
- [ ] `manager_messages` table exists
- [ ] At least one agent exists
- [ ] Message sent (check debug page)
- [ ] Logged in as correct agent
- [ ] Browser console open (F12)
- [ ] Checked debug page output
- [ ] No CORS errors in console
- [ ] Agent name matches exactly

---

## 🆘 Still Not Working?

### **Provide This Information:**

1. **Screenshot of debug page:**
   `http://localhost/PROPLEDGER/check_messages.php`

2. **Browser console output:**
   - When sending message
   - When viewing agent dashboard

3. **SQL Query Results:**
   ```sql
   SELECT * FROM manager_messages;
   SELECT id, full_name, user_type FROM users WHERE user_type = 'agent';
   ```

4. **Agent Info:**
   - Which agent are you logged in as?
   - What's the exact name in localStorage?
   ```javascript
   JSON.parse(localStorage.getItem('user'))
   ```

---

## 🔑 Key Points

1. **Name Matching is Critical**
   - `manager_name` in messages MUST match agent's `full_name`
   - Case-sensitive by default
   - LIKE matching added for flexibility

2. **Authentication Required**
   - Must be logged in as agent
   - Session must be active
   - Check `propledger_session` cookie exists

3. **Debug Tools Available**
   - Debug page: `check_messages.php`
   - Browser console: F12
   - Backend debug info in API responses

4. **CORS Headers Added**
   - All endpoints have proper CORS
   - Credentials included in requests
   - Should work without CORS errors

---

**Last Updated:** November 10, 2025
**Status:** All fixes applied, debug tools ready
