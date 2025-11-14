'use client'

import { Box } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <Box as="main" flex="1" id="main-content">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

