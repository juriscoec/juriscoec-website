import type { ClientData } from '../../types'

export async function registerClient(clientData: ClientData) {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  })

  return response.json()
}