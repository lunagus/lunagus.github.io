export function trackEvent(type: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return

  if ((window as any).umami) {
    ;(window as any).umami.track(type, data)
  }
}

export function track(event: string, data?: Record<string, any>) {
  trackEvent(event, data)
}

export function trackCVDownload() {
  trackEvent('cv_download', { source: 'hero' })
}

export function trackProjectClick(projectName: string, action: 'view' | 'github' | 'demo') {
  if (action === 'view') {
    trackEvent('project_view', {
      project: projectName,
      source: 'details_button',
    })
  } else {
    trackEvent('project_interaction', {
      project: projectName,
      action,
    })
  }
}

export function trackSectionView(section: string) {
  trackEvent('section_view', { section })
}

export function trackContactFormSubmit(success: boolean) {
  trackEvent('contact_submit', { success })
}

export function trackContactOpen(source: 'hero' | 'nav' | 'footer' = 'hero') {
  trackEvent('contact_open', { source })
}
