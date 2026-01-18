<template>
  <section id="projects" class="relative py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-2">My Work</span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button 
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-6 py-2 rounded-full font-medium transition duration-300"
          :class="selectedCategory === category 
            ? 'bg-gradient-to-r from-primary to-secondary text-white' 
            : 'glass border border-primary/20 hover:border-primary/50 text-gray-300'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in filteredProjects"
          :key="project.id"
          class="group glass rounded-lg overflow-hidden border border-gray-700 hover:border-primary/50 transition duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-2"
        >
          <!-- Project Image -->
          <div class="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-gray-600 group-hover:scale-110 transition duration-500">
              <svg class="w-24 h-24 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.3-1.54c-.3-.36-.77-.36-1.07 0l-2.36 2.81c-.29.35-.02.89.37.89h11.68c.39 0 .66-.54.37-.89l-3.64-4.35c-.3-.36-.77-.36-1.07 0z"/>
              </svg>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="text-xl font-bold mb-1">{{ project.title }}</h3>
                <span class="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <p class="text-gray-400 text-sm mb-4 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" :key="tech" class="text-xs px-2 py-1 rounded-full border border-primary/30 text-primary/80">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Links -->
            <div class="flex gap-3 pt-4 border-t border-gray-700">
              <a 
                href="#"
                class="flex-1 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition duration-300 text-center"
              >
                View Demo
              </a>
              <a 
                href="#"
                class="flex-1 px-4 py-2 rounded-lg border border-primary/30 hover:border-primary/80 text-primary text-sm font-medium transition duration-300 text-center"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-40 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-40 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = ref(['All', 'Frontend', 'Full Stack', '3D Web'])
const selectedCategory = ref('All')

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with real-time inventory management and payment integration.',
    category: 'Full Stack',
    technologies: ['Vue 3', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/projects/ecommerce.jpg'
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description: 'Interactive portfolio with Three.js animations and immersive user experience.',
    category: 'Frontend',
    technologies: ['Vue 3', 'Three.js', 'GSAP', 'Tailwind'],
    image: '/projects/portfolio.jpg'
  },
  {
    id: 3,
    title: 'Real-time Chat App',
    description: 'Chat application with WebSocket integration and real-time notifications.',
    category: 'Full Stack',
    technologies: ['Vue 3', 'Node.js', 'Socket.io', 'PostgreSQL'],
    image: '/projects/chat.jpg'
  },
  {
    id: 4,
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for data visualization with multiple chart types.',
    category: 'Frontend',
    technologies: ['React', 'D3.js', 'Recharts', 'TypeScript'],
    image: '/projects/dashboard.jpg'
  },
  {
    id: 5,
    title: '3D Product Viewer',
    description: 'Interactive 3D product viewer with WebGL and interactive controls.',
    category: '3D Web',
    technologies: ['Three.js', 'WebGL', 'Babylon.js', 'TypeScript'],
    image: '/projects/3d-viewer.jpg'
  },
  {
    id: 6,
    title: 'SaaS Management Tool',
    description: 'Complete SaaS platform with multi-tenant architecture and advanced features.',
    category: 'Full Stack',
    technologies: ['Vue 3', 'Node.js', 'PostgreSQL', 'Docker'],
    image: '/projects/saas.jpg'
  }
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})

onMounted(() => {
  gsap.to('#projects', {
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })
})
</script>

<style scoped>
section {
  position: relative;
}
</style>
