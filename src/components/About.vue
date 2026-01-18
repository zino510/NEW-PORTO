<template>
  <section id="about" class="relative py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-2">Who I Am</span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image Gallery with 3D Effect -->
        <div class="perspective flex flex-col gap-6 h-full">
          <!-- Card 1 -->
          <div class="image-card group relative h-64 rounded-xl overflow-hidden cursor-pointer" ref="card1">
            <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10"></div>
            <img 
              src="../assets/images/aboutme.jpeg" 
              alt="Mountain Explorer" 
              class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500 rounded-xl"></div>
          </div>

          <!-- Card 2 -->
          <div class="image-card group relative h-64 rounded-xl overflow-hidden cursor-pointer" ref="card2">
            <div class="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10"></div>
            <img 
              src="../assets/images/aboutme2.jpeg" 
              alt="Achievement" 
              class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500 rounded-xl"></div>
          </div>

          <!-- Card 3 -->
          <div class="image-card group relative h-64 rounded-xl overflow-hidden cursor-pointer" ref="card3">
            <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10"></div>
            <img 
              src="../assets/images/aboutme3.jpeg" 
              alt="Outdoor Activity" 
              class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500 rounded-xl"></div>
          </div>
        </div>

        <!-- Content -->
<div>
  <h3 class="text-2xl md:text-3xl font-bold mb-6">
    Student of System Informatics, Networking, and Applications
  </h3>
  
  <p class="text-gray-300 mb-6 leading-relaxed">
    I am an active student at SMK Negeri 2 Depok Sleman, majoring in Sistem Informatika, Jaringan, dan Aplikasi (SIJA).
    I was born and raised in Yogyakarta, a city that has shaped both my character and passion for technology.
  </p>

  <p class="text-gray-300 mb-8 leading-relaxed">
    I have a strong interest in the field of Information Technology, particularly as a Data Analyst, UI/UX Designer,
    and Junior Frontend and Backend Developer. In addition, I continue to deepen my understanding of database systems
    to support the development of efficient and reliable applications.
  </p>

  <!-- Experience & Interests -->
  <div class="grid grid-cols-2 gap-6 mb-8">
    <div class="glass p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition duration-300">
      <div class="text-3xl font-bold gradient-text mb-2">SIJA</div>
      <p class="text-gray-400 text-sm">IT Major & Practical Learning</p>
    </div>
    <div class="glass p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition duration-300">
      <div class="text-3xl font-bold gradient-text mb-2">IT</div>
      <p class="text-gray-400 text-sm">Data, UI/UX, Web & Database</p>
    </div>
  </div>

  <!-- Timeline -->
  <div class="space-y-4">
    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="w-4 h-4 bg-primary rounded-full mt-2"></div>
        <div class="w-0.5 h-16 bg-gradient-to-b from-primary to-secondary opacity-50"></div>
      </div>
      <div class="pb-8">
        <h4 class="text-lg font-semibold text-primary mb-1">
          Student – SIJA Major
        </h4>
        <p class="text-sm text-gray-400">
          SMK Negeri 2 Depok Sleman
        </p>
        <p class="text-gray-300 text-sm mt-2">
          Actively learning networking systems, application development, and information technology fundamentals.
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="w-4 h-4 bg-secondary rounded-full mt-2"></div>
      </div>
      <div>
        <h4 class="text-lg font-semibold text-secondary mb-1">
          Personal Interests
        </h4>
        <p class="text-sm text-gray-400">
          Football • Guitar • Swimming
        </p>
      </div>
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
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)

onMounted(() => {
  // Scroll animation for section
  gsap.to('#about', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.6
  })

  // Animate cards on scroll with stagger
  const cards = [card1.value, card2.value, card3.value]
  
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        rotationX: 30
      },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out'
      }
    )
  })

  // 3D mouse tracking effect for cards
  cards.forEach(card => {
    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        })
      })
    }
  })
})
</script>

<style scoped>
section {
  position: relative;
}

.perspective {
  perspective: 1000px;
}

.image-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;
  box-shadow: 
    0 20px 40px rgba(0, 212, 255, 0.1),
    0 0 60px rgba(0, 212, 255, 0.05);
}

.image-card:hover {
  box-shadow: 
    0 40px 80px rgba(0, 212, 255, 0.2),
    0 0 80px rgba(157, 0, 255, 0.1),
    inset 0 0 30px rgba(0, 212, 255, 0.1);
}

.image-card img {
  display: block;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
