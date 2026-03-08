import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useNavbarScroll, useMobileMenu } from '../../hooks'
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const menuBtnRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mobileLinksRef = useRef(null)

  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Workout Library', href: '/workoutLibrary' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '/contact' },
  ]
  

  useNavbarScroll({ navRef, logoRef, linksRef, menuBtnRef })
  useMobileMenu(isMobileMenuOpen, { menuRef: mobileMenuRef, linksRef: mobileLinksRef })

  const handleNavClick = (e, href) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    
    if (!isHome) {
      // Navigate to home and pass the target section
      navigate('/', { state: { scrollTo: href } })
    } else {
      // Already on home, just scroll
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  setIsMobileMenuOpen(false)
}
  return (
    <>
      <nav ref={navRef} className="fixed top-0 z-50">
        <div className="skew-x-20 container-custom">
          <div className="flex items-center justify-between h-16 px-8 gap-6">

            {/* Logo */}
            <Link
              ref={logoRef}
              to="/"
              className="text-2xl font-black tracking-tight text-white hover:text-primary transition-colors duration-300 whitespace-nowrap"
            >
              TRANSFORM
            </Link>

            {/* Desktop links */}
            <div className="flex items-center gap-8">
              <div ref={linksRef} className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)} 
                    className="nav-link text-sm font-semibold uppercase tracking-wide whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <button
              ref={menuBtnRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 p-2.5 text-white hover:scale-110 transition-transform duration-300 border border-white/10 hidden md:flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

           
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2.5 text-white hover:scale-110 transition-transform duration-300 border border-primary/20"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </nav>

   
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl"
        style={{ clipPath: 'circle(0% at 95% 5%)' }}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 pb-20">
          <div ref={mobileLinksRef} className="space-y-2 w-full">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center justify-between py-4 border-b border-dark-border"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-text-muted text-sm font-medium">0{index + 1}</span>
                  <span className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {link.name}
                  </span>
                </div>
                <ArrowUpRight className="w-6 h-6 text-text-muted group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="absolute bottom-8 left-3 text-dark-border font-black opacity-20 pointer-events-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            TRANSFORM
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar