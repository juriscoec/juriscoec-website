import type { ContactFormData } from '../../types'

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns boolean - true if email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates Ecuadorian phone numbers (landline and mobile)
 * @param phone - Phone number string to validate
 * @returns boolean - true if phone number format is valid for Ecuador
 */
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '')
  const mobileRegex = /^0(98|99|96|97|95|93|92|91|90)\d{7}$/
  const landlineRegex = /^0[2-7]\d{7}$/
  return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone)
}

/**
 * Validates contact form data including required fields, email format, and phone number
 * @param data - Contact form data object
 * @returns object with isValid boolean and error message if validation fails
 */
export function validateContactForm(data: ContactFormData): {
  isValid: boolean
  error?: string
} {
  if (
    !data.name ||
    !data.phone ||
    !data.email ||
    !data.subject ||
    !data.message
  ) {
    return {
      isValid: false,
      error: 'Todos los campos son obligatorios',
    }
  }

  if (!isValidEmail(data.email)) {
    return {
      isValid: false,
      error: 'El formato del email no es válido',
    }
  }

  if (!isValidPhone(data.phone)) {
    return {
      isValid: false,
      error: 'El número de teléfono no es válido',
    }
  }

  return { isValid: true, error: '' }
}

/**
 * Genera una plantilla HTML para el correo electrónico enviado desde el formulario de contacto.
 * La plantilla usa estilos inline y una estructura compatible con la mayoría de clientes de correo.
 * @param data - Datos del formulario de contacto
 * @returns string - HTML completo listo para enviar como cuerpo del email
 */
export function generateEmailTemplate(data: ContactFormData): string {
  const receivedAt = new Date().toLocaleString('es-EC', {
    timeZone: 'America/Guayaquil',
  })

  const escapeHtml = (unsafe: string | undefined | null) => {
    if (!unsafe) return ''
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  return `<!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo mensaje de ${data.name}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(90deg,#0ea5a3,#0ea5f8);padding:28px 32px;color:#fff;">
                <h1 style="margin:0;font-size:20px;letter-spacing:0.2px">Nuevo mensaje de contacto</h1>
                <p style="margin:6px 0 0 0;opacity:0.95;font-size:13px">Formulario web — ${escapeHtml(receivedAt)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;color:#0f172a;">
                <p style="margin:0 0 12px 0;font-size:15px;color:#0f172a">Has recibido un nuevo mensaje desde el formulario de contacto. Abajo están los detalles:</p>

                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:12px;">
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #eef2f7;">
                      <strong>Nombre:</strong>
                      <div style="margin-top:6px;color:#334155">${escapeHtml(data.name)}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #eef2f7;">
                      <strong>Email:</strong>
                      <div style="margin-top:6px;color:#334155">${escapeHtml(data.email)}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #eef2f7;">
                      <strong>Teléfono:</strong>
                      <div style="margin-top:6px;color:#334155">${escapeHtml(data.phone)}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #eef2f7;">
                      <strong>Asunto:</strong>
                      <div style="margin-top:6px;color:#334155">${escapeHtml(data.subject)}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #eef2f7;">
                      <strong>Mensaje:</strong>
                      <div style="margin-top:8px;padding:12px;border-radius:8px;background:#f8fafc;color:#0f172a">${escapeHtml(
                        data.message,
                      ).replace(/\n/g, '<br/>')}</div>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:20px;font-size:13px;color:#64748b">Este correo fue generado automáticamente por el formulario web. Responde directamente al email del contacto si necesitas comunicarte.</div>
              </td>
            </tr>
            <tr>
              <td style="background:#fafafa;padding:16px 24px;text-align:center;color:#94a3b8;font-size:12px;">
                <div>Juriscoec • Sitio web</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
