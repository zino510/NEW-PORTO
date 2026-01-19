# 🚀 Production Deployment Checklist

## Pre-Deployment Checklist

### Security Review
- [ ] JWT_SECRET di-generate dengan 32+ characters
- [ ] AUTH_PASSWORD di-hash dengan bcrypt
- [ ] .env.local tidak di-commit ke git
- [ ] Semua hardcoded credentials sudah dihapus
- [ ] HTTPS enabled di production
- [ ] HTTPOnly cookies enabled
- [ ] CORS whitelist hanya frontend domain
- [ ] Rate limiting configured dengan wajar
- [ ] Session timeout sesuai requirement
- [ ] CSRF protection enabled

### Code Quality
- [ ] Tidak ada console.log yang expose sensitive data
- [ ] Error handling tidak mengexpose stack traces
- [ ] Semua deprecated APIs updated
- [ ] No security warnings dari npm audit
- [ ] Code tested locally dengan .env.local
- [ ] Rate limiting tested
- [ ] Session timeout tested
- [ ] Token refresh tested

### Environment Setup
- [ ] FRONTEND_URL sesuai production domain
- [ ] VITE_REDIRECT_URL sesuai project kedua
- [ ] JWT_SECRET di-generate & secure
- [ ] AUTH credentials changed dari default
- [ ] Database URL configured (if applicable)
- [ ] API endpoints accessible dari production

### Testing Complete
- [ ] ✅ Login dengan kredensial benar
- [ ] ✅ Login dengan kredensial salah
- [ ] ✅ Rate limiting working
- [ ] ✅ Session timeout working
- [ ] ✅ Token refresh working
- [ ] ✅ Logout working
- [ ] ✅ Remember Me working (7 hari)
- [ ] ✅ Direct access ke project 2 protected
- [ ] ✅ CSRF protection working
- [ ] ✅ Login logging working

### Documentation
- [ ] README.md updated
- [ ] Credentials documented di password manager
- [ ] Backup credentials di safe place
- [ ] Disaster recovery plan ready
- [ ] Support docs created

---

## Deployment Steps

### 1. Create GitHub Repository (if not exists)

```bash
git init
git add .
git commit -m "Initial commit: Portfolio with hidden login"
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

### 2. Setup Vercel Project

#### Option A: Via CLI
```bash
npm install -g vercel
vercel login
vercel link
```

#### Option B: Via Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import from GitHub
4. Select repository
5. Click "Import"

### 3. Add Environment Variables

**Via CLI:**
```bash
vercel env add JWT_SECRET
vercel env add AUTH_USERNAME
vercel env add AUTH_PASSWORD
vercel env add FRONTEND_URL
vercel env add VITE_REDIRECT_URL
```

**Via Dashboard:**
1. Project → Settings → Environment Variables
2. Add each variable (one by one)
3. Values from secure location

**Required Variables:**
```
FRONTEND_URL=https://your-domain.vercel.app
JWT_SECRET=<64-char-random-secret>
AUTH_USERNAME=<your-username>
AUTH_PASSWORD=<your-password>
VITE_REDIRECT_URL=https://2117.zinsyaikh.my.id
```

### 4. Configure Custom Domain (Optional)

1. Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records (Vercel will provide)
4. Wait for verification (usually 15 min)

### 5. Deploy

**Auto-deploy:**
```bash
git push origin main
```

**Manual deploy:**
```bash
vercel deploy --prod
```

### 6. Verify Deployment

1. Visit: `https://your-domain.vercel.app`
2. Test login page: `/secret-portal`
3. Check environment:
   - DevTools → Application → Storage
   - Cookies harus terlihat
   - Tokens di httpOnly (tidak visible di JS)

### 7. Monitor

1. Vercel Dashboard → Analytics
2. Check Serverless Functions logs
3. Monitor error rates
4. Check deploy status

---

## Post-Deployment Testing

### Critical Path Testing
```
1. Visit portfolio homepage
   ✓ Should load normal content
   ✓ No login page visible

2. Try direct URL: /secret-portal
   ✓ Login form appears
   
3. Test login credentials
   ✓ Username: <your-username>
   ✓ Password: <your-password>
   ✓ Should redirect to project 2
   
4. Check project 2 access
   ✓ Project 2 accessible
   ✓ Can't access without login token
```

### API Testing

```bash
# Test login endpoint
curl -X POST https://your-domain/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"2117","password":"2117"}'

# Test verify endpoint
curl https://your-domain/api/auth/verify \
  -H "Authorization: Bearer <token>"

# Test logout endpoint
curl -X POST https://your-domain/api/auth/logout
```

### Browser Testing

Open DevTools (F12) and run:
```javascript
// Check auth utilities are available
authStatus()
testLogin('2117', '2117')
testVerify()
decodeToken()
```

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Login functionality working
- [ ] No 500 errors in logs
- [ ] Session management working

### Weekly Checks
- [ ] Review login attempts log
- [ ] Check for suspicious activity
- [ ] Verify backups

