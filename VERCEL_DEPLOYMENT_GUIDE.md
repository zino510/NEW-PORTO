# 🚀 Deploy ke Vercel - Step by Step Guide

## 📋 Prerequisites

- [ ] GitHub account & repository created
- [ ] Vercel account (free tier available)
- [ ] Node.js 18+ installed locally
- [ ] Environment variables ready
- [ ] JWT secret generated
- [ ] Project tested locally

---

## Step 1️⃣: Prepare Your Code

### 1.1 Ensure All Files Are Committed

```bash
# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Add hidden login system - ready for production"

# Push to GitHub
git push origin main
```

### 1.2 Verify All Environment Variables

Your `.env.local` should look like:
```env
VITE_FRONTEND_URL=http://localhost:3000
VITE_API_BASE_URL=/api
VITE_REDIRECT_URL=https://2117.zinsyaikh.my.id

FRONTEND_URL=http://localhost:3000

JWT_SECRET=dev-secret-key-change-in-production
AUTH_USERNAME=2117
AUTH_PASSWORD=2117
```

⚠️ **IMPORTANT**: `.env.local` will NOT be uploaded to Vercel. You'll add these as environment variables in the dashboard.

---

## Step 2️⃣: Generate Production Secrets

### 2.1 Generate Secure JWT Secret

```bash
node scripts/generate-jwt-secret.js
```

Output akan berupa 64 karakter random string. **Copy this value** - Anda akan menggunakannya di Vercel.

Example output:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g
```

### 2.2 (Optional) Generate Password Hash

Jika ingin mengubah password dengan hashing:

```bash
node scripts/generate-hash.js MySecurePassword123
```

Output:
```
$2a$10$... (bcrypt hash)
```

Simpan hash ini untuk nanti.

---

## Step 3️⃣: Setup Vercel Project

### Option A: Via Vercel Website (Recommended)

1. Buka [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect GitHub account
4. Select portfolio repository
5. Click "Import"

**Configuration:**
- Framework Preset: `Vite`
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`

6. Click "Deploy"
7. Wait untuk deploy selesai (~2-3 minutes)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Untuk production
vercel --prod
```

---

## Step 4️⃣: Add Environment Variables

### 4.1 Via Vercel Dashboard

1. Dashboard → Pilih Project
2. Settings → Environment Variables
3. Add variabels berikut:

#### Production Variables

| Name | Value | Notes |
|------|-------|-------|
| `FRONTEND_URL` | `https://your-domain.vercel.app` | Update dengan domain Anda |
| `JWT_SECRET` | `<paste-dari-generate-jwt-secret.js>` | 64 karakter string |
| `AUTH_USERNAME` | `2117` | Change jika ingin |
| `AUTH_PASSWORD` | `2117` | Change jika ingin |
| `VITE_REDIRECT_URL` | `https://2117.zinsyaikh.my.id` | URL project kedua |

Setiap variable, pilih environment:
- [x] Production
- [ ] Preview
- [ ] Development

4. Click "Save"

### 4.2 Via Vercel CLI

```bash
vercel env add FRONTEND_URL
# Input: https://your-domain.vercel.app

vercel env add JWT_SECRET
# Input: <64-char-secret>

vercel env add AUTH_USERNAME
# Input: 2117

vercel env add AUTH_PASSWORD
# Input: 2117

vercel env add VITE_REDIRECT_URL
# Input: https://2117.zinsyaikh.my.id
```

---

## Step 5️⃣: Redeploy dengan Environment Variables

Setelah menambahkan environment variables, redeploy:

### Via Dashboard
1. Settings → Deployments
2. Latest deployment → kebab menu (⋮)
3. Redeploy

### Via CLI
```bash
vercel --prod
```

---

## Step 6️⃣: Test Production Deployment

### 6.1 Check Deployment Status

1. Dashboard → Deployments tab
2. Verify build success (green checkmark)
3. Click deployment untuk lihat logs

### 6.2 Test Login Endpoint

```bash
# Test login API
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"2117","password":"2117"}'

# Should return:
# {"success":true,"token":"eyJhbGc...","expiresIn":1800}
```

### 6.3 Manual Testing di Browser

1. Buka: `https://your-domain.vercel.app`
2. Navigasi ke: `/secret-portal`
3. Login dengan:
   - Username: `2117`
   - Password: `2117`
4. Seharusnya redirect ke project 2

### 6.4 Test Utilities di Production

1. Buka: `https://your-domain.vercel.app`
2. Buka DevTools (F12) → Console
3. Type:
   ```javascript
   authStatus()
   ```

**Note:** Testing utilities hanya tersedia di development. Disable untuk production jika diperlukan.

---

## Step 7️⃣: Setup Custom Domain (Optional)

### 7.1 Add Domain ke Vercel

1. Dashboard → Settings → Domains
2. Click "Add"
3. Input domain name: `portfolio.yourdomain.com`
4. Select DNS provider

### 7.2 Update DNS Records

Vercel akan provide DNS records:
```
Type: CNAME
Name: portfolio
Value: cname.vercel-dns.com
```

Add ke DNS provider Anda (GoDaddy, Namecheap, etc.)

### 7.3 Verify Domain

```bash
# Test domain resolution
nslookup portfolio.yourdomain.com

# Should return Vercel IP
```

### 7.4 Update Environment Variables

```
FRONTEND_URL=https://portfolio.yourdomain.com
```

Redeploy untuk apply changes.

