export interface ClientData {
  nombre: string
  correo: string
  telefono: string
}

export interface ContactFormData {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
}