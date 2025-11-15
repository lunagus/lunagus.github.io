'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from '@/theme'
import { I18nProvider } from '@/lib/i18n/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <I18nProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </I18nProvider>
    </>
  )
}

