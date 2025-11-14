'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

export type MotionBoxProps = Omit<BoxProps, 'transition'> &
  HTMLMotionProps<'div'> & {
    as?: keyof JSX.IntrinsicElements
  }

export const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>

