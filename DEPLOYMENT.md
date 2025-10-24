# AIVRA Deployment Guide

This guide will help you deploy AIVRA from your local terminal environment to a live website accessible via a custom domain.

## Prerequisites

- GitHub account
- This repository pushed to GitHub
- A custom domain (can be purchased during deployment)

## Step 1: Purchase a Custom Domain

Choose one of these registrars:

### Option A: Cloudflare (Recommended)
- Go to [cloudflare.com](https://www.cloudflare.com/)
- Search for your desired domain name
- Purchase domain (~$10/year for .com)
- Keep the Cloudflare dashboard open for DNS configuration later

### Option B: Namecheap
- Go to [namecheap.com](https://www.namecheap.com/)
- Search and purchase your domain (~$12/year for .com)
- Keep the Namecheap dashboard open for DNS configuration later

## Step 2: Deploy to Vercel

1. **Sign Up for Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Sign Up" and use your GitHub account

2. **Import Your Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your AIVRA repository from the list
   - Vercel will auto-detect it as a Next.js project

3. **Configure Environment Variables**

   **IMPORTANT: Get Your Supabase Credentials First**
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project (or create a new one)
   - Go to Settings > API
   - Copy your "Project URL" and "anon public" key

   - Before clicking "Deploy", expand "Environment Variables"
   - Add the following required variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
     ```

   - (Optional) If you want file upload support, add:
     ```
     UPLOADTHING_TOKEN=your_uploadthing_token
     ```

   - (Optional) If you want share feature, add Upstash KV credentials:
     ```
     KV_URL=your_kv_url
     KV_REST_API_TOKEN=your_token
     KV_REST_API_URL=your_api_url
     KV_REST_API_READ_ONLY_TOKEN=your_readonly_token
     ```

   **⚠️ SECURITY WARNING:** Never share these credentials publicly or commit them to version control!

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a temporary URL like `your-project.vercel.app`
   - Test the app at this URL to make sure everything works

## Step 3: Connect Your Custom Domain

1. **Add Domain in Vercel**
   - In your Vercel project dashboard, go to "Settings"
   - Click "Domains" in the sidebar
   - Enter your purchased domain (e.g., `yourvideoapp.com`)
   - Click "Add"

2. **Configure DNS**

   Vercel will provide DNS records to add. Here's what to do for each registrar:

   ### For Cloudflare:
   - In Cloudflare dashboard, go to "DNS" > "Records"
   - Add the DNS records Vercel provided (usually an A record and/or CNAME)
   - Make sure the proxy status (orange cloud) is set to "Proxied"
   - Click "Save"

   ### For Namecheap:
   - In Namecheap dashboard, go to "Domain List"
   - Click "Manage" next to your domain
   - Go to "Advanced DNS"
   - Add the DNS records Vercel provided
   - Click "Save All Changes"

3. **Wait for DNS Propagation**
   - DNS changes typically take 10-60 minutes
   - You can check status at [dnschecker.org](https://dnschecker.org/)
   - Vercel will automatically provision an SSL certificate once DNS is configured

4. **Verify Deployment**
   - Visit your custom domain in a browser
   - The app should load with a secure HTTPS connection
   - Test all features:
     - API key dialog (add your FAL and Runware keys)
     - Create a new project
     - Upload or generate media
     - Edit timeline
     - Export video

## Optional: Set Up Share Feature

If you want users to be able to share projects via links:

1. **Sign up for Upstash KV**
   - Go to [upstash.com](https://upstash.com/)
   - Create a free account
   - Create a new Redis database
   - Copy the credentials provided

2. **Add Upstash Variables to Vercel**
   - In Vercel project settings > Environment Variables
   - Add the KV credentials from Upstash
   - Redeploy the project (Vercel > Deployments > three dots > Redeploy)

## Optional: Set Up File Upload

If you want users to be able to upload files directly:

1. **Sign up for UploadThing**
   - Go to [uploadthing.com](https://uploadthing.com/)
   - Create a free account
   - Create a new app
   - Copy your API token

2. **Add UploadThing Token to Vercel**
   - In Vercel project settings > Environment Variables
   - Add `UPLOADTHING_TOKEN` with your token
   - Redeploy the project

## Automatic Deployments

Once deployed, Vercel automatically:
- Deploys every push to your main/master branch
- Creates preview deployments for pull requests
- Handles SSL certificate renewal
- Distributes your app via global CDN

To update your live site, just push changes to GitHub!

## Troubleshooting

### Build Failed
- Check Vercel build logs for errors
- Ensure all environment variables are set correctly
- Make sure your repository has all necessary files

### Domain Not Loading
- Wait longer (DNS can take up to 24 hours in rare cases)
- Verify DNS records match what Vercel provided
- Check that your domain registrar account is active

### App Loads But Features Don't Work
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure users are adding their own FAL/Runware API keys

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: [Your Repository Issues Page]

## Security Best Practices

### Critical Security Requirements

1. **Environment Variables**
   - **NEVER** commit your `.env` file to version control
   - **NEVER** share your actual credentials in documentation or issues
   - Always use placeholder values in example files
   - Rotate credentials immediately if accidentally exposed

2. **Supabase Credentials**
   - The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is designed to be used in client-side code
   - However, it should still be treated as sensitive and not publicly shared
   - Enable Row Level Security (RLS) policies on all Supabase tables
   - Never expose your Supabase service role key

3. **User API Keys**
   - User FAL/Runware keys are stored only in browser localStorage
   - Keys never leave the user's browser
   - No keys are sent to your servers

4. **Data Privacy**
   - All user projects and media are stored locally in the browser's IndexedDB
   - No user data is transmitted to your servers
   - Share feature (if enabled) only stores video URLs, not the actual content

### What To Do If Credentials Are Exposed

1. **Immediately** rotate the exposed credentials:
   - For Supabase: Generate a new project or reset your anon key
   - For UploadThing: Regenerate your API token
   - For Upstash KV: Create a new database or rotate keys

2. Update all deployed instances with new credentials

3. If exposed in git history:
   - Consider the credentials permanently compromised
   - Use `git-filter-repo` or similar tools to remove from history
   - Force push (only if you're the sole contributor)

### Secure Development Workflow

1. Copy `.env.example` to `.env` for local development
2. Add your real credentials to `.env` only
3. Never modify `.env.example` with real credentials
4. Verify `.gitignore` includes `.env` before committing
5. Use environment variable validation in your code
