'use client'

import {
  Box,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { fadeInUp } from '@/lib/animations'
import { sendEmail } from '@/lib/email'
import { validateEmail } from '@/lib/utils'
import { trackContactFormSubmit } from '@/lib/analytics'
import { useI18n } from '@/lib/i18n/context'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const { t } = useI18n()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: t.contact.form.fields.name.label + ' is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return false
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toast({
        title: 'Valid ' + t.contact.form.fields.email.label.toLowerCase() + ' is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return false
    }
    if (!formData.message.trim()) {
      toast({
        title: t.contact.form.fields.message.label + ' is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Contact Form',
        message: formData.message,
      })

      trackContactFormSubmit(true)
      toast({
        title: 'Message sent successfully!',
        description: "I'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Formspree error:', error)
      trackContactFormSubmit(false)
      toast({
        title: 'Failed to send message',
        description: 'Please try again later or contact me directly via email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box id="contact" as="section" py={20} position="relative" pb={{ base: 24, md: 20 }}>
      <Container maxW="800px">
        <VStack spacing={12} align="stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle
              title={t.contact.title}
              subtitle={t.contact.description}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card>
              <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">{t.contact.form.fields.name.label}</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.form.fields.name.placeholder}
                      size="lg"
                      borderRadius="xl"
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="email">{t.contact.form.fields.email.label}</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.fields.email.placeholder}
                      size="lg"
                      borderRadius="xl"
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="subject">{t.contact.form.fields.subject.label}</FormLabel>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.contact.form.fields.subject.placeholder}
                      size="lg"
                      borderRadius="xl"
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="message">{t.contact.form.fields.message.label}</FormLabel>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.form.fields.message.placeholder}
                      size="lg"
                      rows={t.contact.form.fields.message.rows}
                      borderRadius="xl"
                      resize="vertical"
                      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    size="lg"
                    width="full"
                    isLoading={isSubmitting}
                    loadingText={t.contact.form.submit.loading}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                    transition="all 0.2s"
                  >
                    {t.contact.form.submit.label}
                  </Button>
                </VStack>
              </Box>
            </Card>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  )
}

