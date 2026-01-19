import jwt from 'jsonwebtoken'

/**
 * Middleware untuk verify JWT token
 * @param {object} req - Vercel request object
 * @returns {object} { valid: boolean, user: string|null, error: string|null }
 */
export const verifyJwtToken = (req) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, user: null, error: 'Token tidak ditemukan' }
    }

    const token = authHeader.substring(7)

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    )

    return { valid: true, user: decoded.username, decoded }
  } catch (error) {
    let errorMessage = 'Token tidak valid'

    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token sudah expired'
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Token format tidak valid'
    }

    return { valid: false, user: null, error: errorMessage }
  }
}

/**
 * CORS headers utility
 * @param {object} res - Vercel response object
 */
export const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )
}

/**
 * Handle OPTIONS request untuk CORS preflight
 * @param {object} req - Vercel request object
 * @param {object} res - Vercel response object
 * @returns {boolean} true jika OPTIONS request, false sebaliknya
 */
export const handleCorsOptions = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return true
  }
  return false
}

/**
 * Get client IP address
 * @param {object} req - Vercel request object
 * @returns {string} IP address
 */
export const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(';')[0] : req.connection.remoteAddress
  return ip || 'unknown'
}

/**
 * Rate limit checker (in-memory, gunakan Redis/DB untuk production)
 * @param {string} key 
 * @param {number} maxRequests 
 * @param {number} windowMs 
 * @returns {object} { allowed: boolean, remaining: number, resetTime: number }
 */
const requestLog = new Map()

export const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now()
  const userLog = requestLog.get(key)

  if (!userLog) {
    requestLog.set(key, [now])
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
  }

  // Remove old requests outside the window
  const recentRequests = userLog.filter(time => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    const oldestRequest = Math.min(...recentRequests)
    const resetTime = oldestRequest + windowMs
    return {
      allowed: false,
      remaining: 0,
      resetTime,
      retryAfter: Math.ceil((resetTime - now) / 1000)
    }
  }

  recentRequests.push(now)
  requestLog.set(key, recentRequests)

  return {
    allowed: true,
    remaining: maxRequests - recentRequests.length,
    resetTime: now + windowMs
  }
}

/**
 * CSRF token validation
 * @param {string} token 
 * @returns {boolean}
 */
export const validateCsrfToken = (token) => {
  // Simple validation - dalam production gunakan session store
  return token && typeof token === 'string' && token.length > 20
}

/**
 * Validate request method
 * @param {object} req 
 * @param {string|string[]} allowedMethods 
 * @returns {boolean}
 */
export const validateMethod = (req, allowedMethods) => {
  const methods = Array.isArray(allowedMethods) ? allowedMethods : [allowedMethods]
  return methods.includes(req.method)
}

/**
 * Protected API handler wrapper
 * @param {function} handler - Your API handler function
 * @param {string|string[]} methods - Allowed HTTP methods
 * @param {boolean} requiresAuth - Whether authentication is required
 * @returns {function} Wrapped handler
 */
export const protectedApiHandler = (handler, methods = 'POST', requiresAuth = true) => {
  return async (req, res) => {
    // Set CORS headers
    setCorsHeaders(res)

    // Handle preflight
    if (handleCorsOptions(req, res)) return

    // Validate method
    if (!validateMethod(req, methods)) {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} tidak diizinkan`
      })
    }

    // Check authentication
    if (requiresAuth) {
      const verification = verifyJwtToken(req)

      if (!verification.valid) {
        return res.status(401).json({
          success: false,
          message: verification.error
        })
      }

      // Attach user info to request
      req.user = { username: verification.user }
    }

    // Check rate limit
    const clientIp = getClientIp(req)
    const rateLimit = checkRateLimit(clientIp, 30, 60000) // 30 requests per minute

    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        message: 'Terlalu banyak request. Coba lagi nanti.',
        retryAfter: rateLimit.retryAfter
      })
    }

    // Call actual handler
    try {
      await handler(req, res)
    } catch (error) {
      console.error('API Handler Error:', error)
      return res.status(500).json({
        success: false,
        message: 'Terjadi error pada server'
      })
    }
  }
}
