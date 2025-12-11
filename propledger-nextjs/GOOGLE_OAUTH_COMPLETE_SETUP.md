# Google OAuth Setup Guide for PROPLEDGER

## ✅ What's Been Implemented

Google OAuth authentication has been fully integrated into your Next.js application:

### Files Created/Modified:
1. **`app/api/auth/[...nextauth]/route.ts`** - NextAuth.js configuration with Google provider
2. **`app/login/page.tsx`** - Added "Sign in with Google" button
3. **`app/signup/page.tsx`** - Added "Sign up with Google" button
4. **`.env.local.example`** - Added Google OAuth environment variables

### Features:
- ✅ Google OAuth login button on login page
- ✅ Google OAuth signup button on signup page
- ✅ Automatic redirect to dashboard after successful authentication
- ✅ JWT-based session management
- ✅ Professional Google branding with official logo

---

## 🔧 Configuration Steps

To enable Google OAuth, follow these steps:

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: PROPLEDGER
   - User support email: Your email
   - Developer contact: Your email
6. Choose **Web application** as application type
7. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   For production, also add:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
8. Click **Create**
9. Copy your **Client ID** and **Client Secret**

### Step 2: Configure Environment Variables

1. Create `.env.local` file in the project root (if it doesn't exist):
   ```bash
   copy .env.local.example .env.local
   ```

2. Add your Google OAuth credentials to `.env.local`:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID="your-google-client-id-here.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
   ```

3. Generate a secure `NEXTAUTH_SECRET`:
   ```bash
   # On Windows PowerShell:
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   
   # Or use an online generator:
   # https://generate-secret.vercel.app/32
   ```

### Step 3: Restart Development Server

After adding the environment variables, restart your Next.js server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Testing OAuth

1. Navigate to `http://localhost:3000/login`
2. Click **"Sign in with Google"** button
3. You'll be redirected to Google's login page
4. Sign in with your Google account
5. Grant permissions to PROPLEDGER
6. You'll be redirected back to the dashboard

---

## 🔒 Security Notes

- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- Keep your `GOOGLE_CLIENT_SECRET` secure
- Use different credentials for development and production
- Regularly rotate your `NEXTAUTH_SECRET`

---

## 📝 How It Works

1. User clicks "Sign in with Google"
2. NextAuth.js redirects to Google OAuth consent screen
3. User authorizes the application
4. Google redirects back with authorization code
5. NextAuth.js exchanges code for user information
6. User session is created with JWT
7. User is redirected to dashboard

---

## 🎨 UI Features

- **Professional Google branding** with official 4-color logo
- **Disabled state** when loading
- **Error handling** with user-friendly messages
- **Responsive design** matching your dark theme
- **Divider** separating OAuth from email/password login

---

## 🔄 User Flow

### New Users:
1. Click "Sign up with Google" on signup page
2. Authenticate with Google
3. Automatically create account with Google profile data
4. Redirect to dashboard

### Existing Users:
1. Click "Sign in with Google" on login page
2. Authenticate with Google
3. Match existing account by email
4. Redirect to dashboard

---

## 🚀 Production Deployment

When deploying to production (e.g., Vercel):

1. Add production environment variables in your hosting platform
2. Update `NEXTAUTH_URL` to your production domain
3. Add production redirect URI in Google Cloud Console
4. Test OAuth flow in production environment

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)

---

## ✅ Checklist

- [ ] Created Google Cloud project
- [ ] Configured OAuth consent screen
- [ ] Created OAuth 2.0 credentials
- [ ] Added credentials to `.env.local`
- [ ] Generated `NEXTAUTH_SECRET`
- [ ] Restarted development server
- [ ] Tested Google login
- [ ] Tested Google signup

---

**Status**: OAuth integration complete, awaiting Google credentials configuration.
**Last Updated**: November 5, 2025
