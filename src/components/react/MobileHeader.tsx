import { useEffect, useState } from 'react'

interface NavLink {
  href: string
  text: string
}

interface MobileHeaderProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLink[]
}

export function MobileHeader({ isOpen, onClose, navLinks }: MobileHeaderProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      return
    }
    setIsClosing(true)
    const closeMs =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--dropdown-close-dur',
        ),
      ) || 150
    const timer = window.setTimeout(() => setIsClosing(false), closeMs)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-80'
            : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Mobile Menu */}
      <div
        id='mobile-navigation'
        className={`t-dropdown fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white md:hidden ${isOpen ? 'is-open' : isClosing ? 'is-closing' : ''}`}
        data-origin='top-right'
      >
        {/* Header */}
        <div className='mt-5 flex items-center justify-between border-b border-gray-200 p-6'>
          <img
            src='/images/logo.webp'
            alt='Logo Z&O'
            className='h-12 object-contain'
          />
          <button
            type='button'
            onClick={onClose}
            className='hover:text-primary p-2 text-gray-600 transition-colors hover:cursor-pointer'
            aria-label='Cerrar menú'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col space-y-4 p-6'>
          {navLinks.map(({ href, text }) => (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
              className='hover:text-primary transform border-b border-gray-100 px-2 py-3 text-lg font-medium text-gray-800 transition-all duration-200 last:border-b-0 hover:translate-x-1'
            >
              {text}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className='absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-gray-50 p-6'>
          <div className='text-center text-sm text-gray-600'>
            <p>¿Necesita asesoría legal?</p>
            <a
              href='/#contacto'
              onClick={handleLinkClick}
              className='text-primary font-medium hover:underline'
            >
              Contáctanos aquí
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
