'use client'

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends BoxProps {
  children: ReactNode
  hover?: boolean
  tilt?: boolean
}

export function Card({ children, hover = true, tilt = false, ...props }: CardProps) {
  const cardBg = useColorModeValue('white', 'rgba(255, 255, 255, 0.05)')
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.1)')

  const motionProps = hover
    ? {
        whileHover: tilt ? { y: -8, rotateY: 2 } : { y: -4 },
        transition: { duration: 0.3 },
      }
    : {}

  return (
    <Box
      as={motion.div}
      {...motionProps}
      p={6}
      borderRadius="2xl"
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      boxShadow="lg"
      _hover={hover ? { boxShadow: 'xl' } : {}}
      transition="all 0.3s"
      {...props}
    >
      {children}
    </Box>
  )
}

