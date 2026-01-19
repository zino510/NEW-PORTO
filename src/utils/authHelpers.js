// Utility functions untuk authentication

/**
 * Generate CSRF token
 * @returns {string} CSRF token
 */
export const generateCsrfToken = () => {
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15)
  return token
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate password strength
 * @param {string} password 
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = []

  if (password.length < 6) {
    errors.push('Password minimal 6 karakter')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 huruf besar')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 huruf kecil')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung minimal 1 angka')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Format date untuk display
 * @param {number|string} timestamp 
 * @returns {string}
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Get remaining time sampai session expire
 * @param {number} expiresAt 
 * @returns {string}
 */
export const getSessionRemainingTime = (expiresAt) => {
  if (!expiresAt) return 'Invalid'

  const now = Date.now()
  const diff = expiresAt - now

  if (diff < 0) return 'Expired'

  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  if (minutes === 0) {
    return `${seconds}s`
  }

  return `${minutes}m ${seconds}s`
}

/**
 * Check if token is about to expire (dalam 5 menit)
 * @param {number} expiresAt 
 * @returns {boolean}
 */
export const isTokenExpiringSoon = (expiresAt) => {
  if (!expiresAt) return false
  
  const now = Date.now()
  const diff = expiresAt - now
  const fiveMinutes = 5 * 60 * 1000

  return diff > 0 && diff < fiveMinutes
}

/**
 * Safe JSON parse dengan fallback
 * @param {string} jsonString 
 * @param {any} fallback 
 * @returns {any}
 */
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString)
  } catch {
    return fallback
  }
}

/**
 * Encode untuk mencegah XSS
 * @param {string} str 
 * @returns {string}
 */
export const encodeHTML = (str) => {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

/**
 * Debounce function
 * @param {function} func 
 * @param {number} delay 
 * @returns {function}
 */
export const debounce = (func, delay = 300) => {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Rate limiter dengan exponential backoff
 * @param {function} fn 
 * @param {number} maxAttempts 
 * @returns {function}
 */
export const createRateLimiter = (maxAttempts = 5) => {
  let attempts = 0
  let lastAttemptTime = 0

  return {
    canAttempt() {
      const now = Date.now()
      
      if (attempts === 0) {
        attempts = 1
        lastAttemptTime = now
        return true
      }

      const exponentialDelay = Math.pow(2, attempts - 1) * 1000 // Exponential backoff
      const timeSinceLastAttempt = now - lastAttemptTime

      if (attempts >= maxAttempts && timeSinceLastAttempt < exponentialDelay) {
        return false
      }

      attempts++
      lastAttemptTime = now
      return true
    },

    getRemainingTime() {
      const now = Date.now()
      const exponentialDelay = Math.pow(2, attempts - 1) * 1000
      const timeSinceLastAttempt = now - lastAttemptTime
      const remaining = exponentialDelay - timeSinceLastAttempt

      return Math.max(0, remaining)
    },

    reset() {
      attempts = 0
      lastAttemptTime = 0
    }
  }
}
