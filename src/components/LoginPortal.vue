<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Portal
        </h1>
        <p class="text-gray-400 text-sm">Access your secret projects</p>
      </div>

      <!-- Login Form Card -->
      <div class="bg-gray-800 backdrop-blur-xl rounded-lg border border-gray-700 p-8 shadow-2xl">
        <!-- Alert Messages -->
        <transition name="fade">
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
            {{ errorMessage }}
          </div>
        </transition>

        <transition name="fade">
          <div v-if="successMessage" class="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-sm">
            {{ successMessage }}
          </div>
        </transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Field -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              :disabled="isLoading"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition disabled:opacity-50"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                :disabled="isLoading"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition disabled:opacity-50"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0m12 6a9 9 0 01-9 9m0 0a9 9 0 01-9-9m9 9c1.105 0 2.162-.005 3.215-.014m5.208-34.465a9.961 9.961 0 00-5.208-1.502c-5.003 0-9.264 3.193-10.748 7.653"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              type="checkbox"
              id="rememberMe"
              :disabled="isLoading"
              class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-1 cursor-pointer"
            />
            <label for="rememberMe" class="ml-2 text-sm text-gray-400 cursor-pointer">Remember me for 7 days</label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ isLoading ? 'Logging in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Attempt Counter (untuk debugging rate limiting) -->
        <div v-if="loginAttempts > 0" class="mt-4 text-xs text-gray-500 text-center">
          Login attempts: {{ loginAttempts }}/{{ maxLoginAttempts }}
        </div>
      </div>

      <!-- Footer Info -->
      <p class="text-center text-gray-500 text-xs mt-6">
        🔒 This portal is protected. Unauthorized access is monitored.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, isAuthenticated, checkAuth, ensureInterceptors } = useAuth()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const loginAttempts = ref(0)
const maxLoginAttempts = 5
const lastAttemptTime = ref(null)
const attemptTimeout = 15 * 60 * 1000 // 15 minutes

onMounted(async () => {
  // Setup interceptors on component mount
  ensureInterceptors()

  // Jika sudah login, redirect ke project
  const isAuth = await checkAuth()
  if (isAuth) {
    router.replace(import.meta.env.VITE_REDIRECT_URL || 'https://2117.zinsyaikh.my.id')
  }

  // Load remember me data jika ada
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    username.value = savedUsername
    rememberMe.value = true
  }

  // Reset attempt counter setelah 15 menit
  const lastAttempt = localStorage.getItem('lastAttempt')
  if (lastAttempt && Date.now() - parseInt(lastAttempt) > attemptTimeout) {
    localStorage.removeItem('loginAttempts')
  }

  loginAttempts.value = parseInt(localStorage.getItem('loginAttempts') || '0')
})

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validasi input
  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password harus diisi'
    return
  }

  // Check rate limiting
  if (loginAttempts.value >= maxLoginAttempts) {
    const lastAttempt = parseInt(localStorage.getItem('lastAttempt') || '0')
    const timeDiff = Date.now() - lastAttempt
    
    if (timeDiff < attemptTimeout) {
      const remainingMinutes = Math.ceil((attemptTimeout - timeDiff) / 60000)
      errorMessage.value = `Terlalu banyak percobaan. Coba lagi dalam ${remainingMinutes} menit`
      return
    } else {
      localStorage.removeItem('loginAttempts')
      loginAttempts.value = 0
    }
  }

  isLoading.value = true

  try {
    const response = await login(username.value, password.value, rememberMe.value)
    
    if (response.success) {
      successMessage.value = 'Login berhasil! Redirecting...'
      
      // Save username untuk remember me
      if (rememberMe.value) {
        localStorage.setItem('savedUsername', username.value)
      } else {
        localStorage.removeItem('savedUsername')
      }

      // Reset attempt counter
      localStorage.removeItem('loginAttempts')
      loginAttempts.value = 0

      // Redirect ke project kedua setelah 1 detik
      setTimeout(() => {
        const redirectUrl = import.meta.env.VITE_REDIRECT_URL || 'https://2117.zinsyaikh.my.id'
        window.location.href = redirectUrl
      }, 1000)
    } else {
      errorMessage.value = response.message || 'Login gagal. Periksa username dan password Anda.'
      
      // Increment attempt counter
      loginAttempts.value += 1
      localStorage.setItem('loginAttempts', loginAttempts.value.toString())
      localStorage.setItem('lastAttempt', Date.now().toString())
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Terjadi error saat login. Coba lagi nanti.'
    
    // Increment attempt counter
    loginAttempts.value += 1
    localStorage.setItem('loginAttempts', loginAttempts.value.toString())
    localStorage.setItem('lastAttempt', Date.now().toString())
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
