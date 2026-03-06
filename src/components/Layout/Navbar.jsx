import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) //activate the ScrollTrigger plugin

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

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(navRef.current, {
        width: '80%',
        left: '10%',
        skewX: -20,
        backgroundColor: 'rgba(18, 18, 18, 0.3)',
        backdropFilter: 'blur(15px)',
        marginTop: '3rem',
        border: '1px solid rgba(218, 252, 68, 1)',
      })

     
      gsap.set(menuBtnRef.current, { opacity: 0, pointerEvents: 'none' })

      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo(linksRef.current.children, //wave effect
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
      

      
      ScrollTrigger.create({
        trigger: document.body, // What element triggers this?
        start: 'top -80px',

        onEnter: () => {    // What happens when scrolling down
          const tl = gsap.timeline() // Creates a timeline (sequence of animations)
         
          // Fade out links
          tl.to([linksRef.current.children], {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          })

          // Transform navbar
          tl.to(navRef.current, {
            width: 'auto',
            left: '50%',
            xPercent: -50,
            skewX: -20,
            marginTop: '1rem',
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(0px)',
            border: '1px solid rgba(255,255,255,0.08)',
            duration: 0.5,
            ease: 'power3.inOut',
          }, '-=0.1')

          /
          tl.to(menuBtnRef.current, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          }, '-=0.1')
        },

        onLeaveBack: () => {   // What happens when scrolling up
          const tl = gsap.timeline()

          // Hide mobile button
          tl.to(menuBtnRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.2,
            ease: 'power2.in',
          })
          // Restore navbar to original state
          tl.to(navRef.current, {
            width: '80%',
            left: '10%',
            xPercent: 0,
            skewX: -20,
            marginTop: '3rem',
            backgroundColor: 'rgba(18, 18, 18, 0.3)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(218, 252, 68, 1)',
            duration: 0.5,
            ease: 'power3.inOut',
          }, '-=0.1')
          
         // Fade links back in
          tl.to([linksRef.current.children], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        },
      })

    }, navRef)

    return () => ctx.revert()
  }, [])


  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 95% 5%)',  // Expands from top-right (huge circle covering entire screen)
        duration: 0.8,
        ease: 'power4.inOut',
      })
      gsap.fromTo(mobileLinksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 95% 5%)', //tiny circle at top-right
        duration: 0.6,
        ease: 'power4.inOut',
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
        if (element) element.scrollIntoView({ behavior: 'smooth' })
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