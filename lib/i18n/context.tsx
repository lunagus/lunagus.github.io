'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Locale, TranslationKeys } from './types'
import { 
  getTranslation, 
  getInitialLocale, 
  setStoredLocale,
  getStoredLocale,
  detectBrowserLocale 
} from './index'

interface I18nContextType {
  locale: Locale
  t: TranslationKeys
  changeLocale: (locale: Locale) => void
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale: propDefaultLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(propDefaultLocale || 'en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Only detect locale on client side
    const storedLocale = getStoredLocale()
    if (storedLocale) {
      setLocale(storedLocale)
    } else {
      const detectedLocale = detectBrowserLocale()
      setLocale(detectedLocale)
      setStoredLocale(detectedLocale)
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    setStoredLocale(newLocale)
  }

  const t = getTranslation(locale)
  const isRTL = false // Spanish and English are both LTR

  const value: I18nContextType = {
    locale,
    t,
    changeLocale,
    isRTL,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Helper hook for nested translation access
export function useTranslation() {
  const { t } = useI18n()
  return { t }
}
