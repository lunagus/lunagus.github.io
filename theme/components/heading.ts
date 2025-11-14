import { ComponentStyleConfig } from '@chakra-ui/react'

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '700',
    lineHeight: '1.2',
  },
  sizes: {
    xs: {
      fontSize: 'xl',
    },
    sm: {
      fontSize: '2xl',
    },
    md: {
      fontSize: '3xl',
    },
    lg: {
      fontSize: '4xl',
    },
    xl: {
      fontSize: '5xl',
    },
    '2xl': {
      fontSize: '6xl',
    },
    '3xl': {
      fontSize: '7xl',
    },
  },
  variants: {
    gradient: {
      bgGradient: 'linear(to-r, brand.400, brand.600)',
      bgClip: 'text',
    },
  },
  defaultProps: {
    size: 'md',
  },
}

