/**
 * SEO utilities and metadata
 */

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}

export function generateSEOMetadata(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image = '/og-image.png',
    url = 'https://yourusername.github.io/portfolio',
    type = 'website',
  } = config

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

