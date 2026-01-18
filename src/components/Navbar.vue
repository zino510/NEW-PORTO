<template>
  <nav class="fixed top-0 left-0 right-0 z-40 transition-all duration-300" :class="navClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold gradient-text hover:opacity-80 transition">
            <span class="inline-block">Portfolio</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a 
              v-for="item in navItems"
              :key="item"
              :href="`#${item.toLowerCase()}`"
              class="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors duration-300"
              :class="activeSection === item ? 'text-primary' : 'text-gray-300'"
            >
              {{ item }}
            </a>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <button class="btn-primary text-sm">
            Let's Connect
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden bg-darker/95 backdrop-blur-sm rounded-lg mt-2 p-4">
          <a 
            v-for="item in navItems"
            :key="item"
            :href="`#${item.toLowerCase()}`"
            class="block px-3 py-2 rounded-md text-base font-medium hover:text-primary transition mb-2"
            @click="isMobileMenuOpen = false"
          >
            {{ item }}
          </a>
          <button class="btn-primary w-full mt-4">
            Let's Connect
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const activeSection = ref('Home')
const isScrolled = ref(false)
const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact']

const navClass = {
  'bg-darker/80 backdrop-blur-md border-b border-gray-700': isScrolled.value,
  'bg-transparent': !isScrolled.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  // Update active section based on scroll position
  const sections = ['hero', 'about', 'skills', 'projects', 'contact']
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        activeSection.value = section.charAt(0).toUpperCase() + section.slice(1)
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
nav {
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}
</style>
