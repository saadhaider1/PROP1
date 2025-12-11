# PROPLEDGER Messaging System - Quick Guide

## 🚀 Quick Start

### For Users (Send Message to Agent)
```
1. Go to http://localhost:3000/managers
2. Click "Contact Agent" on any agent
3. Click "Send Message" 💬
4. Fill form and send
5. Check replies in http://localhost:3000/dashboard
```

### For Agents (Reply to Messages)
```
1. Go to http://localhost:3000/agent-dashboard
2. Scroll to "Client Messages" section
3. Click "Reply to Client" on any message
4. Type reply and click "Send Reply"
5. Client will see reply in their dashboard
```

---

## 📍 Key URLs

| Page | URL | Description |
|------|-----|-------------|
| Portfolio Managers | `/managers` | View and contact agents |
| User Dashboard | `/dashboard` | View messages and replies |
| Agent Dashboard | `/agent-dashboard` | View client messages and reply |

---

## 🎯 Key Features

### ✅ What Works
- ✓ Send messages from user to agent
- ✓ Agent receives messages in dashboard
- ✓ Agent can reply to messages
- ✓ User sees replies in dashboard
- ✓ Priority levels (Normal, High, Urgent)
- ✓ Status tracking (Unread, Read, Replied)
- ✓ Refresh buttons to fetch latest messages
- ✓ Beautiful UI with status badges

### 🔄 Message Statuses
- **New** (Teal Badge) - Unread message
- **Replied** (Green Badge) - Agent has replied
- **High Priority** (Orange Badge) - Important message
- **Urgent** (Red Badge) - Very important message

---

## 🔧 Troubleshooting

### "Connection error. Please make sure XAMPP is running"
**Solution**: 
1. Start XAMPP Control Panel
2. Start Apache and MySQL
3. Verify `http://localhost/PROPLEDGER/` is accessible

### Messages not showing
**Solution**:
1. Click "Refresh" button in dashboard
2. Check browser console for errors
3. Verify user is logged in
4. Check database has `manager_messages` table

### Agent not receiving messages
**Solution**:
1. Verify agent name matches exactly
2. Check agent is logged in
3. Click "Refresh" in agent dashboard
4. Check PHP backend is running

---

## 💡 Tips

1. **Use Priority Levels**: Mark urgent messages as "Urgent" for faster response
2. **Refresh Regularly**: Click refresh button to see new messages
3. **Check Both Dashboards**: Users check `/dashboard`, agents check `/agent-dashboard`
4. **Reply Promptly**: Agents should reply quickly to maintain good ratings

---

## 📱 Mobile Friendly

The messaging system is fully responsive and works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

---

## 🎨 UI Elements

### User Dashboard Messages
```
┌─────────────────────────────────────────┐
│ Messages from Portfolio Managers  [Refresh] │
├─────────────────────────────────────────┤
│ Property Investment Inquiry [New]       │
│ To: Ahmed Khan                          │
│ Message: I'm interested in...           │
│                                         │
│ ┌─ Reply from Ahmed Khan: ─────────┐  │
│ │ Thank you for your interest...    │  │
│ │ Replied on Nov 10, 2025          │  │
│ └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Agent Dashboard Messages
```
┌─────────────────────────────────────────┐
│ Client Messages                [Refresh] │
├─────────────────────────────────────────┤
│ Property Investment Inquiry [New]       │
│ From: John Doe (john@email.com)        │
│ Message: I'm interested in...           │
│                                         │
│ [Reply to Client]                       │
└─────────────────────────────────────────┘
```

---

## 🔐 Security

- ✓ Login required to send/view messages
- ✓ Session-based authentication
- ✓ CORS protection
- ✓ Input validation
- ✓ SQL injection protection (PDO prepared statements)

---

## 📊 Database

Messages stored in `manager_messages` table with:
- User ID
- Manager Name
- Subject & Message
- Priority & Status
- Timestamps
- Reply Message & Reply Timestamp

---

## 🎉 That's It!

You now have a fully functional messaging system between users and agents!

**Need Help?** Check the full documentation in `MESSAGING_SYSTEM_COMPLETE.md`
