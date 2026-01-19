<template>
  <div id="app" class="min-h-screen bg-darker text-gray-100">
    <LoadingScreen />
    <!-- ThreeBackground commented out temporarily for debugging -->
    <!-- <ThreeBackground /> -->
    
    <Navbar />
    
    <main class="relative z-20">
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LoadingScreen from './components/LoadingScreen.vue'
// import ThreeBackground from './components/ThreeBackground.vue'

onMounted(() => {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Prevent scroll on loading
  document.body.style.overflow = 'hidden'
  
  // Allow scroll after loading
  setTimeout(() => {
    document.body.style.overflow = 'auto'
  }, 2500)
})
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
}
</style>
