<template>
  <div ref="container" class="fixed top-0 left-0 w-full h-full -z-50"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, particles, mouse
let animationId = null

onMounted(() => {
  initThreeScene()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onWindowResize)
  
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer) {
    renderer.dispose()
    container.value?.removeChild(renderer.domElement)
  }
})

const initThreeScene = () => {
  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0e27)
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 50
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  
  container.value?.appendChild(renderer.domElement)
  
  // Mouse tracking
  mouse = { x: 0, y: 0 }
  
  // Create particle system
  createParticles()
  
  // Create geometric shapes
  createGeometry()
  
  // Lights
  const light = new THREE.PointLight(0x00d4ff, 1)
  light.position.set(20, 20, 20)
  scene.add(light)
  
  const light2 = new THREE.PointLight(0x9d00ff, 0.8)
  light2.position.set(-20, -20, 10)
  scene.add(light2)
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)
  
  // Start animation loop
  animate()
}

const createParticles = () => {
  const particleCount = 100
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 200
    positions[i + 1] = (Math.random() - 0.5) * 200
    positions[i + 2] = (Math.random() - 0.5) * 200
    
    velocities[i] = (Math.random() - 0.5) * 0.5
    velocities[i + 1] = (Math.random() - 0.5) * 0.5
    velocities[i + 2] = (Math.random() - 0.5) * 0.5
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  })
  
  particles = new THREE.Points(geometry, material)
  scene.add(particles)
  
  // Store velocities for animation
  particles.velocities = velocities
}

const createGeometry = () => {
  // Create some geometric shapes for visual interest
  const shapes = []
  
  // Cube
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9d00ff,
    metalness: 0.5,
    roughness: 0.5,
    emissive: 0x9d00ff,
    emissiveIntensity: 0.2
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(30, 30, 0)
  cube.rotation.set(0.5, 0.5, 0)
  scene.add(cube)
  shapes.push(cube)
  
  // Sphere
  const sphereGeometry = new THREE.IcosahedronGeometry(8, 4)
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.5,
    roughness: 0.5,
    emissive: 0x00d4ff,
    emissiveIntensity: 0.2
  })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(-30, -30, -20)
  scene.add(sphere)
  shapes.push(sphere)
  
  // Store shapes for animation
  scene.userData.shapes = shapes
}

const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  // Animate particles
  if (particles) {
    const positionAttribute = particles.geometry.getAttribute('position')
    const positions = positionAttribute.array
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += particles.velocities[i]
      positions[i + 1] += particles.velocities[i + 1]
      positions[i + 2] += particles.velocities[i + 2]
      
      // Bounce particles
      if (Math.abs(positions[i]) > 100) particles.velocities[i] *= -1
      if (Math.abs(positions[i + 1]) > 100) particles.velocities[i + 1] *= -1
      if (Math.abs(positions[i + 2]) > 100) particles.velocities[i + 2] *= -1
    }
    
    positionAttribute.needsUpdate = true
    particles.rotation.x += 0.0002
    particles.rotation.y += 0.0003
  }
  
  // Animate geometric shapes
  if (scene.userData.shapes) {
    scene.userData.shapes.forEach((shape, index) => {
      shape.rotation.x += 0.002
      shape.rotation.y += 0.003
      
      // Apply parallax effect with mouse movement
      shape.position.x += (mouse.x * 50 - shape.position.x) * 0.02
      shape.position.y += (mouse.y * 50 - shape.position.y) * 0.02
    })
  }
  
  // Move camera with mouse
  camera.position.x += (mouse.x * 20 - camera.position.x) * 0.01
  camera.position.y += (mouse.y * 20 - camera.position.y) * 0.01
  camera.lookAt(scene.position)
  
  renderer.render(scene, camera)
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
