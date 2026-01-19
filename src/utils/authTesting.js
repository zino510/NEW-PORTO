/**
 * Testing utilities untuk authentication
 * Run di browser console untuk manual testing
 */

// ============================================
// AUTH TESTING UTILITIES
// ============================================

/**
 * Print current auth state
 */
window.authStatus = () => {
  const token = localStorage.getItem('authToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const sessionExpires = localStorage.getItem('sessionExpires')
  const rememberMeExpires = localStorage.getItem('rememberMeExpires')
  const loginTime = localStorage.getItem('loginTime')
  const attempts = localStorage.getItem('loginAttempts')

  console.group('🔐 Auth Status')
  console.log('Token:', token ? `${token.substring(0, 20)}...` : 'Not set')
  console.log('Refresh Token:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'Not set')
  console.log('Session Expires:', sessionExpires ? new Date(parseInt(sessionExpires)).toLocaleString() : 'Not set')
  console.log('Remember Me Expires:', rememberMeExpires ? new Date(parseInt(rememberMeExpires)).toLocaleString() : 'Not set')
  console.log('Login Time:', loginTime ? new Date(parseInt(loginTime)).toLocaleString() : 'Not set')
  console.log('Failed Attempts:', attempts || '0')
  console.groupEnd()
}

/**
 * Clear all auth data
 */
window.clearAuth = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('sessionExpires')
  localStorage.removeItem('rememberMeExpires')
  localStorage.removeItem('loginTime')
  localStorage.removeItem('loginAttempts')
  localStorage.removeItem('lastAttempt')
  localStorage.removeItem('savedUsername')
  
  // Clear cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
  })
  
  console.log('✅ All auth data cleared')
  window.authStatus()
}

/**
 * Test login API
 */
window.testLogin = async (username = '2117', password = '2117') => {
  console.log(`📝 Testing login with ${username}:${password}`)
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        rememberMe: false,
        csrfToken: 'test-token'
      })
    })

    const data = await response.json()
    
    console.group('📊 Login Response')
    console.log('Status:', response.status)
    console.log('Success:', data.success)
    console.log('Message:', data.message)
    if (data.token) console.log('Token:', data.token.substring(0, 30) + '...')
    console.groupEnd()

    return data
  } catch (error) {
    console.error('❌ Login error:', error)
  }
}

/**
 * Test verify API
 */
window.testVerify = async () => {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    console.warn('⚠️  No token found. Login first.')
    return
  }

  console.log('🔍 Testing token verification...')
  
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    
    console.group('📊 Verify Response')
    console.log('Status:', response.status)
    console.log('Valid:', data.valid)
    console.log('User:', data.user)
    console.log('Message:', data.message)
    console.groupEnd()

    return data
  } catch (error) {
    console.error('❌ Verify error:', error)
  }
}

/**
 * Simulate failed login attempts untuk test rate limiting
 */
window.testRateLimit = async (attempts = 5) => {
  console.log(`📝 Simulating ${attempts} failed login attempts...`)
  
  for (let i = 1; i <= attempts; i++) {
    const response = await window.testLogin('2117', `wrong${i}`)
    console.log(`Attempt ${i}/${attempts} - Success: ${response.success}`)
    await new Promise(r => setTimeout(r, 500))
  }
  
  console.log('✅ Rate limit test complete')
  window.authStatus()
}

/**
 * Decode JWT token untuk inspect
 */
window.decodeToken = (token = null) => {
  const t = token || localStorage.getItem('authToken')
  
  if (!t) {
    console.warn('⚠️  No token provided or found')
    return
  }

  try {
    const parts = t.split('.')
    if (parts.length !== 3) {
      console.error('❌ Invalid token format')
      return
    }

    const payload = JSON.parse(atob(parts[1]))
    
    console.group('🔎 Token Payload')
    console.log(payload)
    console.log('\nExpires at:', new Date(payload.exp * 1000).toLocaleString())
    console.groupEnd()
    
    return payload
  } catch (error) {
    console.error('❌ Failed to decode token:', error.message)
  }
}

/**
 * Check session remaining time
 */
window.sessionTimeRemaining = () => {
  const sessionExpires = localStorage.getItem('sessionExpires')
  
  if (!sessionExpires) {
    console.warn('⚠️  No session found')
    return
  }

  const now = Date.now()
  const expires = parseInt(sessionExpires)
  const remaining = expires - now

  if (remaining < 0) {
    console.log('⏰ Session expired')
    return
  }

  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  console.log(`⏰ Session remaining: ${minutes}m ${seconds}s`)
  console.log(`Expires at: ${new Date(expires).toLocaleString()}`)
  
  return remaining
}

/**
 * Monitor login attempts counter
 */
window.monitorAttempts = () => {
  console.log('📊 Monitoring login attempts...')
  console.log('Press Ctrl+C to stop\n')
  
  setInterval(() => {
    const attempts = localStorage.getItem('loginAttempts') || '0'
    const lastAttempt = localStorage.getItem('lastAttempt')
    const lastAttemptDate = lastAttempt ? new Date(parseInt(lastAttempt)).toLocaleTimeString() : 'Never'
    
    console.clear()
    console.log(`📊 Login Attempts: ${attempts}/5`)
    console.log(`Last attempt: ${lastAttemptDate}`)
  }, 1000)
}

/**
 * Print available test commands
 */
window.authTestHelp = () => {
  console.group('🧪 Auth Testing Commands')
  console.log('authStatus() - Show current auth state')
  console.log('testLogin(username, password) - Test login API')
  console.log('testVerify() - Verify current token')
  console.log('testRateLimit(attempts) - Test rate limiting')
  console.log('decodeToken(token) - Decode JWT token')
  console.log('sessionTimeRemaining() - Check session timeout')
  console.log('monitorAttempts() - Monitor attempts counter')
  console.log('clearAuth() - Clear all auth data')
  console.groupEnd()
}

// Initialize
console.log(
  '%c🔐 Auth Testing Utils Loaded%c\n' +
  'Type: authTestHelp()\n' +
  'For available commands',
  'color: #00FF00; font-weight: bold; font-size: 16px;',
  'color: #888; font-size: 12px;'
)

