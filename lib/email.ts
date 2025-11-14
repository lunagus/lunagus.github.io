export interface EmailParams {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendEmail(params: EmailParams): Promise<void> {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

  if (!formId) {
    throw new Error('Formspree form ID is missing')
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(params)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to send message')
  }
}

