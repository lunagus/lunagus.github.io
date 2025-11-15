# Developer Portfolio - Agustin Luna

**([https://lunagus.github.io/portfolio](https://lunagus.github.io/portfolio))**

A modern, interactive portfolio website built with Next.js 14, TypeScript, and Chakra UI. Features a unique terminal interface, project showcase, and responsive design optimized for GitHub Pages deployment.

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive design**: Mobile-first approach with desktop optimizations
- **Dark/Light mode**: Seamless theme switching with system preference detection
- **Smooth animations**: Framer Motion powered transitions and micro-interactions
- **Component-based architecture**: Reusable Chakra UI components
- **Accessibility**: Keyboard navigation and screen reader support

### 📁 Project Showcase
- **Interactive project grid**: Featured projects with live demos and GitHub links
- **Project modals**: Detailed project information with image carousels
- **Touch gestures**: Swipe navigation for mobile devices
- **Keyboard navigation**: Arrow keys for project/image navigation
- **"Try it live" buttons**: Direct links to live project demos

### 🖥️ Interactive Terminal
- **Command-line interface** with autocomplete functionality
- **Portfolio commands**: `whoami`, `projects`, `skills`, `experience`, `contact`, `help`
- **Advanced commands**: `skills --level` for proficiency visualization
- **Smart parsing**: Supports command arguments and flags (e.g., `projects --view=SongSeek`)
- **Clickable links**: URLs and file paths are automatically rendered as clickable links

### 📧 Contact Form
- **Formspree integration**: Serverless contact form functionality
- **Form validation**: Client-side validation with user-friendly error messages
- **Analytics tracking**: Contact form submission tracking
- **Responsive design**: Mobile-optimized contact interface

### 📊 Analytics
- **Privacy-focused**: LocalStorage-based analytics with optional external tracking
- **Multiple providers**: Supports Umami, Plausible, and Google Analytics
- **Event tracking**: Project interactions, CV downloads, section views
- **Performance optimized**: Minimal impact on page load times

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Chakra UI** - Modern React component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Styling & Theming
- **Emotion** - CSS-in-JS styling
- **Custom theme** - Consistent design system
- **Responsive design** - Mobile-first approach

### Deployment
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated CI/CD pipeline
- **Next.js static export** - Optimized for static hosting

### Integrations
- **Formspree** - Contact form handling
- **Analytics** - Optional visitor tracking
- **React DevTools** - Development tools

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── data/                  # Static data
│   ├── contact.json      # Contact form data
│   ├── hero.json         # Hero section data
│   ├── projects.json     # Projects data
│   └── skills.json       # Skills data
├── lib/                   # Utility libraries
│   ├── animations/       # Animation definitions
│   ├── terminal/         # Terminal system
│   ├── analytics.ts      # Analytics tracking
│   ├── email.ts          # Email service
│   └── utils.ts          # Utility functions
├── public/                # Static assets
│   ├── CV.pdf           # Resume/CV
│   └── screenshots/     # Project screenshots
├── theme/                 # Chakra UI theme
│   ├── components/      # Component themes
│   ├── foundations/     # Base theme values
│   └── index.ts         # Theme configuration
└── types/                # TypeScript types
    └── project.ts       # Project type definitions
```

### Code Quality

- **TypeScript** - Type safety throughout the codebase
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (recommended)
- **React DevTools** - Development debugging

### Performance

- **Optimized images** - Next.js Image optimization
- **Code splitting** - Automatic route-based splitting
- **Static generation** - Pre-built pages for fast loading
- **Minimal bundle** - Optimized dependencies

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [Chakra UI](https://chakra-ui.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)

---