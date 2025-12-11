# PROPLEDGER - Next.js Migration

This is the Next.js version of PROPLEDGER, migrated from PHP to a modern React + Next.js stack with Vercel Postgres database.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres (PostgreSQL)
- **Authentication**: Custom JWT + Session-based auth
- **Validation**: Zod
- **Deployment**: Vercel

## 📁 Project Structure

```
propledger-nextjs/
├── app/
│   ├── api/              # API routes (replaces PHP backend)
│   │   ├── auth/         # Authentication endpoints
│   │   ├── agents/       # Agent management
│   │   └── messages/     # Messaging system
│   ├── (pages)/          # React pages (to be created)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── lib/
│   ├── db.ts             # Database queries (replaces PHP database.php)
│   └── auth.ts           # Authentication utilities
├── components/           # React components
├── public/               # Static assets
├── database-schema.sql   # PostgreSQL schema
└── package.json
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd propledger-nextjs
npm install
```

### 2. Set Up Vercel Postgres Database

#### Option A: Using Vercel (Recommended)

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Link your project:
   ```bash
   vercel link
   ```
4. Create a Postgres database:
   - Go to your project in Vercel Dashboard
   - Navigate to Storage → Create Database → Postgres
   - Copy the connection strings

5. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

#### Option B: Using Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
   ```sql
   CREATE DATABASE propledger_db;
   ```
3. Create `.env.local` file:
   ```env
   POSTGRES_URL="postgres://username:password@localhost:5432/propledger_db"
   POSTGRES_PRISMA_URL="postgres://username:password@localhost:5432/propledger_db"
   POSTGRES_URL_NON_POOLING="postgres://username:password@localhost:5432/propledger_db"
   POSTGRES_USER="username"
   POSTGRES_HOST="localhost"
   POSTGRES_PASSWORD="password"
   POSTGRES_DATABASE="propledger_db"
   
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   JWT_SECRET="your-jwt-secret-here"
   ```

### 3. Initialize Database

Run the SQL schema in your Postgres database:

```bash
# If using Vercel Postgres
vercel env pull
psql $POSTGRES_URL < database-schema.sql

# If using local PostgreSQL
psql -U username -d propledger_db -f database-schema.sql
```

### 4. Generate Secrets

Generate secure secrets for authentication:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

Add these to your `.env.local` file.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Check current session
- `POST /api/auth/logout` - Logout user

### Agents
- `GET /api/agents` - Get all agents

### Messages
- `POST /api/messages/send` - Send message to agent
- `GET /api/messages/user` - Get user's messages

## 🔄 Migration from PHP

### What Changed

| PHP Version | Next.js Version |
|-------------|----------------|
| `/auth/*.php` | `/app/api/auth/*.ts` |
| `/managers/*.php` | `/app/api/messages/*.ts` |
| `/config/database.php` | `/lib/db.ts` |
| MySQL | PostgreSQL (Vercel Postgres) |
| Cookie-based sessions | JWT + Cookie sessions |
| HTML pages | React components |

### Database Changes

- MySQL → PostgreSQL
- `AUTO_INCREMENT` → `SERIAL`
- `ENUM('value')` → `VARCHAR CHECK (column IN ('value'))`
- `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` → Same in PostgreSQL

## 🚀 Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Import project in Vercel Dashboard
3. Vercel will auto-detect Next.js
4. Add Postgres database in Storage tab
5. Deploy!

### Manual Deploy

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 🔐 Environment Variables

Required environment variables:

```env
# Database (auto-populated by Vercel)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=
JWT_SECRET=
```

## 📝 Development Workflow

### Adding New API Routes

Create a new file in `app/api/[route]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    // Your logic here
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error' },
      { status: 500 }
    );
  }
}
```

### Adding Database Queries

Add queries to `lib/db.ts`:

```typescript
export const db = {
  async yourQuery(param: string) {
    const result = await sql`SELECT * FROM table WHERE column = ${param}`;
    return result.rows;
  },
};
```

## 🐛 Troubleshooting

### TypeScript Errors

If you see "Cannot find module" errors, run:
```bash
npm install
```

### Database Connection Issues

1. Check `.env.local` has correct database credentials
2. Verify database is running
3. Test connection:
   ```bash
   psql $POSTGRES_URL
   ```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

## 📚 Next Steps

1. ✅ Backend API routes created
2. ⏳ Create React components for pages
3. ⏳ Migrate HTML pages to React
4. ⏳ Copy CSS styles to Tailwind
5. ⏳ Test all features
6. ⏳ Deploy to Vercel

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## 📧 Support

For issues or questions, refer to the original PROPLEDGER documentation or create an issue in the repository.
