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
      </div>

      <!-- Footer Info -->
      <p class="text-center text-gray-500 text-xs mt-6">
        🔒 This portal is protected. Unauthorized access is monitored.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(() => {
  // Load saved username jika ada
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    username.value = savedUsername
  }
})

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validasi input sederhana
  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password harus diisi'
    return
  }

  isLoading.value = true

  try {
    successMessage.value = 'Redirecting...'
    
    // Simpan username jika dipilih
    if (username.value) {
      localStorage.setItem('savedUsername', username.value)
    }

    // Redirect langsung ke 2117.zinsyaikh.my.id dengan credentials
    // Tanpa validasi apapun di sini
    setTimeout(() => {
      const redirectUrl = import.meta.env.VITE_REDIRECT_URL || 'https://2117.zinsyaikh.my.id'
      
      // Kirim username dan password ke 2117 untuk validasi di sana
      // Method: POST dengan credentials dalam form data
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = `${redirectUrl}/login`
      form.style.display = 'none'

      // Tambah username field
      const usernameInput = document.createElement('input')
      usernameInput.type = 'hidden'
      usernameInput.name = 'username'
      usernameInput.value = username.value
      form.appendChild(usernameInput)

      // Tambah password field
      const passwordInput = document.createElement('input')
      passwordInput.type = 'hidden'
      passwordInput.name = 'password'
      passwordInput.value = password.value
      form.appendChild(passwordInput)

      document.body.appendChild(form)
      form.submit()
    }, 300)
  } catch (error) {
    console.error('Redirect error:', error)
    errorMessage.value = 'Terjadi error saat redirect'
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
