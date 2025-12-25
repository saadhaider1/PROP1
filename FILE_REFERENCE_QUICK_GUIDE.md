# PROPLEDGER - Quick File Reference Guide

## 📁 Complete File List with Purposes

### 🎨 FRONTEND FILES (Next.js)

#### Root & Configuration
| File | Purpose |
|------|---------|
| `propledger-nextjs/app/layout.tsx` | Root layout, wraps all pages with session provider |
| `propledger-nextjs/app/page.tsx` | Homepage with hero section and features |
| `propledger-nextjs/app/globals.css` | Global CSS styles (Tailwind) |
| `propledger-nextjs/next.config.js` | Next.js configuration (images, domains) |
| `propledger-nextjs/tailwind.config.ts` | Tailwind CSS configuration |
| `propledger-nextjs/package.json` | Dependencies and scripts |

#### Authentication Pages
| File | Purpose |
|------|---------|
| `app/login/page.tsx` | User/Agent login page (email + Google OAuth) |
| `app/signup/page.tsx` | User registration page (all user types) |
| `app/forgot-password/page.tsx` | Password reset request page |

#### Dashboard Pages
| File | Purpose |
|------|---------|
| `app/dashboard/page.tsx` | Main user dashboard (investments, properties) |
| `app/agent-dashboard/page.tsx` | Agent-specific dashboard (messages, clients) |
| `app/admin/dashboard/page.tsx` | Admin dashboard (system stats) |
| `app/admin/login/page.tsx` | Admin login page |

#### Property Pages
| File | Purpose |
|------|---------|
| `app/properties/page.tsx` | Property listing page (grid view, filters) |
| `app/properties/[id]/page.tsx` | Individual property detail page |

#### Investment Pages
| File | Purpose |
|------|---------|
| `app/investments/page.tsx` | Investment opportunities listing |
| `app/investments/[id]/page.tsx` | Individual investment detail page |
| `app/buy-tokens/page.tsx` | Token purchase page (payment methods) |

#### Crowdfunding Pages
| File | Purpose |
|------|---------|
| `app/crowdfunding/page.tsx` | Crowdfunding campaigns listing |
| `app/crowdfunding/[id]/page.tsx` | Individual campaign detail page |

#### Other Pages
| File | Purpose |
|------|---------|
| `app/managers/page.tsx` | Portfolio managers listing (video calls, messaging) |
| `app/about/page.tsx` | About page |
| `app/support/page.tsx` | Support/help page |

#### API Routes - Authentication (`app/api/auth/`)
| File | Purpose | Method |
|------|---------|--------|
| `login/route.ts` | Handle user login | POST |
| `signup/route.ts` | Handle user registration | POST |
| `logout/route.ts` | Handle user logout | POST |
| `session/route.ts` | Get current session | GET |
| `[...nextauth]/route.ts` | NextAuth OAuth handler | GET/POST |
| `forgot-password/route.ts` | Password reset request | POST |
| `reset-password/route.ts` | Complete password reset | POST |
| `verify-pin/route.ts` | Verify reset PIN | POST |

#### API Routes - Messages (`app/api/messages/`)
| File | Purpose | Method |
|------|---------|--------|
| `send/route.ts` | Send message to agent | POST |
| `user/route.ts` | Get user's messages | GET |
| `agent/route.ts` | Get agent's messages | GET |
| `reply/route.ts` | Agent reply to message | POST |
| `mark-read/route.ts` | Mark message as read | POST |
| `delete/route.ts` | Delete message | DELETE |

#### API Routes - Tokens (`app/api/tokens/`)
| File | Purpose | Method |
|------|---------|--------|
| `balance/route.ts` | Get user token balance | GET |
| `purchase/route.ts` | Purchase tokens | POST |
| `payment-methods/route.ts` | Get payment methods | GET |
| `transactions/route.ts` | Get transaction history | GET |

#### API Routes - Other (`app/api/`)
| File | Purpose | Method |
|------|---------|--------|
| `agents/route.ts` | Get all agents | GET |
| `stats/route.ts` | Get platform statistics | GET |

#### Components (`components/`)
| File | Purpose |
|------|---------|
| `Navbar.tsx` | Navigation bar with user menu |
| `Footer.tsx` | Site footer component |
| `PropertyCard.tsx` | Reusable property card component |
| `LoadingScreen.tsx` | Loading animation component |
| `MessageModal.tsx` | Messaging modal (send/receive) |
| `InvestmentModal.tsx` | Investment modal component |
| `Toast.tsx` | Toast notification component |
| `ErrorBoundary.tsx` | Error boundary for error handling |
| `SessionProviderWrapper.tsx` | Session context provider wrapper |
| `SkeletonLoader.tsx` | Loading skeleton component |
| `TokenTransactions.tsx` | Token transaction list component |
| `ScrollAnimations.tsx` | Scroll animation utilities |

