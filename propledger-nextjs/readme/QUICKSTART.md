# PROPLEDGER Next.js - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (Already Done)

```bash
cd propledger-nextjs
npm install
```

### Step 2: Set Up Database

#### Option A: Vercel Postgres (Recommended for Production)

1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Link project:
   ```bash
   vercel link
   ```
4. Create Postgres database in Vercel Dashboard → Storage
5. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```
6. Run database schema:
   ```bash
   # Install psql if needed, then:
   psql $POSTGRES_URL < database-schema.sql
   ```

#### Option B: Local PostgreSQL (For Development)

1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE propledger_db;
   ```
3. Create `.env.local`:
   ```env
   POSTGRES_URL="postgres://postgres:password@localhost:5432/propledger_db"
   POSTGRES_PRISMA_URL="postgres://postgres:password@localhost:5432/propledger_db"
   POSTGRES_URL_NON_POOLING="postgres://postgres:password@localhost:5432/propledger_db"
   POSTGRES_USER="postgres"
   POSTGRES_HOST="localhost"
   POSTGRES_PASSWORD="your_password"
   POSTGRES_DATABASE="propledger_db"
   
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="run: openssl rand -base64 32"
   JWT_SECRET="run: openssl rand -base64 32"
   ```
4. Run schema:
   ```bash
   psql -U postgres -d propledger_db -f database-schema.sql
   ```

### Step 3: Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

Add these to your `.env.local` file.

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Verify Installation

### Test API Endpoints

1. **Check Health**: Open http://localhost:3000/api/agents
2. **Test Signup**: 
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "+1234567890",
       "country": "Pakistan",
       "userType": "investor",
       "password": "password123",
       "terms": true
     }'
   ```

3. **Test Login**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## 📁 Project Structure

```
propledger-nextjs/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Login, signup, session, logout
│   │   ├── agents/       # Get agents list
│   │   └── messages/     # Send/receive messages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── lib/
│   ├── db.ts             # Database queries
│   └── auth.ts           # Authentication utilities
├── database-schema.sql   # PostgreSQL schema
├── .env.local            # Environment variables (create this)
└── package.json
```

## 🔧 Common Issues

### "Cannot find module" errors
**Solution**: Run `npm install`

### Database connection failed
**Solution**: Check `.env.local` has correct database credentials

### Port 3000 already in use
**Solution**: 
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

## 🚀 Deploy to Vercel

```bash
# Login
vercel login

# Deploy
vercel --prod
```

Or push to GitHub and import in Vercel Dashboard.

## 📚 Next Steps

1. ✅ Backend API is ready
2. ⏳ Create React pages (login, signup, dashboard, etc.)
3. ⏳ Copy CSS styles from original project
4. ⏳ Test all features
5. ⏳ Deploy to production

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `database-schema.sql` for database structure
- Look at `lib/db.ts` for available database queries
- Check `lib/auth.ts` for authentication functions

## 🎉 Success!

If you can access http://localhost:3000 and see the homepage, you're ready to go!
