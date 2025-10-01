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