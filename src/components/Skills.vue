<template>
  <section id="skills" class="relative py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-2">My Expertise</span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
      </div>

      <!-- Skill Categories -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Frontend -->
        <div class="glass p-8 rounded-lg border border-primary/20 hover:border-primary/50 group transition duration-300">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex-center mr-4 group-hover:scale-110 transition duration-300">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold">Frontend</h3>
          </div>
          <div class="space-y-4">
            <div v-for="skill in frontendSkills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium">{{ skill.name }}</span>
                <span class="text-xs text-primary">{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="glass p-8 rounded-lg border border-secondary/20 hover:border-secondary/50 group transition duration-300">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-pink-500 flex-center mr-4 group-hover:scale-110 transition duration-300">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold">Backend</h3>
          </div>
          <div class="space-y-4">
            <div v-for="skill in backendSkills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium">{{ skill.name }}</span>
                <span class="text-xs text-secondary">{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-secondary to-pink-500 rounded-full transition-all duration-1000"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Others -->
        <div class="glass p-8 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 group transition duration-300">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex-center mr-4 group-hover:scale-110 transition duration-300">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold">Tools</h3>
          </div>
          <div class="space-y-4">
            <div v-for="skill in toolsSkills" :key="skill.name">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium">{{ skill.name }}</span>
                <span class="text-xs text-cyan-500">{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-1000"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Badges -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold mb-8 text-center">Technology Stack</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="tech in technologies"
            :key="tech"
            class="glass p-4 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition duration-300 flex items-center justify-center text-center cursor-pointer group"
          >
            <span class="text-sm font-medium group-hover:text-primary transition duration-300">{{ tech }}</span>
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-40 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-40 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frontendSkills = ref([
  { name: 'Vue.js', level: 95 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 90 },
  { name: 'Tailwind CSS', level: 92 }
])

const backendSkills = ref([
  { name: 'Node.js', level: 85 },
  { name: 'Express.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'PostgreSQL', level: 80 }
])

const toolsSkills = ref([
  { name: 'Git', level: 95 },
  { name: 'Docker', level: 75 },
  { name: 'Webpack', level: 85 },
  { name: 'CI/CD', level: 80 }
])

const technologies = ref([
  'Vue 3',
  'React',
  'Three.js',
  'GSAP',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Git',
  'WebGL',
  'REST API',
  'GraphQL',
  'Webpack'
])

onMounted(() => {
  gsap.to('#skills', {
    scrollTrigger: {
      trigger: '#skills',
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