#### Admin Components (`components/admin/`)
| File | Purpose |
|------|---------|
| `PropertyUploadForm.tsx` | Admin property upload form |
| `InvestmentUploadForm.tsx` | Admin investment upload form |
| `CrowdfundingUploadForm.tsx` | Admin crowdfunding upload form |

#### Libraries (`lib/`)
| File | Purpose |
|------|---------|
| `db.ts` | Database connection and query functions (MySQL) |
| `auth.ts` | Authentication utilities (bcrypt, JWT, sessions) |
| `mail.ts` | Email sending utilities (PHPMailer) |
| `validation.ts` | Form validation schemas (Zod) |
| `security.ts` | Security utilities (CSRF, rate limiting) |

---

### ⚙️ BACKEND FILES (PHP)

#### Configuration
| File | Purpose |
|------|---------|
| `config/database.php` | MySQL database connection (PDO) |
| `router.php` | PHP built-in server router |

#### Manager API (`managers/`)
| File | Purpose |
|------|---------|
| `get_agents.php` | Get list of agents (JSON API) |
| `get_agent_data.php` | Get specific agent data |
| `send_message.php` | Send message (JSON API) |
| `get_user_messages.php` | Get user messages (JSON API) |
| `get_agent_messages.php` | Get agent messages (JSON API) |
| `get_agent_received_messages.php` | Get agent received messages |
| `get_agent_messages_fixed.php` | Fixed version of agent messages |
| `send_agent_reply.php` | Agent reply to message |
| `mark_message_read.php` | Mark single message as read |
| `mark_messages_read.php` | Mark multiple messages as read |
| `delete_message.php` | Delete message |
| `rate_agent.php` | Rate an agent |
| `get_user_notifications.php` | Get user notifications |
| `initiate_call.php` | Initiate video call |
| `update_call_status.php` | Update video call status |
| `check_incoming_calls.php` | Check for incoming calls |
| `update_agent_status.php` | Update agent availability status |
| `setup_video_table.php` | Setup video_calls table |
| `simple_test_messages.php` | Test messaging system |
| `debug_agent_messages.php` | Debug agent messages |

#### Admin (`admin/`)
| File | Purpose |
|------|---------|
| `get_stats.php` | Get admin statistics |

#### Setup Scripts (`php/`)
| File | Purpose |
|------|---------|
| `setup_database.php` | Database setup script |
| `test_db_connection.php` | Test database connection |
| `create_test_user.php` | Create test user |
| `create_agents_table.php` | Create agents table |
| `create_messages_table.php` | Create messages table |
| `create_ratings_table.php` | Create ratings table |
| `update_messages_table.php` | Update messages table schema |
| `update_oauth_schema.php` | Update OAuth table schema |
| `fix_oauth_table.php` | Fix OAuth table |
| `fix_messaging_system.php` | Fix messaging system |
| `quick_setup_messages.php` | Quick setup for messages |
| `test_agent_flow.php` | Test agent registration flow |
| `test_agent_registration.php` | Test agent registration |
| `test_new_agent_registration.php` | Test new agent registration |
| `test_managers_display.php` | Test managers display |
| `test_send_message_to_agent.php` | Test sending message to agent |
| `test_oauth_setup.php` | Test OAuth setup |
| `test_direct_api.php` | Test direct API calls |
| `check_agents_simple.php` | Simple agent check |
| `debug_agents_api.php` | Debug agents API |
| `create_oauth_table_direct.sql` | Direct SQL for OAuth table |

#### Root Setup Files
| File | Purpose |
|------|---------|
| `setup_database.sql` | **MAIN DATABASE SCHEMA** - Import this in phpMyAdmin |
| `update_admin_schema.sql` | Admin table updates |
| `password_resets_schema.sql` | Password reset table schema |
| `setup_admin.php` | Admin setup script |

---

### 🗄️ DATABASE FILES

#### SQL Schema Files
| File | Purpose |
|------|---------|
| `setup_database.sql` | **PRIMARY SCHEMA** - Creates all tables, inserts demo data |
| `update_admin_schema.sql` | Admin table schema updates |
| `password_resets_schema.sql` | Password reset table schema |
| `propledger-nextjs/database-schema.sql` | PostgreSQL schema (not used - project uses MySQL) |
| `propledger-nextjs/database-tokens-schema.sql` | Token tables schema (PostgreSQL) |

