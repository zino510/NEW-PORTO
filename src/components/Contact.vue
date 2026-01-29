<template>
  <section id="contact" class="relative py-20 overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-2">Get In Touch</span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
        <p class="text-gray-400 max-w-2xl mx-auto mb-8">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Contact Info Cards -->
        <a href="mailto:zahbarqalsyahzinhoulhaq052@gmail.com" class="glass p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition duration-300 group cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex-center mb-4 group-hover:scale-110 transition duration-300">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Email</h3>
        </a>

        <a href="https://instagram.com/zinnsyaikh" target="_blank" class="glass p-6 rounded-lg border border-secondary/20 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition duration-300 group cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-pink-500 flex-center mb-4 group-hover:scale-110 transition duration-300">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.95 21C17.64 21 15.36 20.59 13.22 19.73L9.03 23.92C8.35 24.57 7.27 23.27 6.59 22.62L2.4 18.43C1.54 16.29 1.13 14.02 1.13 11.7C1.13 6.04 5.5 1.63 11.16 1.63C16.82 1.63 21.19 6.04 21.19 11.7C21.19 17.36 16.82 21 10.16 21H19.95Z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Instagram</h3>
          <p class="text-gray-400 text-sm group-hover:text-secondary transition duration-300">@zinnsyaikh</p>
        </a>

        <a href="https://www.linkedin.com/in/zahbarqal-syahzinhoulhaq-53a7a639a/?originalSubdomain=id" target="_blank" class="glass p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300 group cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex-center mb-4 group-hover:scale-110 transition duration-300">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.49v8.5h2.5v-4.6c0-.78.62-1.4 1.4-1.4.77 0 1.4.62 1.4 1.39v4.61h2.49M6.88 8.56a1.68 1.68 0 0 1-1.68-1.68c0-.93.75-1.69 1.68-1.69.93 0 1.69.76 1.69 1.69 0 .93-.76 1.68-1.69 1.68m1.39 9.94v-8.5H5.5v8.5h2.77z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">LinkedIn</h3>
          <p class="text-gray-400 text-sm group-hover:text-cyan-500 transition duration-300">Zahbarqal Syahzihoulhaq</p>
        </a>
      </div>

      <!-- Contact Form -->
      <div class="glass p-8 rounded-lg border border-gray-700">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium mb-2">Full Name</label>
              <input 
                v-model="form.name"
                type="text" 
                placeholder="John Doe"
                class="w-full"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2">Email Address</label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="john@example.com"
                class="w-full"
                required
              />
            </div>
          </div>

          <!-- Subject -->
          <div>
            <label class="block text-sm font-medium mb-2">Subject</label>
            <input 
              v-model="form.subject"
              type="text" 
              placeholder="Project Inquiry"
              class="w-full"
              required
            />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium mb-2">Message</label>
            <textarea 
              v-model="form.message"
              placeholder="Tell me about your project..."
              rows="5"
              class="w-full resize-none"
              required
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-4 pt-4">
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
              <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button 
              type="reset"
              class="btn-secondary px-8 py-3 font-semibold"
            >
              Clear
            </button>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            {{ successMessage }}
          </div>
        </form>
      </div>

      <!-- Social Links -->
      <div class="mt-12 text-center">
        <p class="text-gray-400 mb-6">Follow me on social media</p>
        <div class="flex justify-center gap-6">
          <a href="#" class="w-12 h-12 rounded-full glass border border-primary/20 hover:border-primary/50 hover:bg-primary/10 flex-center transition duration-300 group">
            <svg class="w-5 h-5 group-hover:text-primary transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" class="w-12 h-12 rounded-full glass border border-secondary/20 hover:border-secondary/50 hover:bg-secondary/10 flex-center transition duration-300 group">
            <svg class="w-5 h-5 group-hover:text-secondary transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z"/>
            </svg>
          </a>
          <a href="#" class="w-12 h-12 rounded-full glass border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 flex-center transition duration-300 group">
            <svg class="w-5 h-5 group-hover:text-cyan-500 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7-2.25 1.5-7 1.5-7 1.5z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-40 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div class="absolute bottom-40 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false
    successMessage.value = 'Message sent successfully! I\'ll get back to you soon.'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }, 1500)
}

onMounted(() => {
  gsap.to('#contact', {
    scrollTrigger: {
      trigger: '#contact',
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
