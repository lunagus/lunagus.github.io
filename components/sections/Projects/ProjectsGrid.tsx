'use client'

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Badge,
  Text,
  Image,
  IconButton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import { Project } from '@/types/project'
import { ProjectModal } from './ProjectModal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { trackProjectClick } from '@/lib/analytics'
import { useI18n } from '@/lib/i18n/context'
import projectsData from '@/data/projects.json'

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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

  const projects: Project[] = projectsData as Project[]

  return (
    <>
      <Box id="projects" as="section" py={20} position="relative">
        <Container maxW="1200px">
          <VStack spacing={12} align="stretch">
            <SectionTitle title={t.projects.title} />

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={8}
              as={motion.div}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <Card hover tilt onClick={() => setSelectedProject(project)} cursor="pointer" h="100%" display="flex" flexDirection="column">
                    <Box
                      position="relative"
                      width="100%"
                      height="200px"
                      overflow="hidden"
                      bg="gray.800"
                      mb={4}
                      borderRadius="xl"
                    >
                      {project.screenshots[0] && (
                        <Image
                          src={project.screenshots[0]}
                          alt={project.title}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          loading="lazy"
                        />
                      )}
                      {project.featured && (
                        <Badge
                          position="absolute"
                          top={2}
                          right={2}
                          colorScheme="brand"
                          borderRadius="full"
                          px={2}
                        >
                          {t.common.featured}
                        </Badge>
                      )}
                    </Box>

                    <VStack align="flex-start" spacing={3} flex="1">
                      <Box fontSize="xl" fontWeight="600">
                        {getProjectContent(project, 'title')}
                      </Box>
                      <Text color="gray.400" fontSize="sm" flex="1">
                        {getProjectContent(project, 'description')}
                      </Text>

                      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            px={2}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            colorScheme="gray"
                            variant="subtle"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge
                            px={2}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            colorScheme="gray"
                            variant="subtle"
                          >
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </Box>

                      <HStack spacing={2} width="100%">
                        <IconButton
                          aria-label="View on GitHub"
                          icon={<Github size={18} />}
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            trackProjectClick(project.title, 'github')
                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                          }}
                        />
                        <HStack spacing={2} flex="1">
                          {project.demoUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                trackProjectClick(project.title, 'demo')
                                window.open(project.demoUrl!, '_blank', 'noopener,noreferrer')
                              }}
                              leftIcon={<ExternalLink size={16} />}
                            >
                              {t.projects.tryItLive}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              trackProjectClick(project.title, 'view')
                              setSelectedProject(project)
                            }}
                          >
                              {t.projects.viewDetails}
                            </Button>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          allProjects={projects}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onProjectChange={(newProject) => setSelectedProject(newProject)}
        />
      )}
    </>
  )
}

