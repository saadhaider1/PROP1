# PROPLEDGER - Simple Backend Explanation
## Understanding All Files in Plain English

---

## 🎯 What is Backend?

Think of backend like a **restaurant kitchen**:
- **Frontend** = The dining room (what customers see)
- **Backend** = The kitchen (where food is prepared)
- **Database** = The pantry (where ingredients are stored)

When you click "Login" on the website, the frontend sends a request to the backend, which checks the database and sends back the answer.

---

## 📂 FILE STRUCTURE - FROM START TO END

### PART 1: DATABASE CONNECTION FILES
*These files connect your code to the database (like a phone line)*

#### `config/database.php` (PHP Database Connection)
**What it does:**
- This is like a **phone number** to call the database
- It stores the database address: `localhost` (your computer)
- Database name: `propledger_db`
- Username: `root`
- Password: (empty for XAMPP)

**In simple words:**
```
"Hey, I want to talk to the database. Here's the address and password."
```

**How it works:**
1. Sets up connection details (where is database, what's the password)
2. Creates a connection using PDO (PHP Data Objects)
3. If connection fails, shows error message
4. Makes the connection available to all PHP files that include this file

**When it's used:**
- Every PHP file that needs database access includes this file
- It's like a shared phone line everyone can use

---

#### `propledger-nextjs/lib/db.ts` (TypeScript Database Connection)
**What it does:**
- Same thing as `database.php` but for Next.js (TypeScript)
- Creates a connection pool (multiple connections ready to use)
- Contains all the functions to talk to database

**In simple words:**
```
"Here's how to connect to database from Next.js, and here are all the functions to get/save data"
```

**Key Functions Inside:**

1. **`getUserByEmail(email)`**
   - **What it does:** Finds a user by their email address
   - **Like asking:** "Do you have a user with email john@example.com?"
   - **Returns:** User information or null if not found

2. **`createUser(data)`**
   - **What it does:** Creates a new user account
   - **Like asking:** "Please add this new user to the database"
   - **Returns:** The new user's ID number

3. **`getUserById(id)`**
   - **What it does:** Finds a user by their ID number
   - **Like asking:** "Show me user number 5"
   - **Returns:** User information

4. **`createSession(userId, token, expiresAt)`**
   - **What it does:** Saves a login session (so user stays logged in)
   - **Like asking:** "Remember that user 5 is logged in with this token"
   - **Returns:** Nothing (just saves it)

5. **`getSessionByToken(token)`**
   - **What it does:** Checks if a session token is valid
   - **Like asking:** "Is this token still valid? Who does it belong to?"
   - **Returns:** Session info with user data, or null if invalid

6. **`createAgent(data)`**
   - **What it does:** Creates an agent account
   - **Like asking:** "Add this agent to the database"
   - **Returns:** Nothing (just saves it)

7. **`getAgents()`**
   - **What it does:** Gets list of all agents
   - **Like asking:** "Show me all the agents"
   - **Returns:** Array of all agents

8. **`createMessage(data)`**
   - **What it does:** Saves a message from user to agent
   - **Like asking:** "Save this message in the database"
   - **Returns:** Message ID number

9. **`getUserMessages(userId)`**
   - **What it does:** Gets all messages for a specific user
   - **Like asking:** "Show me all messages for user 5"
   - **Returns:** Array of messages

10. **`getAgentMessages(agentName)`**
    - **What it does:** Gets all messages for a specific agent
    - **Like asking:** "Show me all messages for agent John"
    - **Returns:** Array of messages

11. **`createTokenTransaction(data)`**
    - **What it does:** Records a token purchase or spending
    - **Like asking:** "Save this transaction: user 5 bought 100 tokens"
    - **Returns:** Transaction ID

12. **`getUserTokens(userId)`**
    - **What it does:** Gets user's token balance
    - **Like asking:** "How many tokens does user 5 have?"
    - **Returns:** Token balance info

---

### PART 2: AUTHENTICATION FILES
*These files handle login, signup, and security*

#### `propledger-nextjs/lib/auth.ts` (Authentication Helper)
**What it does:**
- Handles all security stuff: passwords, sessions, login verification
- Like a **security guard** checking IDs

**Key Functions:**

1. **`hashPassword(password)`**
   - **What it does:** Converts password into scrambled text (so it can't be read)
   - **Example:** "mypassword123" → "$2a$10$abc123xyz..." (scrambled)
   - **Why:** So if database is hacked, passwords are safe
   - **Uses:** bcrypt library (industry standard)

2. **`verifyPassword(password, hash)`**
   - **What it does:** Checks if entered password matches the stored hash
   - **Example:** User types "mypassword123", checks against stored hash
   - **Returns:** true if match, false if not
   - **Why:** To verify login is correct

3. **`generateSessionToken()`**
   - **What it does:** Creates a random secret code for login session
   - **Example:** "a7f3b9c2d1e4f5g6h7i8j9k0l1m2n3o4p5"
   - **Why:** To identify who is logged in

4. **`createSession(user)`**
   - **What it does:** Creates a login session and saves it
   - **Steps:**
     1. Generate random token
     2. Save token in database (user_sessions table)
     3. Set cookie in browser (so browser remembers)
     4. Return token
   - **Why:** So user stays logged in when they visit again

5. **`getCurrentUser()`**
   - **What it does:** Checks who is currently logged in
   - **Steps:**
     1. Get session token from cookie
     2. Look up token in database
     3. If found and not expired, return user info
     4. If not found or expired, return null
   - **Returns:** User info or null

6. **`deleteSession()`**
   - **What it does:** Logs user out
   - **Steps:**
     1. Get session token from cookie
     2. Delete token from database
     3. Delete cookie from browser
   - **Why:** For logout functionality

7. **`verifyAuth(request)`**
   - **What it does:** Checks if API request is from logged-in user
   - **Steps:**
     1. Get session token from request headers
     2. Check if token exists in database
     3. If valid, return user info
     4. If invalid, return error
   - **Why:** To protect API routes (only logged-in users can access)

---

### PART 3: API ROUTE FILES (Next.js Backend)
*These are the "endpoints" - like different phone numbers you can call*

#### `propledger-nextjs/app/api/auth/login/route.ts` (Login API)
**What it does:**
- Handles user login requests
- Like a **receptionist** checking if you have an appointment

**Step-by-step flow:**

1. **Receive request:** User sends email and password
2. **Validate:** Check if email format is correct
3. **Find user:** Look in database for user with that email
   - If not found → Return error "Invalid email or password"
4. **Check if active:** Is user account active?
   - If not active → Return error "Account deactivated"
5. **Verify password:** Compare entered password with stored hash
   - If wrong → Return error "Invalid email or password"
6. **Check user type:** Is user trying to login as correct type (user/agent)?
   - If wrong type → Return error
7. **Create session:** Save login session in database
8. **Return success:** Send back user info and redirect URL

**Example:**
```
User sends: { email: "john@example.com", password: "mypass123" }
↓
Check database: Found user with email "john@example.com"
↓
Check password: Matches! ✓
↓
Create session: Save token "abc123xyz" in database
↓
Return: { success: true, user: {...}, redirect: "/dashboard" }
```

---

#### `propledger-nextjs/app/api/auth/signup/route.ts` (Signup API)
**What it does:**
- Handles new user registration
- Like a **registration desk** at a hotel

**Step-by-step flow:**

1. **Receive request:** User sends registration form data
2. **Validate:** Check all required fields are filled
   - Full name, email, phone, password, user type, etc.
3. **Check if email exists:** Look in database
   - If exists → Return error "Email already registered"
4. **Hash password:** Convert password to secure hash
5. **Create user:** Save user in database (users table)
6. **If agent:** Also create agent record (agents table)
7. **Create session:** Automatically log them in
8. **Return success:** Send back user info and redirect URL

**Example:**
```
User sends: { fullName: "John", email: "john@example.com", password: "pass123", userType: "investor" }
↓
Check: Email doesn't exist ✓
↓
Hash password: "pass123" → "$2a$10$xyz..."
↓
Save in database: INSERT INTO users (...)
↓
Create session: Log them in automatically
↓
Return: { success: true, user: {...}, redirect: "/dashboard" }
```

---

#### `propledger-nextjs/app/api/auth/logout/route.ts` (Logout API)
**What it does:**
- Handles user logout
- Very simple: just delete the session

**Step-by-step:**
1. Get session token from cookie
2. Delete session from database
3. Delete cookie from browser
4. Return success

---

#### `propledger-nextjs/app/api/auth/session/route.ts` (Check Session API)
**What it does:**
- Checks if user is currently logged in
- Used by frontend to see "who am I?"

**Step-by-step:**
1. Get session token from cookie
2. Look up token in database
3. If found and valid → Return user info
4. If not found → Return null (not logged in)

---

#### `propledger-nextjs/app/api/messages/send/route.ts` (Send Message API)
**What it does:**
- Handles sending messages from user to agent
- Like a **post office** delivering mail

**Step-by-step flow:**

1. **Receive request:** User sends message data
   - manager (agent name), subject, message, priority
2. **Check authentication:** Is user logged in?
   - If not → Return error "Login required"
3. **Validate:** Check all required fields
4. **Save message:** Insert into manager_messages table
5. **Return success:** Send back message ID

**Example:**
```
User sends: { manager: "John Agent", subject: "Question", message: "Hello..." }
↓
Check: User is logged in ✓
↓
Save in database: INSERT INTO manager_messages (...)
↓
Return: { success: true, message_id: 123 }
```

---

#### `propledger-nextjs/app/api/messages/user/route.ts` (Get User Messages API)
**What it does:**
- Gets all messages for the logged-in user
- Like checking your **inbox**

**Step-by-step:**
1. Check authentication
2. Get user ID from session
3. Query database: `SELECT * FROM manager_messages WHERE user_id = ?`
4. Return array of messages

---

#### `propledger-nextjs/app/api/messages/agent/route.ts` (Get Agent Messages API)
**What it does:**
- Gets all messages for a specific agent
- Like checking agent's **inbox**

**Step-by-step:**
1. Check authentication (must be agent)
2. Get agent name from session
3. Query database: `SELECT * FROM manager_messages WHERE manager_name = ?`
4. Return array of messages

---

#### `propledger-nextjs/app/api/messages/reply/route.ts` (Reply to Message API)
**What it does:**
- Allows agent to reply to a message
- Like **replying to an email**

**Step-by-step:**
1. Check authentication (must be agent)
2. Get message ID and reply text
3. Update database: `UPDATE manager_messages SET reply_message = ?, status = 'replied' WHERE id = ?`
4. Return success

---

#### `propledger-nextjs/app/api/tokens/purchase/route.ts` (Purchase Tokens API)
**What it does:**
- Handles token purchases
- Like a **cashier** processing a payment

**Step-by-step flow:**

1. **Receive request:** User sends purchase data
   - token_amount, pkr_amount, payment_method
2. **Check authentication:** Is user logged in?
3. **Validate payment method:** Is it a valid payment option?
4. **Create transaction:** Save transaction in database (status: 'pending')
5. **Process payment:** (This would connect to payment gateway in real app)
6. **Update status:** Change transaction status to 'completed'
7. **Update balance:** Add tokens to user's balance
8. **Return success:** Send back transaction ID

**Example:**
```
User sends: { token_amount: 100, pkr_amount: 10000, payment_method: "credit_card" }
↓
Check: User logged in ✓
↓
Save transaction: INSERT INTO token_transactions (status: 'pending')
↓
Process payment: (simulate payment)
↓
Update: Status = 'completed'
↓
Update balance: user_tokens.token_balance += 100
↓
Return: { success: true, transaction_id: 456 }
```

---

#### `propledger-nextjs/app/api/tokens/balance/route.ts` (Get Token Balance API)
**What it does:**
- Gets user's current token balance
- Like checking your **wallet balance**

**Step-by-step:**
1. Check authentication
2. Get user ID from session
3. Query: `SELECT * FROM user_tokens WHERE user_id = ?`
4. Return balance info

---

#### `propledger-nextjs/app/api/agents/route.ts` (Get Agents API)
**What it does:**
- Gets list of all approved agents
- Like a **directory** of agents

**Step-by-step:**
1. Query database: `SELECT * FROM agents WHERE status = 'approved'`
2. Join with users table to get agent names and emails
3. Return array of agents

---

#### `propledger-nextjs/app/api/stats/route.ts` (Get Statistics API)
**What it does:**
- Gets platform statistics for dashboard
- Like a **report card** showing numbers

**Step-by-step:**
1. Run multiple queries:
   - Count total users
   - Count total properties
   - Count total transactions
   - Calculate total token sales
2. Combine all numbers
3. Return statistics object

---

### PART 4: PHP BACKEND FILES
*These are older PHP files that also handle backend requests*

#### `managers/get_agents.php` (PHP Get Agents)
**What it does:**
- Same as Next.js `/api/agents` but written in PHP
- Gets list of all agents

**Step-by-step:**
1. Include database connection
2. Set CORS headers (allow Next.js to call this)
3. Query database: `SELECT * FROM agents JOIN users ...`
4. Return JSON response

**Why it exists:**
- Legacy code from before Next.js migration
- Still works, but Next.js version is preferred

---

#### `managers/send_message.php` (PHP Send Message)
**What it does:**
- Same as Next.js `/api/messages/send` but in PHP
- Handles sending messages

**Step-by-step:**
1. Include database connection
2. Check if user is logged in (session check)
3. Validate input data
4. Insert message into database
5. Return JSON response

---

#### `managers/get_user_messages.php` (PHP Get User Messages)
**What it does:**
- Gets messages for a user (PHP version)

**Step-by-step:**
1. Check authentication
2. Get user ID from session
3. Query: `SELECT * FROM manager_messages WHERE user_id = ?`
4. Return JSON array

---

#### `managers/get_agent_messages.php` (PHP Get Agent Messages)
**What it does:**
- Gets messages for an agent (PHP version)

**Step-by-step:**
1. Check authentication (must be agent)
2. Get agent name
3. Query: `SELECT * FROM manager_messages WHERE manager_name = ?`
4. Return JSON array

---

### PART 5: DATABASE SETUP FILES

#### `setup_database.sql` (Database Schema)
**What it does:**
- Creates all database tables
- Like building the **structure** of a house

**What it creates:**

1. **`users` table** - Stores all user accounts
   - Columns: id, email, password_hash, full_name, user_type, etc.

2. **`user_sessions` table** - Stores login sessions
   - Columns: id, user_id, session_token, expires_at

3. **`agents` table** - Stores agent-specific data
   - Columns: id, user_id, license_number, experience, rating, etc.

4. **`properties` table** - Stores property listings
   - Columns: id, title, location, price, token_price, etc.

5. **`manager_messages` table** - Stores messages
   - Columns: id, user_id, manager_name, subject, message, status, etc.

6. **`user_tokens` table** - Stores token balances
   - Columns: id, user_id, token_balance, total_purchased, etc.

7. **`token_transactions` table** - Stores all transactions
   - Columns: id, user_id, transaction_type, token_amount, status, etc.

8. **`payment_methods` table** - Stores payment options
   - Columns: id, method_name, display_name, processing_fee, etc.

**Also inserts:**
- Demo users (investor@propledger.com, agent@propledger.com)
- Demo agent data
- Payment methods (credit card, bank transfer, etc.)

---

## 🔄 COMPLETE FLOW EXAMPLES

### Example 1: User Login Flow (Step by Step)

```
1. USER ACTION:
   User types email and password, clicks "Login"
   
2. FRONTEND (login/page.tsx):
   Sends POST request to /api/auth/login
   Data: { email: "john@example.com", password: "mypass123" }
   
3. BACKEND (app/api/auth/login/route.ts):
   - Receives the request
   - Calls: db.getUserByEmail("john@example.com")
   
4. DATABASE (lib/db.ts):
   - Executes: SELECT * FROM users WHERE email = "john@example.com"
   - Returns: User data with password_hash
   
5. BACKEND (app/api/auth/login/route.ts):
   - Calls: auth.verifyPassword("mypass123", password_hash)
   
6. AUTH (lib/auth.ts):
   - Uses bcrypt to compare passwords
   - Returns: true (passwords match!)
   
7. BACKEND (app/api/auth/login/route.ts):
   - Calls: auth.createSession(user)
   
8. AUTH (lib/auth.ts):
   - Generates random token: "abc123xyz..."
   - Calls: db.createSession(userId, token, expiresAt)
   
9. DATABASE (lib/db.ts):
   - Executes: INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (...)
   - Saves session in database
   
10. AUTH (lib/auth.ts):
    - Sets cookie in browser: propledger_session = "abc123xyz..."
    
11. BACKEND (app/api/auth/login/route.ts):
    - Returns: { success: true, user: {...}, redirect: "/dashboard" }
    
12. FRONTEND (login/page.tsx):
    - Receives success response
    - Saves user data in localStorage
    - Redirects to /dashboard
```

---

### Example 2: Send Message Flow (Step by Step)

```
1. USER ACTION:
   User types message, clicks "Send"
   
2. FRONTEND (MessageModal.tsx):
   Sends POST request to /api/messages/send
   Data: { manager: "John Agent", subject: "Question", message: "Hello..." }
   
3. BACKEND (app/api/messages/send/route.ts):
   - Receives the request
   - Calls: auth.getCurrentUser() to check if logged in
   
4. AUTH (lib/auth.ts):
   - Gets session token from cookie
   - Calls: db.getSessionByToken(token)
   
5. DATABASE (lib/db.ts):
   - Executes: SELECT * FROM user_sessions WHERE session_token = "..."
   - Returns: Session with user info
   
6. BACKEND (app/api/messages/send/route.ts):
   - User is logged in! ✓
   - Calls: db.createMessage({ user_id, manager_name, subject, message, ... })
   
7. DATABASE (lib/db.ts):
   - Executes: INSERT INTO manager_messages (user_id, manager_name, subject, message, ...) VALUES (...)
   - Saves message in database
   - Returns: message_id = 123
   
8. BACKEND (app/api/messages/send/route.ts):
   - Returns: { success: true, message_id: 123 }
   
9. FRONTEND (MessageModal.tsx):
   - Receives success
   - Shows "Message sent!" notification
   - Refreshes message list
```

---

### Example 3: Token Purchase Flow (Step by Step)

```
1. USER ACTION:
   User selects 100 tokens, payment method, clicks "Purchase"
   
2. FRONTEND (buy-tokens/page.tsx):
   Sends POST request to /api/tokens/purchase
   Data: { token_amount: 100, pkr_amount: 10000, payment_method: "credit_card" }
   
3. BACKEND (app/api/tokens/purchase/route.ts):
   - Receives the request
   - Checks authentication
   - Validates payment method
   - Calls: db.createTokenTransaction({ user_id, token_amount, pkr_amount, status: 'pending' })
   
4. DATABASE (lib/db.ts):
   - Executes: INSERT INTO token_transactions (...)
   - Saves transaction with status 'pending'
   - Returns: transaction_id = 456
   
5. BACKEND (app/api/tokens/purchase/route.ts):
   - (In real app: Process payment with payment gateway)
   - For now: Simulate payment success
   - Calls: db.updateTransactionStatus(456, 'completed')
   
6. DATABASE (lib/db.ts):
   - Executes: UPDATE token_transactions SET status = 'completed' WHERE id = 456
   
7. BACKEND (app/api/tokens/purchase/route.ts):
   - Calls: db.createOrUpdateUserTokens(userId)
   
8. DATABASE (lib/db.ts):
   - Executes: UPDATE user_tokens SET token_balance = token_balance + 100 WHERE user_id = ?
   - Adds 100 tokens to user's balance
   
9. BACKEND (app/api/tokens/purchase/route.ts):
   - Returns: { success: true, transaction_id: 456, new_balance: 100 }
   
10. FRONTEND (buy-tokens/page.tsx):
    - Receives success
    - Shows "Purchase successful!"
    - Updates balance display
```

---

## 🗄️ DATABASE TABLES EXPLAINED

### `users` Table
**Purpose:** Stores all user accounts

**Columns:**
- `id` - Unique number for each user (like ID card number)
- `email` - User's email address (must be unique)
- `password_hash` - Scrambled password (not readable)
- `full_name` - User's full name
- `user_type` - Type: 'investor', 'agent', 'property_owner', 'developer'
- `phone` - Phone number
- `country` - Country name
- `is_active` - Is account active? (true/false)
- `created_at` - When account was created

**Example Row:**
```
id: 1
email: "john@example.com"
password_hash: "$2a$10$xyz..."
full_name: "John Doe"
user_type: "investor"
phone: "+1234567890"
country: "Pakistan"
is_active: 1
created_at: "2024-01-15 10:30:00"
```

---

### `user_sessions` Table
**Purpose:** Stores login sessions (who is logged in)

**Columns:**
- `id` - Unique number
- `user_id` - Which user (links to users table)
- `session_token` - Random secret code
- `expires_at` - When session expires
- `created_at` - When session was created

**Example Row:**
```
id: 5
user_id: 1
session_token: "a7f3b9c2d1e4f5g6h7i8j9k0l1m2n3o4p5"
expires_at: "2024-02-15 10:30:00"
created_at: "2024-01-15 10:30:00"
```

---

### `agents` Table
**Purpose:** Stores agent-specific information

**Columns:**
- `id` - Unique number
- `user_id` - Links to users table (which user is this agent)
- `license_number` - Agent's license number
- `experience` - Years of experience
- `specialization` - What they specialize in
- `city` - Which city
- `rating` - Average rating (1-5)
- `status` - 'pending', 'approved', 'rejected'

**Example Row:**
```
id: 1
user_id: 2
license_number: "LIC-2024-001"
experience: "5 years"
specialization: "Residential Properties"
city: "Islamabad"
rating: 4.8
status: "approved"
```

---

### `manager_messages` Table
**Purpose:** Stores messages between users and agents

**Columns:**
- `id` - Unique number
- `user_id` - Which user sent it
- `manager_name` - Which agent it's for
- `subject` - Message subject
- `message` - Message content
- `priority` - 'normal', 'high', 'urgent'
- `status` - 'unread', 'read', 'replied'
- `reply_message` - Agent's reply (if any)
- `created_at` - When message was sent

**Example Row:**
```
id: 10
user_id: 1
manager_name: "John Agent"
subject: "Question about property"
message: "Hello, I have a question..."
priority: "normal"
status: "unread"
reply_message: null
created_at: "2024-01-15 11:00:00"
```

---

### `user_tokens` Table
**Purpose:** Tracks how many tokens each user has

**Columns:**
- `id` - Unique number
- `user_id` - Which user
- `token_balance` - Current balance (how many tokens they have)
- `total_purchased` - Total tokens ever purchased
- `total_spent` - Total tokens ever spent
- `last_purchase_at` - When they last bought tokens

**Example Row:**
```
id: 1
user_id: 1
token_balance: 500
total_purchased: 1000
total_spent: 500
last_purchase_at: "2024-01-10 14:30:00"
```

---

### `token_transactions` Table
**Purpose:** Records every token transaction (purchase, spend, refund)

**Columns:**
- `id` - Unique number
- `user_id` - Which user
- `transaction_type` - 'purchase', 'spend', 'refund'
- `token_amount` - How many tokens
- `pkr_amount` - How much in Pakistani Rupees
- `payment_method` - How they paid (credit_card, bank_transfer, etc.)
- `status` - 'pending', 'completed', 'failed', 'cancelled'
- `created_at` - When transaction was created

**Example Row:**
```
id: 50
user_id: 1
transaction_type: "purchase"
token_amount: 100
pkr_amount: 10000
payment_method: "credit_card"
status: "completed"
created_at: "2024-01-15 12:00:00"
```

---

## 🔑 KEY CONCEPTS EXPLAINED

### 1. **Session vs Cookie**
- **Session:** Stored in database, contains user info
- **Cookie:** Stored in browser, contains session token (like a ticket)
- **How they work together:**
  - Browser sends cookie with token
  - Backend looks up token in database
  - Finds session, gets user info

### 2. **Password Hashing**
- **Plain password:** "mypassword123" (BAD - anyone can read)
- **Hashed password:** "$2a$10$xyz..." (GOOD - scrambled, can't be reversed)
- **Why:** If database is hacked, passwords are safe
- **How login works:**
  - User types password
  - System hashes it
  - Compares with stored hash
  - If match = login success

### 3. **API Routes**
- **What:** URLs that handle requests (like phone numbers)
- **Example:** `/api/auth/login` handles login requests
- **Methods:**
  - GET: Get data (like reading)
  - POST: Create/send data (like writing)
  - PUT: Update data
  - DELETE: Delete data

### 4. **Database Queries**
- **SELECT:** Get data (read)
  - Example: `SELECT * FROM users WHERE email = "john@example.com"`
- **INSERT:** Add new data (create)
  - Example: `INSERT INTO users (email, password) VALUES ("john@example.com", "hash")`
- **UPDATE:** Change existing data
  - Example: `UPDATE users SET is_active = 0 WHERE id = 5`
- **DELETE:** Remove data
  - Example: `DELETE FROM user_sessions WHERE expires_at < NOW()`

### 5. **CORS (Cross-Origin Resource Sharing)**
- **What:** Allows Next.js (port 3000) to call PHP files (port 80)
- **Why needed:** Browsers block requests between different ports/domains
- **How:** PHP files send special headers allowing Next.js to access them

---

## 📝 SUMMARY

### Backend Files Purpose:

1. **Database Connection Files:**
   - `config/database.php` - PHP database connection
   - `lib/db.ts` - Next.js database connection + all query functions

2. **Authentication Files:**
   - `lib/auth.ts` - Password hashing, session management, login verification

3. **API Route Files (Next.js):**
   - `app/api/auth/*` - Login, signup, logout, session
   - `app/api/messages/*` - Send, get, reply to messages
   - `app/api/tokens/*` - Purchase tokens, get balance, transactions
   - `app/api/agents/*` - Get agents list
   - `app/api/stats/*` - Get statistics

4. **PHP Backend Files:**
   - `managers/*.php` - Legacy PHP APIs (same functions as Next.js routes)

5. **Database Setup:**
   - `setup_database.sql` - Creates all tables and demo data

### How Everything Connects:

```
User clicks button
    ↓
Frontend sends request
    ↓
API Route receives request
    ↓
Calls lib/db.ts functions
    ↓
lib/db.ts queries database
    ↓
Database returns data
    ↓
API Route processes data
    ↓
Returns response to frontend
    ↓
Frontend displays result
```

---

**This is everything you need to understand the backend! Each file has a specific job, and they all work together to make the application function.**



