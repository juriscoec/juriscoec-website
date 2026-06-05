import type { ContactFormData, EmailResponse } from '../../types'
import { validateContactForm } from '../lib/utils'

export async function sendEmail(data: ContactFormData): Promise<EmailResponse> {
  try {
    const validation = validateContactForm(data)
    
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error!,
      }
    }

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return {
        success: false,
        message: 'Error al enviar el mensaje',
      }
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente',
    }
  } catch (error) {
    throw new Error('Error al enviar el mensaje. Por favor intenta nuevamente.')
  }
}
