<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex-center bg-darker overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Loading Content -->
    <div class="relative z-10 text-center">
      <!-- Circular Progress -->
      <div class="w-40 h-40 mx-auto mb-8 relative flex-center">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <!-- Background circle -->
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="rgba(0, 212, 255, 0.1)" 
            stroke-width="2"
          />
          <!-- Progress circle -->
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="url(#gradient)" 
            stroke-width="2"
            stroke-linecap="round"
            :style="{ 
              strokeDasharray: `${2 * Math.PI * 45}`,
              strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
            }"
            class="transition-all duration-300"
          />
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00d4ff" />
              <stop offset="100%" stop-color="#9d00ff" />
            </linearGradient>
          </defs>
        </svg>
        
        <!-- Center percentage -->
        <div class="absolute flex-center flex-col">
          <span class="text-4xl font-bold gradient-text">{{ progress }}%</span>
          <span class="text-sm text-gray-400 mt-2">Loading...</span>
        </div>
      </div>

      <!-- Loading Text -->
      <div class="mt-12">
        <h1 class="text-3xl font-bold mb-4">
          <span class="gradient-text">Welcome to My Portfolio</span>
        </h1>
        <p class="text-gray-400 max-w-md mx-auto mb-8">
          Preparing awesome stuff for you...
        </p>
      </div>

      <!-- Loading Bar -->
      <div class="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
        <div 
          class="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <!-- Loading Dots -->
      <div class="flex justify-center gap-2 mt-8">
        <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0s;"></div>
        <div class="w-2 h-2 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
        <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const progress = ref(0)
const isLoading = ref(true)
const router = useRouter()

onMounted(() => {
  // Simulate loading progress
  const startTime = Date.now()
  const duration = 2500 // 2.5 seconds minimum loading

  const animateProgress = () => {
    const elapsed = Date.now() - startTime
    const percent = Math.min((elapsed / duration) * 100, 100)
    
    progress.value = Math.floor(percent)

    if (percent < 100) {
      requestAnimationFrame(animateProgress)
    } else {
      // After min loading time, fade out
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }

  animateProgress()
})
</script>

<style scoped>
svg circle:nth-child(2) {
  transition: stroke-dashoffset 0.3s ease;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
