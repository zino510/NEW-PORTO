<template>
  <section id="hero" class="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-darker/50 to-darker pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Greeting Badge -->
      <div class="inline-block mb-6 animate-fade-in">
        <div class="glass px-4 py-2 rounded-full border border-primary/50">
          <span class="text-sm font-medium text-primary flex items-center gap-2">
            <span class="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Welcome to my digital space
          </span>
        </div>
      </div>

      <!-- Main Title with Typing Animation -->
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style="animation-delay: 0.2s">
        Hi, I'm <span class="gradient-text">Zahbarqal Syahzinhoulhaq</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style="animation-delay: 0.4s">
        Selamat datang di portofolio saya.
Website ini merupakan representasi perjalanan, kompetensi, serta karya yang telah saya bangun di bidang teknologi dan pengembangan sistem. </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style="animation-delay: 0.6s">
        <button 
          class="btn-primary px-8 py-4 text-lg font-semibold group"
          @click="scrollToSection('projects')"
        >
          View My Work
          <svg class="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <button 
          class="btn-secondary px-8 py-4 text-lg font-semibold"
          @click="scrollToSection('contact')"
        >
          Get in Touch
        </button>
      </div>

      <!-- Tech Stack -->
      <div class="mb-16 animate-fade-in" style="animation-delay: 0.8s">
        <p class="text-sm text-gray-400 uppercase tracking-wider mb-4">Tech Stack</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="tech in techStack" :key="tech" class="px-4 py-2 rounded-full glass text-sm font-medium border border-primary/30 hover:border-primary/80 transition duration-300">
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const techStack = ref([
  'Vue.js 3',
  'React',
  'Three.js',
  'GSAP',
  'Tailwind CSS',
  'TypeScript',
  'WebGL',
  'Node.js'
])

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(135deg, transparent 0%, rgba(157, 0, 255, 0.05) 50%, transparent 100%);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

h1 {
  animation: float 3s ease-in-out infinite;
}
</style>
