import dynamic from 'next/dynamic'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { Box } from '@chakra-ui/react'

const ProjectsGrid = dynamic(() => import('@/components/sections/Projects/ProjectsGrid').then((m) => m.ProjectsGrid), {
  ssr: true,
  loading: () => null,
})

const Skills = dynamic(() => import('@/components/sections/Skills').then((m) => m.Skills), {
  ssr: true,
  loading: () => null,
})

const Terminal = dynamic(() => import('@/components/sections/Terminal').then((m) => m.Terminal), {
  ssr: false,
  loading: () => null,
})

const ContactForm = dynamic(() => import('@/components/sections/ContactForm').then((m) => m.ContactForm), {
  ssr: false,
  loading: () => null,
})

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
