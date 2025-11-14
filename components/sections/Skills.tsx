'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Badge,
  VStack,
  useColorModeValue,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { staggerContainer, staggerItem, staggerFade, staggerFadeItem } from '@/lib/animations'
import skillsData from '@/data/skills.json'

export function Skills() {
  const levelColors: Record<string, string> = {
    Expert: 'green',
    Advanced: 'blue',
    Intermediate: 'yellow',
    Beginner: 'gray',
  }

  return (
    <Box id="skills" as="section" py={20} position="relative">
      <Container maxW="1200px">
        <VStack spacing={12} align="stretch">
          <SectionTitle 
            title={skillsData.title} 
            subtitle={skillsData.description}
          />

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillsData.categories.map((category, categoryIndex) => (
              <motion.div key={category.category} variants={staggerItem}>
                <Card hover>
                  <VStack align="flex-start" spacing={4}>
                    <Box>
                      <Box
                        fontSize="xl"
                        fontWeight="600"
                        color="brand.500"
                        mb={1}
                      >
                        {category.category}
                      </Box>
                      {category.description && (
                        <Text fontSize="sm" color="gray.400" mb={3}>
                          {category.description}
                        </Text>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      gap={2}
                      as={motion.div}
                      variants={staggerFade}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {category.skills.map((skill) => (
                        <Tooltip
                          key={skill.name}
                          label={
                            <Box>
                              <Text fontWeight="bold">{skill.name}</Text>
                              <Text fontSize="xs">{skill.description}</Text>
                              <Text fontSize="xs" mt={1} opacity={0.8}>
                                Level: {skill.level}
                              </Text>
                            </Box>
                          }
                          placement="top"
                          hasArrow
                        >
                          <motion.div variants={staggerFadeItem}>
                            <Badge
                              px={3}
                              py={1.5}
                              borderRadius="full"
                              colorScheme={levelColors[skill.level] || 'gray'}
                              variant="subtle"
                              fontSize="sm"
                              cursor="help"
                              _hover={{ transform: 'scale(1.05)' }}
                              transition="transform 0.2s"
                            >
                              {skill.name}
                            </Badge>
                          </motion.div>
                        </Tooltip>
                      ))}
                    </Box>
                  </VStack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
