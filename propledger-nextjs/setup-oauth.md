# Quick OAuth Setup

## Step 1: Create .env.local file

Copy and paste this into a new file called `.env.local` in the project root:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-generated-secret"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT Secret
JWT_SECRET="your-jwt-secret-here"
```

## Step 2: Generate NEXTAUTH_SECRET

Run this in PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Or visit: https://generate-secret.vercel.app/32

## Step 3: Get Google OAuth Credentials

1. Visit: https://console.cloud.google.com/
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`

## Step 4: Restart Server

```bash
npm run dev
```

## Done! 🎉

Test at: http://localhost:3000/login
