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
import { useI18n } from '@/lib/i18n/context'
import skillsData from '@/data/skills.json'

export function Skills() {
  const { t } = useI18n()
  
  // Helper function to get category translation
  const getCategoryTranslation = (categoryKey: string) => {
    const key = categoryKey.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')
    const categoryMap: Record<string, keyof typeof t.skills.categories> = {
      'programminglanguages': 'programmingLanguages',
      'frontend': 'frontend',
      'backendapis': 'backend',
      'databasesstorage': 'databases',
      'devopstools': 'devops',
      'languages': 'languages'
    }
    const translationKey = categoryMap[key]
    return translationKey ? t.skills.categories[translationKey] : { title: categoryKey, description: '' }
  }
  // Proficiency-based color scheme
  const getProficiencyBadge = (level: string) => {
    switch (level) {
      case "Expert":
        return "blue";
      case "Intermediate":
        return "green";
      case "Familiar":
        return "yellow";
      case "Native":
        return "blue";
      case "Fluent":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Box id="skills" as="section" py={20} position="relative">
      <Container maxW="1200px">
        <VStack spacing={12} align="stretch">
          <SectionTitle 
            title={t.skills.title} 
            subtitle={t.skills.description}
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
            {skillsData.categories.map((category, categoryIndex) => {
              const translatedCategory = getCategoryTranslation(category.category)
              return (
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
                          {translatedCategory.title}
                        </Box>
                        {translatedCategory.description && (
                          <Text fontSize="sm" color="gray.400" mb={3}>
                            {translatedCategory.description}
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
                              <Text fontSize="xs">{t.skills.descriptions[skill.name]}</Text>
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
                              colorScheme={getProficiencyBadge(skill.level)}
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
            )
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
