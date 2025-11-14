export interface Userscript {
  name: string
  description: string
  githubUrl: string
  features: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  tags: string[]
  githubUrl: string
  demoUrl: string | null
  screenshots: string[]
  featured: boolean
  userscripts?: Userscript[]
}
