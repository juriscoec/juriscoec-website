import { useEffect, useRef, useState } from 'react'
import { MobileHeader } from './MobileHeader'
import facebookIcon from '../../assets/social/facebook.svg?raw'
import instagramIcon from '../../assets/social/instagram.svg?raw'
import linkedinIcon from '../../assets/social/linkedin.svg?raw'
import twitterIcon from '../../assets/social/twitter.svg?raw'

interface NavLink {
  href: string
  text: string
}

const navLinks: NavLink[] = [
  { href: '#nosotros', text: 'NOSOTROS' },
  { href: '#equipo', text: 'EQUIPO' },
  { href: '#legal', text: 'LEGAL' },
  { href: '#contacto', text: 'CONTACTO' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: facebookIcon },
  { name: 'Instagram', href: 'https://instagram.com', icon: instagramIcon },
  { name: 'Twitter', href: 'https://twitter.com', icon: twitterIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: linkedinIcon },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 10) {
        setIsHeaderVisible(true)
      } else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    lastScrollY.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = `
    sticky top-0 z-50 h-[17svh] bg-white shadow-sm transition-all duration-500 ease-out flex flex-col
    ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
  `

  const linkClasses = `
    relative group text-foreground hover:text-primary transition-colors
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
        <div className='border-b border-black/10 bg-[#c6a35e] text-[#3e3223]'>
          <div className='container mx-auto flex h-10 items-center justify-between text-xs tracking-wide'>
            <a
              href='tel:+593981692167'
              className='flex items-center gap-2 font-semibold transition-opacity hover:opacity-80'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                className='h-4 w-4'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.62 2.65a2 2 0 0 1-.45 2.11L8 9.86a16 16 0 0 0 6.14 6.14l1.38-1.28a2 2 0 0 1 2.11-.45c.86.29 1.75.5 2.65.62A2 2 0 0 1 22 16.92z'
                />
              </svg>
              <span>0981692167 / 0989627532</span>
            </a>

            <a
              href='#contacto'
              className='hidden gap-2 border-x border-black/15 px-6 py-2 font-semibold uppercase transition-colors hover:bg-black/5 md:flex md:items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                className='h-4 w-4'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 7V3m8 4V3m-9 8h10m4 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z'
                />
              </svg>
              <span>Agendar asesoria</span>
            </a>

            <div className='flex items-center gap-4'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='flex h-5 w-5 items-center justify-center rounded-full text-[#3e3223] transition-opacity hover:opacity-75'
                >
                  <span
                    className='block h-5 w-5'
                    aria-hidden='true'
                    dangerouslySetInnerHTML={{ __html: social.icon }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='container mx-auto flex-1'>
          <nav className='flex h-full items-center justify-between'>
            {/* Logo */}
            <a href='/' aria-label='Home Link'>
              <img
                src='/images/logo.webp'
                alt='Logo Bufete Legal'
                loading='eager'
                fetchPriority='high'
                className='h-12 object-contain md:h-16'
              />
            </a>

            {/* Desktop Navigation */}
            <div className='hidden items-center gap-8 md:flex'>
              {navLinks.map(({ href, text }) => (
                <a key={href} href={href} className={linkClasses}>
                  {text}
                  <span className='bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full' />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type='button'
              className='text-primary hover:text-primary-dark transition-colors hover:cursor-pointer md:hidden'
              aria-label='Menú'
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
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
