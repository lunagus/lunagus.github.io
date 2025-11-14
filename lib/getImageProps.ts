/**
 * Image metadata for optimization and lazy loading
 */

export interface ImageMetadata {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export const imageMetadata: Record<string, ImageMetadata> = {
  // Add your image metadata here
  // Example:
  // 'hero-image': {
  //   src: '/images/hero.jpg',
  //   alt: 'Hero image',
  //   width: 1200,
  //   height: 800,
  //   priority: true,
  // },
}

export function getImageProps(key: string): ImageMetadata | null {
  return imageMetadata[key] || null
}

