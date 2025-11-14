/**
 * Lightweight analytics tracking
 * Uses localStorage for privacy-friendly tracking
 */

interface AnalyticsEvent {
  type: string
  data?: Record<string, any>
  timestamp: number
}

const STORAGE_KEY = 'portfolio_analytics'
const MAX_EVENTS = 100

export function trackEvent(type: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return

  try {
    const events = getStoredEvents()
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now(),
    }

    events.push(event)

    // Keep only last MAX_EVENTS
    if (events.length > MAX_EVENTS) {
      events.shift()
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))

    // Optional: Send to external analytics (Plausible, Umami, etc.)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
      sendToExternalAnalytics(type, data)
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

function getStoredEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function sendToExternalAnalytics(type: string, data?: Record<string, any>) {
  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    ;(window as any).plausible(type, { props: data })
  }

  // Umami Analytics
  if (typeof window !== 'undefined' && (window as any).umami) {
    ;(window as any).umami.track(type, data)
  }

  // Google Analytics 4 (if configured)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', type, data)
  }
}

export function trackCVDownload() {
  trackEvent('cv_download', { source: 'hero' })
}

export function trackProjectClick(projectName: string, action: 'view' | 'github' | 'demo') {
  trackEvent('project_interaction', {
    project: projectName,
    action,
  })
}

export function trackSectionView(section: string) {
  trackEvent('section_view', { section })
}

export function trackContactFormSubmit(success: boolean) {
  trackEvent('contact_form', { success })
}

export function getAnalyticsSummary() {
  const events = getStoredEvents()
  const summary = {
    totalEvents: events.length,
    cvDownloads: events.filter((e) => e.type === 'cv_download').length,
    projectClicks: events.filter((e) => e.type === 'project_interaction').length,
    contactSubmits: events.filter((e) => e.type === 'contact_form').length,
    sectionViews: events.filter((e) => e.type === 'section_view').length,
  }
  return summary
}

