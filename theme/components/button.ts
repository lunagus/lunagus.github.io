import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'xl',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 2,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 3,
    },
    lg: {
      fontSize: 'lg',
      px: 8,
      py: 4,
    },
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _hover: {
        bg: 'brand.600',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      _active: {
        bg: 'brand.700',
      },
    },
    outline: {
      border: '2px solid',
      borderColor: 'brand.500',
      color: 'brand.500',
      _hover: {
        bg: 'brand.50',
        color: 'brand.600',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
    },
    ghost: {
      _hover: {
        bg: 'brand.50',
        color: 'brand.600',
      },
    },
    glass: (props) => ({
      bg: props.colorMode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid',
      borderColor: props.colorMode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)',
      _hover: {
        bg: props.colorMode === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.9)',
        transform: 'translateY(-2px)',
      },
    }),
  },
  defaultProps: {
    colorScheme: 'brand',
    size: 'md',
  },
}

