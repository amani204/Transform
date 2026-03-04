import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mobileLinksRef = useRef(null)

  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Exercises', href: '/exercises' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Initial entrance animations
      gsap.fromTo(logoRef.current, 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      )
      
      gsap.fromTo(linksRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
      
      gsap.fromTo(ctaRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Initial navbar setup - BLURRY AND CENTERED, NO MARGIN TOP
      gsap.set(navRef.current, {
        width: '80%',
        left: '10%',
        skewX: -20,
        backgroundColor:'rgba(18, 18, 18, 0.3)', // dark-bg with opacity
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        marginTop: '3rem', 
        border: '1px solid rgba(218, 252, 68, 1) '
      })




    

    }, navRef)
    
    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 95% 5%)',
        duration: 0.8,
        ease: 'power4.inOut'
      })
      
      gsap.fromTo(mobileLinksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 95% 5%)',
        duration: 0.6,
        ease: 'power4.inOut'
      })
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (!isHome) {
        navigate('/' + href)
      } else {
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
      <nav
        ref={navRef}
        className="fixed top-0 z-50 transition-all duration-300 "
      >
        <div className="skew-x-20 container-custom">
          <div className="flex items-center justify-between h-16 px-8">
            
            {/* Logo*/}
            <Link 
              ref={logoRef}
              to="/" 
              className="text-2xl font-black tracking-tight text-white hover:text-primary transition-colors duration-300"
            >
              TRANSFORM
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8">
              <div ref={linksRef} className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link text-sm font-semibold uppercase tracking-wide"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div ref={ctaRef} className="hidden md:block">
                <button
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative z-50 p-2.5 rounded-full text-white transition-transform duration-300 hover:scale-110 border border-primary/20"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu*/}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl md:hidden"
        style={{ clipPath: 'circle(0% at 95% 5%)' }}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 pb-20">
          {/* Large Menu Items */}
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

          {/* Bottom CTA Section */}
          <div className="mt-12 w-full">
            <p className="text-text-muted text-sm mb-4">Ready to start your transformation?</p>
            <Link
              to="/exercises"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary flex items-center justify-center py-4 hover: transition-colors duration-300 "
            >
              Get Started Free
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 right-8 text-dark-border text-9xl font-bold opacity-20 pointer-events-none">
            TF
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar