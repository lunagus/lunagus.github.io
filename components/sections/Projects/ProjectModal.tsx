'use client'

// Note: Consider installing React DevTools for better development experience:
// https://reactjs.org/link/react-devtools

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Box,
  Image,
  IconButton,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { Project } from '@/types/project'
import { useI18n } from '@/lib/i18n/context'

interface ProjectModalProps {
  project: Project
  allProjects: Project[]
  isOpen: boolean
  onClose: () => void
  onProjectChange?: (project: Project) => void
}

export function ProjectModal({ project, allProjects, isOpen, onClose, onProjectChange }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const userscriptBg = useColorModeValue('gray.50', 'gray.700')
  const controls = useAnimation()
  const { t, locale } = useI18n()
  
  // Helper function to get translated project content
  const getProjectContent = (project: Project, field: 'title' | 'description' | 'longDescription') => {
    if (t.projects.descriptions[project.id as keyof typeof t.projects.descriptions]) {
      const projectTranslations = t.projects.descriptions[project.id as keyof typeof t.projects.descriptions]
      return projectTranslations[field]
    }
    // Fallback - return empty string if no translation found
    return ''
  }

  // Find current project index
  useEffect(() => {
    const index = allProjects.findIndex((p) => p.id === project.id)
    if (index !== -1) {
      setCurrentProjectIndex(index)
      setCurrentImageIndex(0) // Reset image index when project changes
    }
  }, [project.id, allProjects])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
  }, [project.screenshots.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)
  }, [project.screenshots.length])

  const nextProject = useCallback(() => {
    const nextIndex = (currentProjectIndex + 1) % allProjects.length
    const nextProject = allProjects[nextIndex]
    if (onProjectChange) {
      onProjectChange(nextProject)
    }
  }, [currentProjectIndex, allProjects, onProjectChange])

  const prevProject = useCallback(() => {
    const prevIndex = (currentProjectIndex - 1 + allProjects.length) % allProjects.length
    const prevProject = allProjects[prevIndex]
    if (onProjectChange) {
      onProjectChange(prevProject)
    }
  }, [currentProjectIndex, allProjects, onProjectChange])

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      if (project.screenshots.length > 1 && currentImageIndex < project.screenshots.length - 1) {
        nextImage()
      } else {
        nextProject()
      }
    }
    if (isRightSwipe) {
      if (project.screenshots.length > 1 && currentImageIndex > 0) {
        prevImage()
      } else {
        prevProject()
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (project.screenshots.length > 1 && currentImageIndex > 0) {
          prevImage()
        } else {
          prevProject()
        }
      } else if (e.key === 'ArrowRight') {
        if (project.screenshots.length > 1 && currentImageIndex < project.screenshots.length - 1) {
          nextImage()
        } else {
          nextProject()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, currentImageIndex, project.screenshots.length, prevImage, nextImage, prevProject, nextProject])

  return (
    <React.Fragment>
      {/* Project Navigation Arrows - Outside Modal - Hidden on mobile */}
      {allProjects.length > 1 && isOpen && (
        <React.Fragment>
          <IconButton
            aria-label="Previous project"
            icon={<ArrowLeft size={20} />}
            position="fixed"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2000}
            onClick={prevProject}
            borderRadius="full"
            bg="brand.500"
            color="white"
            _hover={{ bg: 'brand.600', transform: 'translateY(-50%) scale(1.1)' }}
            transition="all 0.2s"
            size="md"
            boxShadow="xl"
            display={{ base: 'none', md: 'flex' }}
          />
          <IconButton
            aria-label="Next project"
            icon={<ArrowRight size={20} />}
            position="fixed"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2000}
            onClick={nextProject}
            borderRadius="full"
            bg="brand.500"
            color="white"
            _hover={{ bg: 'brand.600', transform: 'translateY(-50%) scale(1.1)' }}
            transition="all 0.2s"
            size="md"
            boxShadow="xl"
            display={{ base: 'none', md: 'flex' }}
          />
        </React.Fragment>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(4px)" />
        <ModalContent bg={bg} borderRadius="2xl" maxH="90vh" overflow="hidden">
          <ModalCloseButton zIndex={10} />
          <ModalBody p={0} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <Box display="flex" flexDirection={{ base: 'column', lg: 'row' }} maxH="90vh" position="relative">

            {/* Image Carousel */}
            <Box
              position="relative"
              width={{ base: '100%', lg: '60%' }}
              height={{ base: '300px', lg: 'auto' }}
              bg="gray.900"
              overflow="hidden"
            >
              {project.screenshots.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Image
                        src={project.screenshots[currentImageIndex]}
                        alt={`${getProjectContent(project, 'title')} screenshot ${currentImageIndex + 1}`}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {project.screenshots.length > 1 && (
                    <>
                      {/* Image navigation arrows - Hidden on mobile */}
                      <IconButton
                        aria-label="Previous image"
                        icon={<ChevronLeft size={24} />}
                        position="absolute"
                        left={4}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={prevImage}
                        borderRadius="full"
                        bg="blackAlpha.600"
                        color="white"
                        _hover={{ bg: 'blackAlpha.800' }}
                        zIndex={10}
                        display={{ base: 'none', md: 'flex' }}
                      />
                      <IconButton
                        aria-label="Next image"
                        icon={<ChevronRight size={24} />}
                        position="absolute"
                        right={4}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={nextImage}
                        borderRadius="full"
                        bg="blackAlpha.600"
                        color="white"
                        _hover={{ bg: 'blackAlpha.800' }}
                        zIndex={10}
                        display={{ base: 'none', md: 'flex' }}
                      />

                      <HStack
                        position="absolute"
                        bottom={4}
                        left="50%"
                        transform="translateX(-50%)"
                        spacing={2}
                        zIndex={10}
                      >
                        {project.screenshots.map((_, index) => (
                          <Box
                            key={index}
                            width={currentImageIndex === index ? '24px' : '8px'}
                            height="8px"
                            bg={currentImageIndex === index ? 'brand.500' : 'whiteAlpha.500'}
                            borderRadius="full"
                            cursor="pointer"
                            onClick={() => setCurrentImageIndex(index)}
                            transition="all 0.3s"
                          />
                        ))}
                      </HStack>
                    </>
                  )}
                </>
              ) : (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                >
                  No screenshots available
                </Box>
              )}
            </Box>

            {/* Content */}
            <VStack
              spacing={6}
              align="stretch"
              p={8}
              width={{ base: '100%', lg: '40%' }}
              overflowY="auto"
            >
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between" align="flex-start">
                  <Heading as="h2" fontSize="3xl" fontWeight="700" flex="1">
                    {getProjectContent(project, 'title')}
                  </Heading>
                  {allProjects.length > 1 && (
                    <Text fontSize="sm" color="gray.500" whiteSpace="nowrap" pt={2}>
                      {currentProjectIndex + 1} / {allProjects.length}
                    </Text>
                  )}
                </HStack>
                {getProjectContent(project, 'longDescription') && (
                  <Text color="gray.400" lineHeight="1.8">
                    {getProjectContent(project, 'longDescription')}
                  </Text>
                )}
              </VStack>

              {/* Userscripts Section (if applicable) */}
              {project.userscripts && project.userscripts.length > 0 && (
                <VStack align="stretch" spacing={4}>
                  {project.userscripts.map((script, idx) => (
                    <Box
                      key={idx}
                      p={4}
                      borderRadius="lg"
                      bg={userscriptBg}
                      border="1px"
                      borderColor={borderColor}
                    >
                      <VStack align="stretch" spacing={3}>
                        <Heading as="h4" fontSize="md" fontWeight="600">
                          {locale === 'es' && script.name_es ? script.name_es : script.name}
                        </Heading>
                        <Text fontSize="sm" color="gray.400">
                          {locale === 'es' && script.description_es ? script.description_es : script.description}
                        </Text>
                        <VStack align="flex-start" spacing={1} mb={2}>
                          {(locale === 'es' && script.features_es ? script.features_es : script.features).map(
                            (feature, fIdx) => (
                              <Text key={fIdx} fontSize="xs" color="gray.500">
                                • {feature}
                              </Text>
                            )
                          )}
                        </VStack>
                        <Button
                          leftIcon={<Github size={16} />}
                          onClick={() => window.open(script.githubUrl, '_blank', 'noopener,noreferrer')}
                          size="sm"
                          width="full"
                        >
                          {t.common.viewCode}
                        </Button>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              )}

              <VStack align="stretch" spacing={3}>
                <Heading as="h3" fontSize="lg" fontWeight="600">
                  {t.common.technologies}
                </Heading>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      px={3}
                      py={1}
                      borderRadius="full"
                      colorScheme="brand"
                      variant="subtle"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Box>
              </VStack>

              <VStack align="stretch" spacing={3}>
                <Heading as="h3" fontSize="lg" fontWeight="600">
                  Tags
                </Heading>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {project.tags.map((tag) => (
                    <Badge key={tag} px={3} py={1} borderRadius="full" variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </Box>
              </VStack>

              {!project.userscripts && (
                <HStack spacing={4} pt={4}>
                  <Button
                    leftIcon={<Github size={18} />}
                    onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    flex={project.demoUrl ? '1' : 'none'}
                    width={project.demoUrl ? 'auto' : 'full'}
                  >
                    {t.common.viewCode}
                  </Button>
                  {project.demoUrl && (
                    <Button
                      leftIcon={<ExternalLink size={18} />}
                      onClick={() => window.open(project.demoUrl!, '_blank', 'noopener,noreferrer')}
                      variant="outline"
                      flex="1"
                    >
                      {t.common.viewProject}
                    </Button>
                  )}
                </HStack>
              )}
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    </React.Fragment>
  )
}
