import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from './foundations/colors'
import { fonts, fontSizes, fontWeights, lineHeights } from './foundations/typography'
import { shadows } from './foundations/shadows'
import { Button } from './components/button'
import { Card } from './components/card'
import { Heading } from './components/heading'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  shadows,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
        transition: 'background-color 0.2s, color 0.2s',
      },
    }),
  },
  components: {
    Button,
    Card,
    Heading,
  },
})
