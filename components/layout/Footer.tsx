'use client'

import { Box, Container, Text, HStack, Link, Icon } from '@chakra-ui/react'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import contactData from '@/data/contact.json'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useI18n()

  const socialLinks = [
    { icon: Github, href: contactData.social.github, label: 'GitHub' },
    { icon: Linkedin, href: contactData.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: contactData.social.twitter, label: 'Twitter' },
    { icon: Mail, href: contactData.social.email, label: 'Email' },
  ]

  return (
    <Box
      as="footer"
      pt={{ base: 4, md: 8 }}
      pb={{ base: 10, md: 8 }}
      borderTop="1px"
      borderColor="gray.700"
      mt={16}
    >
      <Container maxW="1200px">
        <HStack justify="space-between" flexWrap="wrap" spacing={4}>
          <Text fontSize="sm" color="gray.500">
            {t.common.copyright.replace('{{year}}', currentYear.toString())}
          </Text>
          <HStack spacing={4}>
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                isExternal
                aria-label={social.label}
                _hover={{ color: 'brand.500' }}
                transition="color 0.2s"
              >
                <Icon as={social.icon} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

