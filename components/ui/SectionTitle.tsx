'use client'

import { Heading, Box, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <VStack spacing={4} align={align === 'center' ? 'stretch' : align} mb={8}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Heading
          as="h2"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="700"
          textAlign={align}
          mb={2}
        >
          {title}
        </Heading>
        <Box
          height="4px"
          width="80px"
          bg="brand.500"
          mx={align === 'center' ? 'auto' : 0}
          borderRadius="full"
        />
      </motion.div>
      {subtitle && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box
            textAlign={align}
            color="gray.400"
            maxW="600px"
            mx={align === 'center' ? 'auto' : 0}
          >
            {subtitle}
          </Box>
        </motion.div>
      )}
    </VStack>
  )
}

