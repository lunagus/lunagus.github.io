import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { Terminal } from '@/components/sections/Terminal'
import { Skills } from '@/components/sections/Skills'
import { ProjectsGrid } from '@/components/sections/Projects/ProjectsGrid'
import { ContactForm } from '@/components/sections/ContactForm'
import { Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <Layout>
      <Box as="main" id="main-content">
        <Hero />
        <ProjectsGrid />
        <Skills />
        <Terminal />
        <ContactForm />
      </Box>
    </Layout>
  )
}
