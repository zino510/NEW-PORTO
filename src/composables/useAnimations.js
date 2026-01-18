// Composable for GSAP animations
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade in animation on scroll
 * @param {string} selector - Element selector
 * @param {number} delay - Delay in seconds
 */
export const useFadeInOnScroll = (selector, delay = 0) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay
  })
}

/**
 * Slide up animation on scroll
 * @param {string} selector - Element selector
 */
export const useSlideUpOnScroll = (selector) => {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%'
    },
    y: 50,
    opacity: 0,
    duration: 0.6
  })
}

/**
 * Stagger animation for multiple elements
 * @param {string} selector - Elements selector
 */
export const useStaggerAnimation = (selector) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%'
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1
  })
}

/**
 * Parallax effect based on scroll
 * @param {HTMLElement} element - Element to animate
 * @param {number} speed - Parallax speed (0.5 = slower, 1.5 = faster)
 */
export const useParallax = (element, speed = 0.5) => {
  gsap.set(element, { y: 0 })
  
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: 0.5,
      markers: false
    },
    y: `${window.innerHeight * speed}px`,
    ease: 'none'
  })
}

/**
 * Text typing animation
 * @param {HTMLElement} element - Element to animate
 * @param {string} text - Text to type
 * @param {number} speed - Speed in milliseconds per character
 */
export const useTypeAnimation = async (element, text, speed = 50) => {
  element.textContent = ''
  
  for (const char of text) {
    element.textContent += char
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

/**
 * Count up animation
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {number} duration - Duration in seconds
 */
export const useCountAnimation = (element, target, duration = 2) => {
  const props = { count: 0 }
  
  gsap.to(props, {
    count: target,
    duration,
    onUpdate() {
      element.textContent = Math.ceil(props.count)
    }
  })
}

/**
 * Float animation (up and down movement)
 * @param {HTMLElement} element - Element to animate
 * @param {number} distance - Distance to float in pixels
 * @param {number} duration - Duration in seconds
 */
export const useFloatAnimation = (element, distance = 10, duration = 3) => {
  gsap.to(element, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
}

/**
 * Pulse animation
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Duration in seconds
 */
export const usePulseAnimation = (element, duration = 2) => {
  gsap.to(element, {
    opacity: 0.5,
    duration: duration / 2,
    repeat: -1,
    yoyo: true
  })
}

/**
 * Rotate animation
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Duration in seconds
 */
export const useRotateAnimation = (element, duration = 2) => {
  gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'linear'
  })
}

/**
 * Scale animation
 * @param {HTMLElement} element - Element to animate
 * @param {number} scale - Scale target
 * @param {number} duration - Duration in seconds
 */
export const useScaleAnimation = (element, scale = 1.1, duration = 0.3) => {
  const tl = gsap.timeline({ paused: true })
  
  tl.to(element, {
    scale,
    duration
  })
  
  element.addEventListener('mouseenter', () => tl.play())
  element.addEventListener('mouseleave', () => tl.reverse())
}

/**
 * Timeline animation creator
 * @returns {gsap.timeline} GSAP timeline
 */
export const createTimeline = () => {
  return gsap.timeline()
}

export default {
  useFadeInOnScroll,
  useSlideUpOnScroll,
  useStaggerAnimation,
  useParallax,
  useTypeAnimation,
  useCountAnimation,
  useFloatAnimation,
  usePulseAnimation,
  useRotateAnimation,
  useScaleAnimation,
  createTimeline
}
