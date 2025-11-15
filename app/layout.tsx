import { Providers } from '@/components/layout/Providers'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agustin Luna | Portfolio',
  description: 'Passionate Software Developer with a strong foundation in modern web development technologies. Experienced in building scalable web applications using React, Django, Node.js, and more.',
  keywords: ['developer', 'portfolio', 'web development', 'full-stack', 'React', 'Django', 'Node.js', 'JavaScript', 'Python'],
  authors: [{ name: 'Agustin Luna' }],
  creator: 'Agustin Luna',
  openGraph: {
    title: 'Agustin Luna | Portfolio',
    description: 'Passionate Software Developer with a strong foundation in modern web development technologies',
    type: 'website',
    locale: 'en_US',
    siteName: 'Agustin Luna Portfolio',
    url: 'https://lunagus.github.io/portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agustin Luna | Full-Stack Developer Portfolio',
    description: 'Passionate Software Developer with a strong foundation in modern web development technologies',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lunagus.github.io/portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Agustin Luna',
    jobTitle: 'Full-Stack Developer',
    email: 'hernanagustinluna@gmail.com',
    telephone: '+54 (385) 426-8846',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'La Banda',
      addressRegion: 'Santiago del Estero',
      addressCountry: 'Argentina',
    },
    url: 'https://lunagus.github.io/portfolio',
    sameAs: [
      'https://github.com/lunagus',
      'https://www.linkedin.com/in/agustin-luna-68a149375/',
      'https://twitter.com/lunagusk',
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Full-Stack Development',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Plausible Analytics - Lightweight and privacy-friendly */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        {/* Umami Analytics - Alternative lightweight option */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            async
            src={process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.umami.is/script.js'}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
