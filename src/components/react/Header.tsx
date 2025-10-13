import { useState, useEffect } from 'react'
import { MobileHeader } from './MobileHeader'

interface NavLink {
  href: string
  text: string
}

const navLinks: NavLink[] = [
  { href: '#nosotros', text: 'NOSOTROS' },
  { href: '#servicios', text: 'SERVICIOS' },
  { href: '#equipo', text: 'EQUIPO' },
  { href: '#contacto', text: 'CONTACTO' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = `
    fixed w-full z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-white shadow-sm pt-0' 
      : 'bg-transparent pt-5'
    }
  `

  const linkClasses = `
    relative group transition-colors
    ${isScrolled 
      ? 'text-foreground hover:text-primary' 
      : 'text-white hover:text-primary'
    }
  `

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="/">
              <img
                src="/images/logo.png"
                alt="Logo Bufete Legal"
                className="h-16 md:h-20 object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, text }) => (
                <a
                  key={href}
                  href={href}
                  className={linkClasses}
                >
                  {text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-primary hover:text-primary-dark transition-colors hover:cursor-pointer"
              aria-label="Menú"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Header Component */}
      <MobileHeader
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navLinks={navLinks}
      />
    </>
  )
}