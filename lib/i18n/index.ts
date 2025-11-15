import { Locale, TranslationKeys } from './types'

import enTranslations from './locales/en.json'
import esTranslations from './locales/es.json'

export const translations: Record<Locale, TranslationKeys> = {
  en: enTranslations,
  es: esTranslations,
} as const

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en
}

export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.toLowerCase()
  
  // Check for Spanish variants first
  if (browserLang.startsWith('es')) {
    return 'es'
  }
  
  // Default to English
  return 'en'
}

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('portfolio-locale')
    return stored as Locale || null
  } catch {
    return null
  }
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('portfolio-locale', locale)
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function getInitialLocale(): Locale {
  // Try stored locale first
  const stored = getStoredLocale()
  if (stored) return stored
  
  // Fall back to browser detection
  return detectBrowserLocale()
}
