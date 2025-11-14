'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Download, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { downloadFile, scrollToSection } from '@/lib/utils'
import { trackCVDownload } from '@/lib/analytics'
import heroData from '@/data/hero.json'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const accentColor = useColorModeValue('brand.600', 'brand.400')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownloadCV = () => {
    downloadFile('/CV.pdf', 'CV.pdf')
    trackCVDownload()
  }

  const scrollToNext = () => {
    scrollToSection('projects', 80)
  }

  if (!mounted) return null

  return (
    <Box
      id="home"
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      pt={20}
      pb={{ base: 24, md: 16 }}
      overflow="hidden"
    >
      <Container maxW="1200px" position="relative" zIndex={1}>
        <VStack
          spacing={4}
          align="flex-start"
          maxW="800px"
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem}>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={accentColor}
              fontWeight="600"
              mb={1}
            >
              {heroData.greeting}
            </Text>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="800"
              lineHeight="1.1"
              mb={2}
            >
              {heroData.name}
            </Heading>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              fontWeight="600"
              color="gray.500"
              mb={4}
            >
              {heroData.title}
            </Heading>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.400" maxW="600px" mb={8}>
              {heroData.description}
            </Text>
          </motion.div>

          <motion.div variants={staggerItem}>
            <HStack spacing={4} flexWrap="wrap">
              <Button
                size="lg"
                leftIcon={<Download size={20} />}
                onClick={handleDownloadCV}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                {heroData.cta.primary.label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact', 80)}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                {heroData.cta.secondary.label}
              </Button>
            </HStack>
          </motion.div>
        </VStack>
      </Container>

      <Box
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        display={{ base: 'none', md: 'block' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Button
            variant="ghost"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            size="sm"
          >
            <ChevronDown size={24} />
          </Button>
        </motion.div>
      </Box>
    </Box>
  )
}

