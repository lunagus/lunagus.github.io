'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  Button,
  Show,
  Hide,
} from '@chakra-ui/react'
import { Moon, Sun, Menu, Home, Code, Briefcase, Mail, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { fadeInLeft } from '@/lib/animations'
import { scrollToSection, throttle } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Projects', href: '#projects', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'About', href: '#about', icon: Info },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'about', 'contact']
      const scrollPosition = window.scrollY
      const navbarHeight = 80
      
      // Always ensure home is active when at the very top
      if (scrollPosition < 50) {
        setActiveSection('home')
        return
      }

      // Find the section that's currently most visible in the viewport
      let mostVisibleSection = 'home'
      let maxVisibility = 0
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top
          const elementBottom = rect.bottom
          const viewportHeight = window.innerHeight
          
          // Calculate how much of the section is visible in the viewport
          // Account for navbar space at the top
          const visibleTop = Math.max(elementTop, navbarHeight)
          const visibleBottom = Math.min(elementBottom, viewportHeight)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const visibilityPercentage = visibleHeight / rect.height
          
          // Update most visible section if this one has higher visibility
          if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage
            mostVisibleSection = sectionId
          }
        }
      })
      
      // Only update if the most visible section is actually visible
      if (maxVisibility > 0.1) { // At least 10% visible
        setActiveSection(mostVisibleSection)
      }
    }

    // Throttle scroll events for better performance
    const throttledHandleScroll = throttle(handleScroll, 16) // ~60fps
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    scrollToSection(id, 80)
    onClose()
  }

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={bg}
        backdropFilter="blur(10px)"
        borderBottom="1px"
        borderColor={borderColor}
        transition="all 0.3s"
        boxShadow={scrolled ? 'md' : 'none'}
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={4}
          justify="space-between"
          align="center"
        >
          <Box
            as={motion.div}
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            fontWeight="bold"
            fontSize="xl"
            color="brand.500"
            cursor="pointer"
            onClick={() => handleNavClick('#home')}
          >
            lunagus
          </Box>

          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  position="relative"
                  _hover={{ textDecoration: 'none', color: 'brand.500' }}
                  color={isActive ? 'brand.500' : 'inherit'}
                  fontWeight={isActive ? '600' : '400'}
                  transition="color 0.2s"
                  px={2}
                  py={1}
                >
                  {item.label}
                  {isActive && (
                    <Box
                      as={motion.div}
                      layoutId="activeSection"
                      position="absolute"
                      bottom="-4px"
                      left={0}
                      right={0}
                      height="2px"
                      bg="brand.500"
                      borderRadius="full"
                    />
                  )}
                </Link>
              )
            })}
          </HStack>

          <HStack spacing={2}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
            <Show below="md">
              <IconButton
                aria-label="Open menu"
                icon={<Menu size={20} />}
                onClick={onOpen}
                variant="ghost"
                size="sm"
              />
            </Show>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Hide above="md">
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          zIndex={1000}
          bg={bg}
          backdropFilter="blur(10px)"
          borderTop="1px"
          borderColor={borderColor}
          boxShadow="0 -4px 6px rgba(0, 0, 0, 0.1)"
        >
          <HStack
            justify="space-around"
            py={2}
            px={4}
            spacing={0}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  color={isActive ? 'brand.500' : 'gray.500'}
                  size="sm"
                  flexDirection="column"
                  height="auto"
                  py={2}
                  px={3}
                  minW="auto"
                  _hover={{ bg: 'transparent', color: 'brand.500' }}
                >
                  <Icon size={20} />
                  <Box fontSize="xs" mt={1}>
                    {item.label}
                  </Box>
                  {isActive && (
                    <Box
                      position="absolute"
                      top={0}
                      left="50%"
                      transform="translateX(-50%)"
                      width="40px"
                      height="2px"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        as={motion.div}
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
                        borderRadius="full"
                        initial={{ scaleX: 0, opacity: 0.5 }}
                        animate={{ scaleX: [0, 1], opacity: [0.5, 1] }}
                        transition={{ 
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1]
                        } as any}
                        style={{ transformOrigin: 'left' }}
                      />
                      <Box
                        as={motion.div}
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        bg="brand.500"
                        borderRadius="full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                          duration: 2, 
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0.5
                        } as any}
                        opacity={0.6}
                      />
                    </Box>
                  )}
                </Button>
              )
            })}
          </HStack>
        </Box>
      </Hide>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="stretch" pt={4}>
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    justifyContent="flex-start"
                    leftIcon={<Icon size={20} />}
                    onClick={() => handleNavClick(item.href)}
                    color={isActive ? 'brand.500' : 'inherit'}
                    fontWeight={isActive ? '600' : '400'}
                    bg={isActive ? 'brand.50' : 'transparent'}
                    _hover={{ bg: 'brand.50' }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

