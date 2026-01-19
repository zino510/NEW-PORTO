<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-darker overflow-hidden">
    <!-- Simple Loading -->
    <div class="text-center">
      <div class="text-4xl font-bold text-cyan-400 mb-4">Loading...</div>
      <div class="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
@keyframes spin {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}

.animate-spin {
  animation: spin 1s linear infinite
}

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
