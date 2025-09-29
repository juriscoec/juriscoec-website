import { useState } from 'react'
import { toast } from 'sonner'

export function ContactForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const dataToSend = Object.fromEntries(formData.entries())

    setLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error(
          'There was an error sending your message. Please try again.',
        )
      }

      toast.success('Thank you! Your message has been sent.')

      e.currentTarget.reset()
    } catch (err) {
      console.error('Error submitting form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-light/10 rounded-xl p-8 backdrop-blur'>
      <form className='space-y-6'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <div>
            <label htmlFor='nombre' className='text-light mb-2 block'>
              Nombre
            </label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              className='bg-light/5 border-light/10 text-light placeholder:text-light/50 focus:border-primary w-full rounded-lg border px-4 py-3 focus:outline-none'
              placeholder='Tu nombre'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='text-light mb-2 block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='bg-light/5 border-light/10 text-light placeholder:text-light/50 focus:border-primary w-full rounded-lg border px-4 py-3 focus:outline-none'
              placeholder='tu@email.com'
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor='asunto' className='text-light mb-2 block'>
            Asunto
          </label>
          <input
            type='text'
            id='asunto'
            name='asunto'
            className='bg-light/5 border-light/10 text-light placeholder:text-light/50 focus:border-primary w-full rounded-lg border px-4 py-3 focus:outline-none'
            placeholder='Asunto de tu mensaje'
            required
          />
        </div>

        <div>
          <label htmlFor='mensaje' className='text-light mb-2 block'>
            Mensaje
          </label>
          <textarea
            id='mensaje'
            name='mensaje'
            rows={4}
            className='bg-light/5 border-light/10 text-light placeholder:text-light/50 focus:border-primary w-full resize-none rounded-lg border px-4 py-3 focus:outline-none'
            placeholder='Escribe tu mensaje aquí...'
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-primary text-light hover:bg-primary-dark w-full rounded-lg px-6 py-3 font-semibold transition-colors'
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  )
}
