import { ref, computed } from 'vue'
import axios from 'axios'

// Session state
const authToken = ref(localStorage.getItem('authToken') || '')
const refreshToken = ref(localStorage.getItem('refreshToken') || '')
const sessionExpires = ref(localStorage.getItem('sessionExpires') || null)
const rememberMeExpires = ref(localStorage.getItem('rememberMeExpires') || null)
const sessionTimeout = ref(null)
const loginTime = ref(parseInt(localStorage.getItem('loginTime') || '0'))

// Constants
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 menit
const REMEMBER_ME_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 hari

export const useAuth = () => {
  // Computed
  const isAuthenticated = computed(() => {
    if (!authToken.value) return false
    
    // Check if token expired
    if (sessionExpires.value && Date.now() > parseInt(sessionExpires.value)) {
      clearAuth()
      return false
    }
    
    return true
  })

  // Setup axios interceptor untuk attach token
  const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        if (authToken.value) {
          config.headers.Authorization = `Bearer ${authToken.value}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // Handle token refresh jika expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            if (refreshToken.value) {
              const response = await axios.post('/api/auth/refresh', {
                refreshToken: refreshToken.value
              })

              authToken.value = response.data.token
              localStorage.setItem('authToken', response.data.token)
              
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`
              return axios(originalRequest)
            }
          } catch (refreshError) {
            clearAuth()
            throw refreshError
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // Login function
  const login = async (username, password, rememberMe = false) => {
    try {
      // Check credentials directly for development
      const validUsername = '2117'
      const validPassword = '2117'
      
      if (username !== validUsername || password !== validPassword) {
        return { success: false, message: 'Username atau password salah' }
      }

      // Generate mock tokens
      const token = 'mock-token-' + Math.random().toString(36).substr(2, 9)
      const mockRefreshToken = 'mock-refresh-token-' + Math.random().toString(36).substr(2, 9)

      // Save tokens
      authToken.value = token
      localStorage.setItem('authToken', token)

      // Save session expiry
      const expiresAt = Date.now() + SESSION_TIMEOUT
      sessionExpires.value = expiresAt.toString()
      localStorage.setItem('sessionExpires', expiresAt.toString())
      
      // Save login time
      loginTime.value = Date.now()
      localStorage.setItem('loginTime', Date.now().toString())

      // Handle remember me
      if (rememberMe) {
        refreshToken.value = mockRefreshToken
        localStorage.setItem('refreshToken', mockRefreshToken)
        
        const rememberMeExpiry = Date.now() + REMEMBER_ME_DURATION
        rememberMeExpires.value = rememberMeExpiry.toString()
        localStorage.setItem('rememberMeExpires', rememberMeExpiry.toString())
      }

      // Setup session timeout
      setupSessionTimeout()

      // Log successful login
      console.log('✅ Login berhasil')

      return { success: true, message: 'Login berhasil' }
    } catch (error) {
      console.error('❌ Login error:', error)
      return { success: false, message: 'Login gagal' }
    }
  }

  // Verify session
  const checkAuth = async () => {
    if (!authToken.value) {
      return false
    }

    // Check if token is still valid
    if (sessionExpires.value && Date.now() > parseInt(sessionExpires.value)) {
      clearAuth()
      return false
    }

    return isAuthenticated.value
  }

  // Logout
  const logout = async () => {
    clearAuth()
  }

  // Clear auth data
  const clearAuth = () => {
    authToken.value = ''
    refreshToken.value = ''
    sessionExpires.value = null
    rememberMeExpires.value = null
    loginTime.value = 0

    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('sessionExpires')
    localStorage.removeItem('rememberMeExpires')
    localStorage.removeItem('loginTime')

    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    console.log('✅ Auth cleared')
  }

  // Session timeout handler
  const setupSessionTimeout = () => {
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    sessionTimeout.value = setTimeout(() => {
      console.warn('⏰ Session timeout - logging out')
      clearAuth()
      // Redirect ke login page
      window.location.href = '/secret-portal'
    }, SESSION_TIMEOUT)
  }

  // Get CSRF token
  const getCsrfToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    return token || ''
  }

  // Setup interceptors on first use (lazy initialization)
  let interceptorsSetup = false
  const ensureInterceptors = () => {
    if (!interceptorsSetup) {
      setupAxiosInterceptors()
      interceptorsSetup = true
    }
  }

  // Restore session timeout jika sudah login
  if (authToken.value) {
    setupSessionTimeout()
  }

  return {
    authToken: computed(() => authToken.value),
    isAuthenticated,
    login,
    logout,
    checkAuth,
    sessionExpires: computed(() => sessionExpires.value),
    rememberMeExpires: computed(() => rememberMeExpires.value),
    loginTime: computed(() => loginTime.value),
    ensureInterceptors
  }
}