import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Exercises', href: '/exercises' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' }
  ]

  return (
    <footer className="bg-dark-bg border-t border-dark-border pt-16 pb-8">
      <div className="container-custom">
        
        {/* Main Footer Content */}
        <div className="flex justify-between items-center mb-12">
            
          {/* Left Column - Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white">TRANSFORM</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Our training program is designed to guide you from registration to success. 
              Follow our simple steps to achieve your fitness goals.
            </p>
            
            {/* Social Icons - Moved here */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-orange-primary hover:border-orange-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Column - Quick Links List */}
          <div>
            
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-text-secondary hover:text-orange-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="pt-8 border-t border-dark-border text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} TRANSFORM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer