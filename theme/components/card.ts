import { ComponentStyleConfig } from '@chakra-ui/react'

export const Card: ComponentStyleConfig = {
  baseStyle: (props) => ({
    container: {
      borderRadius: '2xl',
      bg: props.colorMode === 'dark' 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'white',
      backdropFilter: 'blur(10px)',
      boxShadow: props.colorMode === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid',
      borderColor: props.colorMode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s',
      _hover: {
        transform: 'translateY(-4px)',
        boxShadow: props.colorMode === 'dark'
          ? '0 12px 40px rgba(0, 0, 0, 0.4)'
          : '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  }),
  variants: {
    elevated: (props) => ({
      container: {
        boxShadow: props.colorMode === 'dark'
          ? '0 20px 50px rgba(0, 0, 0, 0.4)'
          : '0 20px 50px rgba(0, 0, 0, 0.15)',
      },
    }),
    flat: {
      container: {
        boxShadow: 'none',
        border: 'none',
      },
    },
  },
  defaultProps: {
    variant: 'default',
  },
}