---

## Step 8️⃣: Setup Monitoring & Analytics

### 8.1 Enable Analytics

Dashboard → Analytics:
- [ ] Real-time requests
- [ ] Error monitoring
- [ ] Performance metrics

### 8.2 Setup Error Alerts

Settings → Notifications:
```
✓ Build failed
✓ Deployment error
✓ Too many errors
```

### 8.3 Monitor Serverless Functions

Dashboard → Functions:
- Track execution time
- Monitor errors
- Check logs

---

## Step 9️⃣: Security Hardening

### 9.1 Setup HTTPS Redirect

Vercel auto-enables HTTPS. Verify:

```bash
# Should redirect to https
curl -I http://your-domain.vercel.app
# HTTP/1.1 308 Permanent Redirect
# Location: https://your-domain.vercel.app
```

### 9.2 Add Security Headers

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
        }
      ]
    }
  ]
}
```

Commit & push:
```bash
git add vercel.json
git commit -m "Add security headers"
git push origin main
```

### 9.3 Setup Rate Limiting (Via Vercel KV)

Untuk production scaling, gunakan Vercel KV:

1. Dashboard → Storage → Create Database → KV
2. Connect ke project
3. Update `api/middleware.js` untuk gunakan KV

---

## Step 🔟: Post-Deployment Verification

### Checklist

- [ ] Frontend loads: https://your-domain.vercel.app
- [ ] Login page accessible: /secret-portal
- [ ] Login API working: /api/auth/login
- [ ] Token verification: /api/auth/verify
- [ ] Logout working: /api/auth/logout
- [ ] HTTPS enabled
- [ ] HTTPOnly cookies set
- [ ] CORS working
- [ ] Environment variables loaded
- [ ] No console errors
- [ ] No security warnings

---

## 🆘 Troubleshooting Deployment

### Build Failed

**Error:** `Module not found: bcryptjs`

Solution:
```bash
# Install dependencies locally
npm install

# Push to GitHub
git add package-lock.json
git commit -m "Update dependencies"
git push origin main

# Redeploy
vercel --prod
```

### 404 on API Endpoints

**Error:** `/api/auth/login` returns 404

Solution:
1. Check `api/auth/` folder exists
2. Verify file names (login.js, not login.jsx)
3. Check `vercel.json` for routing rules
4. Redeploy: `vercel --prod`

### Environment Variables Not Loaded

**Error:** API returns undefined for env variables

Solution:
```bash
# Verify variables in Vercel Dashboard
# Settings → Environment Variables

# Check they're assigned to Production
# Redeploy
vercel --prod

# Test in browser console:
console.log(import.meta.env.VITE_REDIRECT_URL)
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS`

Solution:
```javascript
// In api/middleware.js, verify CORS headers:
res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
```

Update FRONTEND_URL di Vercel environment.

### Cookies Not Saving

**Error:** Login works but token not persisted

Solution:
```javascript
// Verify in api/auth/login.js:
res.setHeader('Set-Cookie', 
  `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`
)
```

For development (localhost), change `Secure` to `false` in .env.local

---

## 📊 Monitoring Production

### Daily Tasks
- [ ] Check Vercel Dashboard for errors
- [ ] Monitor Serverless Functions logs
- [ ] Verify login page accessible

### Weekly Tasks
- [ ] Review analytics
- [ ] Check failed deployments
- [ ] Monitor error rates
- [ ] Test login flow

### Monthly Tasks
- [ ] Review security logs
- [ ] Update dependencies: `npm outdated`
- [ ] Audit vulnerabilities: `npm audit`
- [ ] Backup environment variables

---

## 🔄 Continuous Deployment Setup

### Auto-Deploy on Push

Already configured! Vercel automatically:
1. Detects push to `main` branch
2. Builds project
3. Runs tests
4. Deploys to staging
5. Prompts to promote to production

### Disable Auto-Deploy

If needed:
1. Dashboard → Settings → Git
2. Toggle "Auto-Deploy" to OFF
3. Deploy manually via CLI or dashboard

---

## Rollback ke Previous Version

### Via Dashboard

1. Dashboard → Deployments
2. Find previous working deployment
3. Click kebab menu (⋮)
4. "Promote to Production"

### Via CLI

```bash
# List deployments
vercel deployments

# Promote specific deployment
vercel promote <deployment-id>
```

---

## Performance Optimization

### Frontend
- [x] Gzip compression (Vercel default)
- [x] Code splitting (Vite)
- [x] Tree-shaking (Vite)
- [x] Minification (Terser)

### Serverless Functions
- [x] Function optimization
- [x] Cold start optimization
- [x] Memory allocation (128MB default)

Check performance:
```bash
# Dashboard → Analytics → Performance
```

---

## 📞 Vercel Support

### Resources
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support
- **Status:** https://www.vercel-status.com
- **Community:** https://github.com/vercel

---

## ✅ Deployment Complete!

Your hidden login system is now live! 🎉

### What's Live
- ✅ Portfolio website: https://your-domain.vercel.app
- ✅ Hidden login: /secret-portal
- ✅ API endpoints: /api/auth/*
- ✅ HTTPS enabled
- ✅ Auto-scaling
- ✅ Global CDN

### Next Steps
1. Share portfolio with others (login page hidden)
2. Monitor analytics
3. Setup backup login
4. Plan for scaling

---

**Deployment Date:** _______________  
**Status:** ✅ LIVE & PRODUCTION READY
