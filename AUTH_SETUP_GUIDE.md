# 🔐 Hidden Login Portal Setup Guide

## 📋 Daftar Isi
- [Overview](#overview)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Sistem hidden login ini memungkinkan Anda mengamankan akses ke project kedua dengan:
- ✅ URL tersembunyi (`/secret-portal`) yang tidak ada di navigasi
- ✅ Autentikasi dengan username & password
- ✅ Rate limiting untuk prevent brute force
- ✅ Session management dengan JWT tokens
- ✅ Remember Me functionality (7 hari)
- ✅ Auto logout setelah 30 menit inaktif
- ✅ CSRF protection
- ✅ Login attempt logging

---

## Persyaratan

### Tech Stack
- **Frontend**: Vue 3 + Vue Router 4
- **Backend**: Vercel Serverless Functions (Node.js)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs (optional, untuk production)
- **Package Manager**: npm

### Dependencies yang Sudah Ditambahkan
```bash
npm install
```

---

## Instalasi

### 1. Install Dependencies

```bash
cd c:\Xiinnn\PROJECT\PORTOFOLIO
npm install
```

### 2. Setup Environment Variables

#### Untuk Local Development
File `.env.local` sudah dibuat. Edit dengan kredensial Anda:

```env
# Frontend
VITE_FRONTEND_URL=http://localhost:3000
VITE_REDIRECT_URL=https://2117.zinsyaikh.my.id

# Backend
FRONTEND_URL=http://localhost:3000

# JWT Secret (ubah ini dengan yang lebih aman)
JWT_SECRET=your-very-secret-key-minimum-32-characters-long

# Credentials
AUTH_USERNAME=2117
AUTH_PASSWORD=2117
```

#### Untuk Production (Vercel)
1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda
3. Ke Settings → Environment Variables
4. Tambahkan variables berikut:

```
FRONTEND_URL=https://your-portfolio-domain.com
JWT_SECRET=<generate-using-guide-below>
AUTH_USERNAME=2117
AUTH_PASSWORD=2117
```

### 3. Generate JWT Secret (Production)

Jalankan command ini di terminal untuk generate secret yang aman:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Hasil akan berupa string 64 karakter. Copy dan gunakan sebagai `JWT_SECRET` di environment.

### 4. File Structure

Struktur project setelah setup:

```
PORTFOLIO/
├── api/
│   ├── auth/
│   │   ├── login.js          ← POST /api/auth/login
│   │   ├── refresh.js        ← POST /api/auth/refresh
│   │   ├── verify.js         ← GET /api/auth/verify
│   │   └── logout.js         ← POST /api/auth/logout
│   └── middleware.js         ← Auth middleware utilities
├── src/
│   ├── components/
│   │   ├── LoginPortal.vue   ← Hidden login page
│   │   └── ...
│   ├── composables/
│   │   └── useAuth.js        ← Auth logic & state
│   ├── utils/
│   │   └── authHelpers.js    ← Auth utilities
│   ├── router/
│   │   └── index.js          ← Router dengan protected routes
│   └── ...
├── .env.example              ← Template env variables
├── .env.local                ← Local development config
└── package.json
```

---

## Konfigurasi

### Router Protection

File: [src/router/index.js](src/router/index.js)

Route `/secret-portal` tidak membutuhkan auth. Route lain bisa ditambahkan dengan:

```javascript
{
  path: '/protected-page',
  component: ProtectedComponent,
  meta: { requiresAuth: true }
}
```

### Customize Credentials

**For Development:**
Edit `.env.local`:

```env
AUTH_USERNAME=your-username
AUTH_PASSWORD=your-password
```

**For Production:**
1. Hash password menggunakan bcrypt
2. Store hash di `AUTH_PASSWORD_HASH`
3. Gunakan Vercel secrets management

#### Generate Password Hash (bcrypt)

```javascript
// File: generate-hash.js
import bcrypt from 'bcryptjs'

const password = '2117'
const hash = await bcrypt.hash(password, 10)
console.log(hash)
```

Jalankan:
```bash
node generate-hash.js
```

### Customize Redirect URL

Ubah URL project kedua di `.env.local`:

```env
VITE_REDIRECT_URL=https://your-project-url.com
```

### Session Configuration

Edit `src/composables/useAuth.js`:

```javascript
// Ubah timeout (dalam milliseconds)
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 menit

// Ubah remember me duration
const REMEMBER_ME_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 hari
```

---

## Testing

### Manual Testing Checklist

#### 1. Test Login dengan Kredensial Benar
```bash
npm run dev
# Buka http://localhost:3000/secret-portal
# Username: 2117
# Password: 2117
# Click "Sign In"
```

Expected:
- ✅ Form submit berhasil
- ✅ Success message tampil
- ✅ Redirect ke project kedua dalam 1 detik

#### 2. Test Login dengan Kredensial Salah
```
Username: 2117
Password: wrong123
```

Expected:
- ✅ Error message "Username atau password salah"
- ✅ Attempt counter increment
- ✅ Login attempts disimpan di localStorage

#### 3. Test Rate Limiting
Lakukan login gagal 5+ kali dalam 15 menit:

Expected:
- ✅ Setelah 5 kali: "Terlalu banyak percobaan..."
- ✅ Counter reset setelah 15 menit

#### 4. Test Remember Me
```
✓ Check "Remember me for 7 days"
Login → Redirect → Clear localStorage manual
Refresh page
```

Expected:
- ✅ Masih authenticated
- ✅ Token di-refresh otomatis

#### 5. Test Session Timeout
```
Login → Tunggu 30 menit tanpa activity
```

Expected:
- ✅ Auto logout
- ✅ Redirect ke `/secret-portal`

#### 6. Test Direct Access to Project 2 Without Login

```
// Buka langsung (dari incognito)
https://2117.zinsyaikh.my.id
```

Expected:
- ✅ Redirect ke `/secret-portal`
- ✅ Tidak bisa bypass

#### 7. Test Logout
```
Login → Open DevTools → Console
auth.logout()
```

Expected:
- ✅ Tokens cleared
- ✅ Cookies cleared
- ✅ Can't access protected pages

#### 8. Test CSRF Protection
Edit form di DevTools untuk remove CSRF token:

Expected:
- ✅ Request rejected
- ✅ Error response

### Automated Testing (Optional)

Buat file `tests/auth.test.js`:

```javascript
// Test suite contoh
import { describe, it, expect } from 'vitest'
import { useAuth } from '../src/composables/useAuth'

describe('Authentication', () => {
  it('should login with correct credentials', async () => {
    const { login } = useAuth()
    const result = await login('2117', '2117')
    expect(result.success).toBe(true)
  })

  it('should fail login with wrong password', async () => {
    const { login } = useAuth()
    const result = await login('2117', 'wrong')
    expect(result.success).toBe(false)
  })

  it('should enforce rate limiting', async () => {
    const { login } = useAuth()
    
    // Simulate 5 failed attempts
    for (let i = 0; i < 5; i++) {
      await login('2117', 'wrong')
    }
    
    const result = await login('2117', '2117')
    expect(result.success).toBe(false)
    expect(result.message).toContain('Terlalu banyak')
  })
})
```

Run tests:
```bash
npm install -D vitest
npm run test
```

---

## Deployment

### Deploy ke Vercel

#### Step 1: Push ke Git
```bash
git add .
git commit -m "Add hidden login system"
git push origin main
```

#### Step 2: Setup di Vercel Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Connect GitHub repository Anda
3. Click "Import Project"
4. Select portfolio project

#### Step 3: Add Environment Variables

Di Vercel Dashboard:
1. Project Settings → Environment Variables
2. Tambahkan:

```
FRONTEND_URL=https://your-domain.vercel.app
JWT_SECRET=<generate-secret-above>
AUTH_USERNAME=2117
AUTH_PASSWORD=2117
VITE_REDIRECT_URL=https://2117.zinsyaikh.my.id
```

#### Step 4: Deploy
```bash
vercel deploy --prod
```

Atau push ke main branch untuk auto-deploy.

### Domain Custom

1. Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records (instruction dari Vercel)
4. Update `.env` variable: `FRONTEND_URL=https://your-domain.com`

---

## Security Best Practices

### ✅ DO's

1. **Hash Passwords**
   - Gunakan bcryptjs di production
   - Never store plain password

2. **Secure Environment Variables**
   - Jangan commit `.env.local` ke git
   - Gunakan `.gitignore` dengan:
     ```
     .env.local
     .env.*.local
     .env.production
     *.log
     ```

3. **HTTPS Only**
   - Vercel auto-enable HTTPS
   - Set `HTTPS_ONLY=true` di production

4. **HTTPOnly Cookies**
   - Tokens di-store di httpOnly cookies
   - Not accessible from JavaScript (prevent XSS)

5. **CORS Protection**
   - Whitelist origin di CORS headers
   - Restrict ke frontend URL saja

6. **Rate Limiting**
   - Implemented: 5 attempts per 15 minutes
   - Scale untuk production dengan Redis

7. **Session Timeout**
   - Auto logout setelah 30 menit
   - Warning sebelum timeout (optional)

8. **Logging & Monitoring**
   - Log semua login attempts
   - Monitor failed attempts untuk security alerts

### ❌ DON'Ts

1. **Jangan hardcode credentials**
   ```javascript
   // ❌ WRONG
   const user = 'admin'
   const pass = '12345'
   
   // ✅ CORRECT
   const user = process.env.AUTH_USERNAME
   const pass = process.env.AUTH_PASSWORD
   ```

2. **Jangan commit .env files**
   ```bash
   # .gitignore
   .env
   .env.local
   .env.*.local
   ```

3. **Jangan expose stack traces**
   - Sanitize error messages di production
   - Log full error server-side only

4. **Jangan use weak JWT secret**
   ```javascript
   // ❌ WRONG
   JWT_SECRET=secret
   
   // ✅ CORRECT (32+ chars)
   JWT_SECRET=<output-dari-crypto-command>
   ```

5. **Jangan disable CSRF protection**
   - Check token di setiap request

6. **Jangan store sensitive data di localStorage**
   - Use httpOnly cookies untuk tokens
   - localStorage hanya untuk UI state

---

## Troubleshooting

### "Module not found: bcryptjs"
```bash
npm install bcryptjs jsonwebtoken
npm install
```

### Login endpoint returns 404
- Pastikan folder `api/auth/` ada
- Vercel functions naming: `api/folder/file.js` → `/api/folder/file`

### CORS error saat login
- Check `FRONTEND_URL` di environment
- Pastikan frontend URL sesuai dengan request origin

### Token tidak tersimpan
- Check DevTools → Application → Cookies
- Pastikan cookies tidak diblocking
- In Safari: Settings → Privacy → Block cookies

### Session logout immediately
- Check session timeout di `useAuth.js`
- Verify JWT_SECRET sama di server & client

### "Too many requests" error
- Wait 15 minutes untuk rate limit reset
- Or clear `loginAttempts` dari localStorage

### Redirect loop ke /secret-portal
- Check `checkAuth()` logic
- Verify JWT token di browser cookies
- Check console untuk error messages

---

## API Reference

### POST /api/auth/login
```javascript
// Request
{
  "username": "2117",
  "password": "2117",
  "rememberMe": true,
  "csrfToken": "xxx"
}

// Response (Success)
{
  "success": true,
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 1800
}

// Response (Error)
{
  "success": false,
  "message": "Username atau password salah"
}
```

### POST /api/auth/refresh
```javascript
// Request
{
  "refreshToken": "eyJhbGc..."
}

// Response
{
  "success": true,
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 1800
}
```

### GET /api/auth/verify
```
Headers: Authorization: Bearer <token>

Response (Valid):
{
  "success": true,
  "valid": true,
  "user": "2117"
}

Response (Invalid):
{
  "success": false,
  "valid": false,
  "message": "Token tidak valid atau sudah expired"
}
```

### POST /api/auth/logout
```javascript
// Request
{
  "token": "eyJhbGc..."
}

// Response
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## Support & Questions

Jika ada issues:
1. Check error messages di browser console
2. Check server logs di Vercel Dashboard
3. Review documentation di [jwt.io](https://jwt.io)
4. Check [Vercel docs](https://vercel.com/docs)

---

**Last Updated:** January 2026  
**Status:** Production Ready ✅
