import { useEffect } from 'react'

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
        className={`fixed inset-0 z-40 bg-black md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-80 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] transform bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 p-6 mt-5'>
          <img
            src='/images/logo.png'
            alt='Logo Z&O'
            className='h-12 object-contain'
          />
          <button
            type='button'
            onClick={onClose}
            className='p-2 text-gray-600 transition-colors hover:cursor-pointer hover:text-primary'
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
              href='#contacto'
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
