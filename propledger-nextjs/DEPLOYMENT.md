# PropLedger - Deployment Guide

## Recommended Platform: Vercel

**Vercel** is the best platform for deploying your Next.js application. It's created by the same team that built Next.js and offers:

- ✅ Zero configuration deployment
- ✅ Automatic CI/CD from GitHub
- ✅ Edge functions and ISR support
- ✅ Built-in analytics
- ✅ Excellent performance
- ✅ Free tier with generous limits

## Deployment Steps

### 1. Prerequisites
- GitHub repository: `https://github.com/saadhaider1/PROP1.git`
- Supabase project with credentials

### 2. Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository: `saadhaider1/PROP1`
   - Vercel will auto-detect it's a Next.js app

3. **Configure Project**
   - **Root Directory**: `propledger-nextjs`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Environment Variables**
   Add these environment variables in Vercel dashboard:

   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # NextAuth
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_generated_secret

   # Admin Credentials (if needed)
   ADMIN_EMAIL=admin@propledger.com
   ADMIN_PASSWORD=your_admin_password
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like `your-project.vercel.app`

### 3. Post-Deployment

1. **Update Supabase Settings**
   - Go to your Supabase project dashboard
   - Navigate to Authentication → URL Configuration
   - Add your Vercel domain to "Site URL" and "Redirect URLs"

2. **Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

3. **Test Your Application**
   - Visit your deployed URL
   - Test user authentication
   - Test admin dashboard functionality
   - Test property creation and viewing

## Alternative Platforms

### AWS Amplify
- Good for AWS ecosystem integration
- Auto-scaling and CDN included
- More complex setup than Vercel

### Netlify
- Good alternative to Vercel
- Easy deployment from Git
- Similar features but slightly less Next.js optimization

## Continuous Deployment

Once connected to Vercel:
- Every push to `main` branch automatically deploys to production
- Pull requests get preview deployments
- Rollback to previous deployments anytime

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Database Connection Issues
- Verify Supabase credentials in environment variables
- Check Supabase project is active
- Ensure network policies allow Vercel's IPs

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check `NEXTAUTH_SECRET` is set
- Update Supabase redirect URLs

## Support
For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
