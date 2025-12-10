import { Providers } from '@/components/layout/Providers'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lunagus.github.io'),
  title: {
    default: 'Agustin Luna | Software Developer',
    template: '%s | Agustin Luna',
  },
  description:
    'Software Developer specializing in building clean, scalable and high-performance applications using React, Next.js, Django, Node.js and modern tooling.',
  keywords: [
    'software developer',
    'full-stack',
    'react developer',
    'django developer',
    'typescript',
    'python',
    'next.js',
    'portfolio',
    'web engineer',
  ],
  authors: [{ name: 'Agustin Luna' }],
  creator: 'Agustin Luna',

  openGraph: {
    title: 'Agustin Luna | Software Developer',
    description:
      'Software Developer specializing in modern web technologies, building scalable and high-performance applications.',
    type: 'website',
    url: 'https://lunagus.github.io/',
    siteName: 'Agustin Luna Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Agustin Luna | Software Developer',
    description:
      'Software Developer specializing in modern web technologies, building clean and scalable applications.',
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
    canonical: 'https://lunagus.github.io/',
  },

  manifest: '/favicons/site.webmanifest',

  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicons/favicon.ico'],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
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
    url: 'https://lunagus.github.io/',
    sameAs: [
      'https://github.com/lunagus',
      'https://www.linkedin.com/in/hernan-agustin-luna',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Umami Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="05887dfe-ec7d-4d8a-8000-ca40f3be3a6e"
        />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