### Monthly Checks
- [ ] Update dependencies: `npm outdated`
- [ ] Security audit: `npm audit`
- [ ] Review failed login attempts
- [ ] Test disaster recovery

### Security Monitoring

**Alerts to setup in Vercel:**
1. Deployment failures
2. 500 errors > 5 per hour
3. 401/403 errors spike
4. Rate limiting triggers

---

## Rollback Plan

### If Something Goes Wrong

```bash
# View deployment history
vercel deployments

# Rollback to previous deployment
vercel rollback

# Or via dashboard:
# Project → Deployments → Click on previous → Promote to Production
```

### If Database Locked

```bash
# Clear attempts counter (if using storage)
# SSH ke server (if self-hosted)
# Or re-deploy to reset in-memory counter
```

---

## Performance Optimization

### Serverless Function Optimization

Edit `api/auth/login.js`:
```javascript
// Cache user lookups
const CACHE_TTL = 60000 // 1 minute
let userCache = null
let cacheTime = 0
```

### Frontend Optimization

Already implemented:
- ✅ Code splitting untuk auth bundle
- ✅ Lazy loading routes
- ✅ Minified build
- ✅ Gzip compression (Vercel default)

### Database Query Optimization (Future)

When using database:
```javascript
// Add indexes for faster lookups
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
```

---

## Scaling Considerations

### Current Limitations
- In-memory login attempts storage
- Single serverless function instance
- No distributed session store

### For Large Scale

1. **Use Redis for rate limiting:**
```javascript
import redis from 'redis'
const client = redis.createClient(process.env.REDIS_URL)

const checkRateLimit = async (key) => {
  const attempts = await client.incr(key)
  if (attempts === 1) {
    await client.expire(key, 900) // 15 minutes
  }
  return attempts <= 5
}
```

2. **Use database for session storage:**
```javascript
// Instead of in-memory Map
await db.sessions.create({
  token,
  user: username,
  expires: new Date(Date.now() + TOKEN_EXPIRY)
})
```

3. **Setup Redis cache layer:**
```javascript
const cacheKey = `user:${username}`
const cached = await redis.get(cacheKey)
if (cached) return cached
```

---

## Disaster Recovery

### Backup Important Data
```bash
# Backup environment variables
# Create encrypted file with credentials
# Store in secure location (LastPass, 1Password, etc)

# Backup code
git tag -a v1.0.0 -m "Production deployment"
git push origin v1.0.0
```

### Recovery Procedures

**If JWT_SECRET compromised:**
1. Generate new JWT_SECRET
2. Update in Vercel
3. All users auto-logged out (tokens invalid)
4. Users re-login with new tokens

**If credentials leaked:**
1. Change AUTH_PASSWORD immediately
2. Generate new hash
3. Update in Vercel
4. Force re-login if needed

---

## Compliance & Security

### Data Protection
- [ ] GDPR compliant (if EU users)
- [ ] No unnecessary data collection
- [ ] Login attempts logged with purpose
- [ ] Data retention policy set

### Audit Trail
- [ ] All logins logged with timestamp
- [ ] Failed attempts tracked
- [ ] Changes to env variables logged
- [ ] Access to sensitive endpoints logged

### Security Headers (Vercel default)
```
Strict-Transport-Security: max-age=63072000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## Documentation for Team

Create a team guide:
- [x] How to change password
- [x] How to emergency reset
- [x] How to troubleshoot
- [x] Who to contact if issue
- [x] Escalation procedures

---

## Success Criteria ✅

Your deployment is successful when:

1. ✅ Homepage loads without login
2. ✅ `/secret-portal` only accessible at hidden URL
3. ✅ Login works with correct credentials
4. ✅ Wrong credentials show error
5. ✅ Rate limiting prevents brute force
6. ✅ Session timeout works
7. ✅ Remember Me persists 7 days
8. ✅ Project 2 protected from direct access
9. ✅ Logs capture all attempts
10. ✅ HTTPS enforced
11. ✅ Cookies httpOnly & secure
12. ✅ No console errors
13. ✅ No security warnings

---

## Support & Escalation

### Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| 404 on /api/auth/login | Deploy pending? Wait 5 min |
| CORS errors | Check FRONTEND_URL in Vercel |
| Tokens not persisting | Check browser cookie settings |
| Rate limit too aggressive | Adjust MAX_LOGIN_ATTEMPTS |
| Performance slow | Check Vercel logs for timeout |

### Contact & Support

- **Vercel Support:** vercel.com/support
- **Community:** forums.vercel.com
- **Documentation:** vercel.com/docs

---

## Final Notes

- 🔒 Keep credentials safe & secure
- 📝 Document all changes
- 🧪 Test thoroughly before each deploy
- 📊 Monitor regularly
- 🔄 Have rollback ready
- 🚨 Setup alerting
- 📞 Have support contact ready

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Production URL:** _______________  
**Status:** ✅ LIVE

Good luck! 🎉
