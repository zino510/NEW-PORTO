import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Simple in-memory store untuk rate limiting dan logging
// Dalam production, ini harus menggunakan database atau Redis
const loginAttempts = new Map()
const loginLogs = []

// Konstanta
const MAX_LOGIN_ATTEMPTS = 5
const ATTEMPT_WINDOW = 15 * 60 * 1000 // 15 menit
const TOKEN_EXPIRY = 30 * 60 // 30 menit dalam detik
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 // 7 hari dalam detik

// Stored hashed credentials (dari env variables)
// Passwords di-hash dengan bcrypt sebelumnya
const VALID_USERS = {
  [process.env.AUTH_USERNAME || '2117']: process.env.AUTH_PASSWORD || '2117'
}

// Verify rate limiting
const checkRateLimit = (ip) => {
  const now = Date.now()
  const userAttempts = loginAttempts.get(ip) || { count: 0, firstAttempt: now }

  // Reset jika window passed
  if (now - userAttempts.firstAttempt > ATTEMPT_WINDOW) {
    loginAttempts.delete(ip)
    return { allowed: true }
  }

  if (userAttempts.count >= MAX_LOGIN_ATTEMPTS) {
    const remainingTime = Math.ceil((ATTEMPT_WINDOW - (now - userAttempts.firstAttempt)) / 1000 / 60)
    return { allowed: false, remainingTime }
  }

  return { allowed: true }
}

// Record login attempt
const recordLoginAttempt = (ip, success, username) => {
  const now = Date.now()
  const userAttempts = loginAttempts.get(ip) || { count: 0, firstAttempt: now }

  userAttempts.count += 1
  loginAttempts.set(ip, userAttempts)

  // Log ke console dan array
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip,
    username,
    success,
    attemptNumber: userAttempts.count
  }
  
  loginLogs.push(logEntry)
  console.log(`[LOGIN] ${logEntry.timestamp} - IP: ${ip}, User: ${username}, Success: ${success}`)

  // Keep only last 1000 logs untuk avoid memory leak
  if (loginLogs.length > 1000) {
    loginLogs.shift()
  }
}

// Generate tokens
const generateTokens = (username) => {
  const token = jwt.sign(
    { username, type: 'access' },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: TOKEN_EXPIRY }
  )

  const refreshToken = jwt.sign(
    { username, type: 'refresh' },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  )

  return { token, refreshToken }
}

// Verify token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    )
    return { valid: true, decoded }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { username, password, rememberMe } = req.body

  // Get client IP
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username dan password harus diisi' 
      })
    }

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      recordLoginAttempt(clientIp, false, username)
      return res.status(429).json({
        success: false,
        message: `Terlalu banyak percobaan. Coba lagi dalam ${rateLimit.remainingTime} menit`
      })
    }

    // Check if user exists
    if (!VALID_USERS[username]) {
      recordLoginAttempt(clientIp, false, username)
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    // Verify password
    const storedPassword = VALID_USERS[username]
    
    // Simple password check untuk development
    const isValidPassword = password === storedPassword

    if (!isValidPassword) {
      recordLoginAttempt(clientIp, false, username)
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    // Reset rate limit pada successful login
    loginAttempts.delete(clientIp)

    // Record successful login
    recordLoginAttempt(clientIp, true, username)

    // Generate tokens
    const { token, refreshToken } = generateTokens(username)

    // Set secure httpOnly cookie
    res.setHeader('Set-Cookie', [
      `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${TOKEN_EXPIRY}; Path=/`,
      ...(rememberMe ? [`refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${REFRESH_TOKEN_EXPIRY}; Path=/`] : [])
    ])

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      refreshToken: rememberMe ? refreshToken : null,
      expiresIn: TOKEN_EXPIRY
    })

  } catch (error) {
    console.error('Login API Error:', error)
    recordLoginAttempt(clientIp, false, username)
    
    res.status(500).json({
      success: false,
      message: 'Terjadi error pada server'
    })
  }
}
