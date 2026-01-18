# Portfolio Customization Guide

## Quick Start Customization

### 1. Update Personal Information

#### Hero Section - src/components/Hero.vue
```javascript
// Change the greeting and tagline
// Modify name, description, and CTA buttons

// Update tech stack
const techStack = ref([
  'Your Tech 1',
  'Your Tech 2',
  // Add your technologies
])
```

#### About Section - src/components/About.vue
```javascript
// Replace with your story, experience, and education
// Update timeline entries
// Change statistics
```

#### Skills Section - src/components/Skills.vue
```javascript
// Update skill categories and proficiency levels
const frontendSkills = ref([
  { name: 'Your Skill', level: 95 },
  // Add your skills
])
```

#### Projects Section - src/components/Projects.vue
```javascript
// Add your actual projects
const projects = ref([
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description',
    category: 'Category',
    technologies: ['Tech1', 'Tech2'],
    image: '/path/to/image.jpg'
  },
  // Add more projects
])
```

#### Contact Section - src/components/Contact.vue
```javascript
// Update contact information
// Add your email, phone, social links
// Configure form submission (integrate with service like Formspree, SendGrid, etc.)
```

### 2. Color Customization

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#00d4ff',      // Change cyan
      secondary: '#9d00ff',    // Change purple
      dark: '#0a0e27',
      darker: '#05071a',
      card: '#1a1f3a',
    },
  },
},
```

### 3. Font Customization

Edit `src/assets/css/main.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap');
```

Update `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
  mono: ['Your Code Font', 'monospace'],
},
```

### 4. Background Images

1. Add images to `src/assets/images/`
2. Update component imports:
```javascript
import profileImage from '../assets/images/profile.jpg'
```

### 5. Configure Email Service

For contact form, integrate with:

#### Option 1: Formspree
```javascript
// In Contact.vue submitForm()
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(form.value)
})
```

#### Option 2: EmailJS
```javascript
import emailjs from '@emailjs/browser'

emailjs.init('YOUR_PUBLIC_KEY')

const submitForm = async () => {
  await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: form.value.name,
    from_email: form.value.email,
    subject: form.value.subject,
    message: form.value.message
  })
}
```

### 6. Social Media Links

Update in `Footer.vue` and `Contact.vue`:

```javascript
// Replace href with your social profiles
<a href="https://github.com/yourprofile">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
<a href="https://twitter.com/yourprofile">Twitter</a>
```

### 7. SEO Optimization

Update `index.html`:
```html
<meta name="description" content="Your unique description" />
<meta name="keywords" content="Your, Keywords, Here" />
<meta property="og:title" content="Your Portfolio Title" />
<meta property="og:description" content="Your description" />
```

Update router `src/router/index.js`:
```javascript
meta: {
  title: 'Your Custom Title',
  description: 'Your custom description'
}
```

### 8. Analytics Integration

Add to `src/main.js`:

```javascript
// Google Analytics
import { createRouter } from 'vue-router'
import router from './router'

router.afterEach((to) => {
  // Your analytics tracking code
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pageview', {
      page_path: to.path,
    })
  }
})
```

## Advanced Customization

### 1. Modify 3D Background

Edit `src/components/ThreeBackground.vue`:

```javascript
// Change particle count
const particleCount = 100 // Increase for more particles

// Modify geometry shapes
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
// Change dimensions and add more shapes

// Adjust colors
color: 0x00d4ff // Change hex color
```

### 2. Animation Tuning

Adjust GSAP animations in components:

```javascript
gsap.to(element, {
  duration: 0.6,  // Change duration
  delay: 0.2,     // Add delay
  ease: "power2.inOut" // Change easing
})
```

### 3. Loading Screen Customization

Edit `src/components/LoadingScreen.vue`:

```javascript
const duration = 2500 // Change loading duration (milliseconds)
// Customize colors, text, and animations
```

### 4. Dark Mode Toggle (Future Enhancement)

Add in `App.vue`:

```javascript
const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('light-mode')
}
```

## Deployment

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 3. GitHub Pages
1. Set repo to public
2. Run `npm run build`
3. Push `dist/` folder to `gh-pages` branch

### 4. Traditional Hosting
```bash
npm run build
# Upload `dist/` folder to your server
```

## Performance Tips

1. **Image Optimization**
   - Use webp format
   - Compress images
   - Use lazy loading

2. **Code Splitting**
   - Already implemented with Vue Router
   - Components lazy load automatically

3. **Three.js Optimization**
   - Reduce particle count if needed
   - Use LOD (Level of Detail) for complex objects
   - Enable adaptive rendering

4. **CSS Optimization**
   - Tailwind automatically purges unused styles
   - Custom CSS is minified in production

## Troubleshooting

### Components not rendering
- Check if components are imported in parent
- Verify props and events

### Animations not smooth
- Reduce particle count in ThreeBackground
- Lower requestAnimationFrame frequency
- Disable certain effects on mobile

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf .vite`

## Support & Resources

- Vue 3 Docs: https://vuejs.org/
- Three.js Docs: https://threejs.org/docs/
- GSAP Docs: https://greensock.com/gsap/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/

---

Need help? Open an issue or check the main README.md
