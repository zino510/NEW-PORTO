# Portfolio Website

A modern, interactive portfolio website built with Vue 3, Three.js, GSAP, and Tailwind CSS.

## Features

✨ **Modern Design**
- Dark theme with vibrant cyan/purple gradients
- Glassmorphism effects
- Smooth animations and transitions
- Fully responsive (mobile-first approach)

🎨 **Interactive Elements**
- 3D background with Three.js
- Particle system with parallax effects
- GSAP animations for smooth transitions
- Scroll-triggered animations
- Hover effects and micro-interactions

🚀 **Performance Optimized**
- Code splitting with dynamic imports
- Lazy loading components
- Optimized Three.js rendering
- Production-ready build

📱 **Responsive Layout**
- Mobile-first design
- Tablet and desktop breakpoints
- Touch-friendly interactions
- Adaptive images

## Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **3D Graphics**: Three.js
- **Animation Library**: GSAP (GreenSock)
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: Vue Router
- **Language**: JavaScript (TypeScript compatible)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/              # Reusable Vue components
│   ├── Navbar.vue          # Navigation bar
│   ├── Hero.vue            # Hero section
│   ├── About.vue           # About section
│   ├── Skills.vue          # Skills section
│   ├── Projects.vue        # Projects showcase
│   ├── Contact.vue         # Contact form
│   ├── Footer.vue          # Footer section
│   ├── LoadingScreen.vue   # Loading animation
│   └── ThreeBackground.vue # 3D background
├── views/
│   └── Home.vue            # Main home page
├── router/
│   └── index.js            # Route configuration
├── assets/
│   ├── css/
│   │   └── main.css        # Global styles
│   └── images/             # Image assets
├── App.vue                 # Root component
└── main.js                 # Entry point

Configuration Files:
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── tsconfig.json           # TypeScript config
├── index.html              # HTML entry point
└── package.json            # Dependencies
```

## Features Guide

### Loading Screen
- Animated circular progress indicator
- Percentage display (0-100%)
- Smooth fade-out animation
- Minimum 2.5 second display

### 3D Background
- Interactive particle system
- Geometric shapes (cube, sphere)
- Parallax effect responsive to mouse movement
- Optimized WebGL rendering

### Sections

#### Hero
- Full-screen welcome section
- Animated greeting badge
- Tech stack display
- Call-to-action buttons
- Smooth scroll indicator

#### About
- Profile information
- Experience timeline
- Education details
- Statistics cards
- Custom background animations

#### Skills
- Categorized skill groups (Frontend, Backend, Tools)
- Progress bars with skill levels
- Technology badge grid
- Interactive hover effects

#### Projects
- Filterable project grid
- Project cards with details
- Technology stack badges
- Demo and source code links
- Responsive layout

#### Contact
- Contact form with validation
- Social media links
- Contact information cards
- Success message feedback

## Customization

### Colors
Edit `tailwind.config.js` to change the primary color scheme:
```javascript
colors: {
  primary: '#00d4ff',    // Cyan
  secondary: '#9d00ff',  // Purple
}
```

### Content
Update the data in each component:
- Hero: Modify greeting and tech stack
- About: Add your bio and timeline
- Skills: Update skill names and levels
- Projects: Replace with your projects
- Contact: Add your contact information

### Fonts
Google Fonts are imported in `main.css`. To change:
1. Update the `@import` URL in `src/assets/css/main.css`
2. Update `fontFamily` in `tailwind.config.js`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## Performance Optimization

- ✅ Lazy loading components
- ✅ Code splitting
- ✅ Optimized Three.js rendering
- ✅ CSS minification
- ✅ Image optimization (add later)
- ✅ SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Blog section
- [ ] Client testimonials
- [ ] Skills filtering
- [ ] Project search
- [ ] Email service integration
- [ ] Analytics integration
- [ ] PWA support

## License

MIT License - feel free to use this portfolio template for your own projects.

## Support

For issues or questions, please open an issue in the repository.

---

Made with ❤️ using Vue 3 & Three.js
