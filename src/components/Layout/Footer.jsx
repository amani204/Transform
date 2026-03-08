import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom' // ✅ Add useNavigate
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useFooterEntrance } from '../../hooks'


const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate() 
  const isHome = location.pathname === '/'
  
  const footerRef = useRef(null)
  const brandRef = useRef(null)
  const linksRef = useRef(null)
  const socialsRef = useRef(null)
  const bottomRef = useRef(null)
  useFooterEntrance({ footerRef, brandRef, linksRef, socialsRef, bottomRef })
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: isHome ? '#programs' : '/#programs' },
    { name: 'Workout Library', href: '/workoutLibrary' },
    { name: 'Team', href: isHome ? '#team' : '/#team' },
    { name: 'FAQ', href: isHome ? '#faq' : '/#faq' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleFooterClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (isHome) {
        // On home page - smooth scroll
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Not on home - navigate to home with state
        navigate('/', { state: { scrollTo: href } })
      }
    } else if (href.startsWith('/#')) {
      e.preventDefault()
      // Handle /# links from other pages
      navigate('/', { state: { scrollTo: href.substring(1) } }) // Remove the leading /
    }
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' }
  ]



  return (
    <footer ref={footerRef} className="bg-dark-bg border-t border-dark-border pt-16 pb-8">
      <div className="container-custom">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          
          {/* Left Column - Brand */}
          <div className="max-w-md">
            <div ref={brandRef}>
              <Link to="/" className="inline-block mb-4">
                <span className="text-2xl font-black text-white">TRANSFORM</span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our training program is designed to guide you from registration to success.
                Follow our simple steps to achieve your fitness goals.
              </p>
            </div>

            {/* Social Icons */}
            <div ref={socialsRef} className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Column - Links */}
          <ul ref={linksRef} className="space-y-3 md:text-right">
            {navLinks.map((link) => (
              <li key={link.name} style={{ opacity: 0 }}>
                {link.href.startsWith('#') || link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Copyright */}
        <div
          ref={bottomRef}
          className="pt-8 border-t border-dark-border text-center"
        >
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} TRANSFORM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer