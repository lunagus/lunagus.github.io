# Developer Portfolio

A modern, fast, animated, and responsive portfolio website built with Next.js, Chakra UI, and Framer Motion. Designed for recruiters to quickly scan and understand your skills and projects.

## Features

- 🚀 **Static Export** - Fully static site deployable to GitHub Pages
- 🎨 **Modern UI** - Built with Chakra UI with dark/light theme support
- ✨ **Smooth Animations** - Framer Motion for entrance, hover, and scroll animations
- 📱 **Fully Responsive** - Mobile-first design with sliding drawer navigation
- 📧 **Contact Form** - EmailJS integration for client-side form submissions
- 🎯 **Project Showcase** - Rich project cards with modal views and carousel screenshots
- ♿ **Accessible** - Keyboard navigation, ARIA labels, focus states, and skip-to-content link
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- ⚡ **Performance** - Lazy loading, optimized images, and small bundle sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Chakra UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- GitHub account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Add your CV:
Replace `public/CV.pdf` with your actual CV file.

5. Customize your information:
- Update `app/layout.tsx` with your name and metadata
- Update `components/Hero.tsx` with your name and bio
- Update `components/Footer.tsx` with your social links
- Update `components/Skills.tsx` with your skills
- Update `data/projects.json` with your projects

6. Add project screenshots:
Place your project screenshots in the `public/screenshots/` directory and update the paths in `data/projects.json`.

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the static export:
```bash
npm run build
```

The static files will be in the `out/` directory.

## Adding New Projects

1. Add your project screenshots to `public/screenshots/`
2. Edit `data/projects.json` and add a new project object:

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "technologies": ["React", "Next.js", "TypeScript"],
  "tags": ["Frontend", "Full-Stack"],
  "githubUrl": "https://github.com/yourusername/project",
  "demoUrl": "https://project-demo.com",
  "screenshots": [
    "/screenshots/project-1.png",
    "/screenshots/project-2.png"
  ],
  "featured": true
}
```

## EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on every push to `main`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. If your repository name is not "portfolio", update `next.config.js`:
```js
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name',
```

3. Deploy the `out/` folder to the `gh-pages` branch:
```bash
npm install -g gh-pages
gh-pages -d out
```

## Customization

### Theme Colors

Edit `theme/index.ts` to customize colors:
```typescript
colors: {
  brand: {
    // Your color palette
  }
}
```

### Typography

The project uses Inter font. To change, update the font imports in `app/layout.tsx` and the font family in `theme/index.ts`.

### Animations

Animations are configured in individual components using Framer Motion. To adjust, modify the `motion` props in each component.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ContactForm.tsx     # Contact form with EmailJS
│   ├── Footer.tsx          # Footer component
│   ├── Hero.tsx            # Hero section
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Navbar.tsx          # Navigation bar
│   ├── ProjectModal.tsx    # Project detail modal
│   ├── ProjectsGrid.tsx    # Projects grid with filtering
│   ├── Providers.tsx       # Chakra UI provider
│   └── Skills.tsx          # Skills section
├── data/
│   └── projects.json       # Projects data
├── public/
│   ├── CV.pdf             # Your CV
│   └── screenshots/       # Project screenshots
├── theme/
│   └── index.ts           # Chakra UI theme
├── types/
│   └── project.ts         # TypeScript types
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions workflow
```

## Performance Tips

- Optimize images before adding them (use tools like TinyPNG)
- Keep GIFs small and short (under 2MB recommended)
- Use WebP format for images when possible
- Lazy load images (already implemented)
- Minimize the number of projects shown initially

## Accessibility

The portfolio includes:
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus states on all clickable elements
- Skip-to-content link
- Color contrast compliance
- Screen reader friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [EmailJS](https://www.emailjs.com/)

---

**Note**: Remember to update all placeholder content (name, email, social links, projects) with your actual information before deploying!

