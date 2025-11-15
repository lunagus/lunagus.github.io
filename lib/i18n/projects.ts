import { Locale } from './types'

export async function getProjectTranslations(locale: Locale) {
  if (locale === 'es') {
    const { default: spanishTranslations } = await import('./locales/projects-es.json')
    return spanishTranslations
  }
  return {}
}

export function getProjectTranslation(projectId: string, field: 'title' | 'description' | 'longDescription', locale: Locale, originalValue: string) {
  if (locale === 'es') {
    // For now, return original value - we'll implement dynamic loading
    return originalValue
  }
  return originalValue
}
