# 🚀 Quick Start Guide - Hidden Login System

## ⚡ 5 Menit Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Update Environment Variables
Edit `.env.local`:
```env
VITE_REDIRECT_URL=https://2117.zinsyaikh.my.id
JWT_SECRET=dev-secret-key-change-in-production
AUTH_USERNAME=2117
AUTH_PASSWORD=2117
FRONTEND_URL=http://localhost:3000
```

### 3️⃣ Run Development Server
```bash
npm run dev
```
Aplikasi akan buka di `http://localhost:3000`

### 4️⃣ Test Hidden Login
- Buka: `http://localhost:3000/secret-portal`
- Username: `2117`
- Password: `2117`
- Seharusnya redirect ke project kedua

---

## 🎯 Next Steps

### Setup Production (Vercel)
1. Push ke GitHub
2. Vercel auto-deploy
3. Add environment variables di Vercel Dashboard
4. Generate JWT secret: `node scripts/generate-jwt-secret.js`
5. Deploy!

### Generate Secure Password Hash
```bash
node scripts/generate-hash.js myPassword123
# Copy output hash ke AUTH_PASSWORD_HASH
```

### Read Full Documentation
- [AUTH_SETUP_GUIDE.md](AUTH_SETUP_GUIDE.md) - Complete setup guide
- [API Documentation](AUTH_SETUP_GUIDE.md#api-reference) - API endpoints

---

## 📁 What's New?

### New Files Added:
- `api/auth/login.js` - Login endpoint
- `api/auth/refresh.js` - Token refresh
- `api/auth/verify.js` - Token verification
- `api/auth/logout.js` - Logout endpoint
- `api/middleware.js` - Auth middleware utilities
- `src/components/LoginPortal.vue` - Hidden login page
- `src/composables/useAuth.js` - Auth logic
- `src/utils/authHelpers.js` - Auth utilities
- `scripts/generate-hash.js` - Password hash generator
- `scripts/generate-jwt-secret.js` - JWT secret generator
- `AUTH_SETUP_GUIDE.md` - Complete documentation
- `.env.example` - Environment template
- `.env.local` - Local development config

### Modified Files:
- `package.json` - Added dependencies
- `src/router/index.js` - Added auth routes
- `.gitignore` - Added sensitive files

---

## 🔒 Security Checklist

- [x] Hidden route tidak ada di navigasi
- [x] Rate limiting (5 attempts per 15 min)
- [x] Session timeout (30 menit)
- [x] HTTPOnly cookies
- [x] CSRF protection
- [x] JWT tokens
- [x] Remember Me (7 hari)
- [x] Login logging
- [x] XSS prevention
- [x] CORS protection

---

## 📊 Testing URLs

| Test Case | URL | Username | Password | Expected |
|-----------|-----|----------|----------|----------|
| Login Success | `/secret-portal` | 2117 | 2117 | ✅ Redirect to project 2 |
| Login Fail | `/secret-portal` | 2117 | wrong | ❌ Error message |
| Already Logged | `/secret-portal` | - | - | ↪️ Redirect to project 2 |
| Direct Access P2 | Project 2 URL | - | - | ↪️ Redirect to `/secret-portal` |

---

## 💡 Tips

1. **Forgot password?**
   - Edit `.env.local` atau `.env` di Vercel

2. **Rate limit too strict?**
   - Edit `MAX_LOGIN_ATTEMPTS` di `api/auth/login.js`
   - Edit `ATTEMPT_WINDOW` untuk duration

3. **Session timeout too short?**
   - Edit `SESSION_TIMEOUT` di `src/composables/useAuth.js`

4. **Want to customize login page?**
   - Edit `src/components/LoginPortal.vue`
   - Styling dengan Tailwind CSS

---

## ⚠️ Important

- ❌ **DON'T** commit `.env.local` ke git
- ❌ **DON'T** use weak JWT secret
- ❌ **DON'T** hardcode credentials
- ✅ **DO** use HTTPS in production
- ✅ **DO** change credentials untuk production
- ✅ **DO** generate strong JWT secret

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on `/api/auth/login` | Pastikan `api/auth/` folder ada |
| CORS error | Check `FRONTEND_URL` di env |
| Token tidak tersimpan | Check cookies di DevTools |
| Logout immediate | Check session timeout value |
| Rate limit terlalu ketat | Edit `MAX_LOGIN_ATTEMPTS` |

---

## 📞 Support

Baca [AUTH_SETUP_GUIDE.md](AUTH_SETUP_GUIDE.md) untuk:
- Dokumentasi lengkap
- Testing checklist
- API reference
- Security best practices
- Deployment guide

---

**Status:** ✅ Ready for Development & Production

Happy coding! 🎉