#### Database Tables (in `propledger_db`)
| Table | Purpose |
|-------|---------|
| `users` | User accounts (all types) |
| `user_sessions` | Active user sessions |
| `agents` | Agent-specific data |
| `properties` | Property listings |
| `manager_messages` | Messages between users and agents |
| `user_tokens` | User token balances |
| `token_transactions` | Token transaction history |
| `payment_methods` | Available payment methods |
| `oauth_states` | OAuth state tokens (security) |
| `password_resets` | Password reset PINs |
| `video_calls` | Video call records |
| `agent_ratings` | Agent ratings and reviews |
| `agent_replies` | Agent message replies |
| `agent_client_messages` | Agent-client messages |
| `agent_sessions` | Agent sessions |

---

### 📦 STATIC FILES

#### JavaScript (`js/`)
| File | Purpose |
|------|---------|
| `auth.js` | Client-side authentication utilities |
| `main.js` | Main JavaScript file |
| `payment.js` | Payment processing utilities |
| `video-call-notifications.js` | Video call notification handling |
| `video-integrations.js` | Video call integration (Jitsi) |

#### HTML Test Files (`html/`)
| File | Purpose |
|------|---------|
| `test_auth_flow.html` | Test authentication flow |
| `test_messaging_system.html` | Test messaging system |
| `test_rating_debug.html` | Test rating system |

#### Images (`images/`)
| File | Purpose |
|------|---------|
| `house1.jpg` | Property image |
| `house 2_files/` | Property image files |

#### Libraries (`lib/PHPMailer/`)
| File | Purpose |
|------|---------|
| `PHPMailer.php` | PHPMailer email library |
| `SMTP.php` | SMTP configuration |
| `Exception.php` | PHPMailer exceptions |

---

### 📚 DOCUMENTATION FILES

#### Main Documentation (`md/` and `propledger-nextjs/readme/`)
| File | Purpose |
|------|---------|
| `PROJECT_ARCHITECTURE_GUIDE.md` | **COMPLETE ARCHITECTURE GUIDE** (this file) |
| `FILE_REFERENCE_QUICK_GUIDE.md` | **QUICK FILE REFERENCE** (this file) |
| `README.md` | Main project README |
| `propledger-nextjs/README.md` | Next.js app README |
| Various `.md` files | Feature-specific documentation |

---

## 🔄 DATA FLOW SUMMARY

### Login Flow
```
login/page.tsx → /api/auth/login → lib/db.ts → MySQL users table → lib/auth.ts → Session cookie
```

### Signup Flow
```
signup/page.tsx → /api/auth/signup → lib/db.ts → MySQL users/agents tables → Session cookie
```

### Message Flow
```
MessageModal.tsx → /api/messages/send → lib/db.ts → MySQL manager_messages table
```

### Token Purchase Flow
```
buy-tokens/page.tsx → /api/tokens/purchase → lib/db.ts → MySQL token_transactions + user_tokens tables
```

### Property Listing Flow
```
properties/page.tsx → Direct query or API → lib/db.ts → MySQL properties table → PropertyCard.tsx
```

---

## 🎯 KEY FILES FOR PRESENTATION

### Must Show Files:
1. ✅ `setup_database.sql` - Database structure
2. ✅ `app/login/page.tsx` - Login implementation
3. ✅ `app/api/auth/login/route.ts` - Login API
4. ✅ `lib/db.ts` - Database connection
5. ✅ `lib/auth.ts` - Authentication logic
6. ✅ `app/dashboard/page.tsx` - Main dashboard
7. ✅ `components/Navbar.tsx` - Navigation component

### Important Configuration:
1. ✅ `config/database.php` - Database config
2. ✅ `propledger-nextjs/.env.local` - Environment variables
3. ✅ `propledger-nextjs/package.json` - Dependencies

---

## 📊 File Count Summary

- **TypeScript/TSX Files**: ~50 files
- **PHP Files**: ~30 files
- **SQL Files**: 5 files
- **Component Files**: 15 files
- **API Route Files**: 20+ files
- **Configuration Files**: 5 files
- **Documentation Files**: 20+ files

**Total**: ~150+ files

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
cd propledger-nextjs
npm install

# Start development server
npm run dev

# Access application
# Frontend: http://localhost:3000
# phpMyAdmin: http://localhost/phpmyadmin
```

---

**Use this guide during your presentation to quickly reference any file's purpose!**



