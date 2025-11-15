export type Locale = 'en' | 'es'

export interface TranslationKeys {
  hero: {
    greeting: string
    name: string
    title: string
    description: string
    cta: {
      primary: {
        label: string
        action: string
      }
      secondary: {
        label: string
        action: string
      }
    }
  }
  contact: {
    title: string
    description: string
    form: {
      fields: {
        name: {
          label: string
          placeholder: string
          required: boolean
        }
        email: {
          label: string
          placeholder: string
          required: boolean
        }
        subject: {
          label: string
          placeholder: string
          required: boolean
        }
        message: {
          label: string
          placeholder: string
          required: boolean
          rows: number
        }
      }
      submit: {
        label: string
        loading: string
      }
    }
  }
  skills: {
    title: string
    description: string
    categories: {
      programmingLanguages: {
        title: string
        description: string
      }
      frontend: {
        title: string
        description: string
      }
      backend: {
        title: string
        description: string
      }
      databases: {
        title: string
        description: string
      }
      devops: {
        title: string
        description: string
      }
      languages: {
        title: string
        description: string
      }
    }
    descriptions: {
      [key: string]: string
    }
  }
  projects: {
    title: string
    viewDetails: string
    tryItLive: string
    featured: string
    descriptions: {
      "1": {
        title: string
        description: string
        longDescription: string
      }
      "2": {
        title: string
        description: string
        longDescription: string
      }
      "3": {
        title: string
        description: string
        longDescription: string
      }
      "4": {
        title: string
        description: string
        longDescription: string
      }
      "5": {
        title: string
        description: string
        longDescription: string
      }
      "6": {
        title: string
        description: string
        longDescription: string
      }
    }
  }
  about: {
    title: string
    subtitle: string
  }
  navigation: {
    home: string
    projects: string
    skills: string
    about: string
    contact: string
    terminal: string
  }
  common: {
    viewProject: string
    viewCode: string
    featured: string
    technologies: string
    loading: string
    error: string
    close: string
    copyright: string
  }
}

export const defaultLocale: Locale = 'en'
export const supportedLocales: Locale[] = ['en', 'es']
