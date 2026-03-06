import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)
  const brandRef = useRef(null)
  const linksRef = useRef(null)
  const socialsRef = useRef(null)
  const bottomRef = useRef(null)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: '#programs' },
    { name: 'Workout Library', href: '/workoutLibrary' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => { //create a safe scoop
      const trigger = {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',  // Play once, don't reverse
      }

     //brand animation
      gsap.fromTo(
        brandRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger }
      )

     // Navigation Links Animation
      gsap.fromTo(
        linksRef.current.querySelectorAll('li'), // All list items
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: trigger,
        }
      )

     //Social Icons Animation
      gsap.fromTo(
        socialsRef.current.querySelectorAll('a'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: trigger,
        }
      )

      //Bottom Copyright Animation
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.5,
          scrollTrigger: trigger,
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-dark-bg border-t border-dark-border pt-16 pb-8">
      <div className="container-custom">
        <div className="lg:flex justify-between items-center mb-12 ">
          <div ref={brandRef} style={{ opacity: 0 }}>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white">TRANSFORM</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Our training program is designed to guide you from registration to success.
              Follow our simple steps to achieve your fitness goals.
            </p>

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
                    style={{ opacity: 0 }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          
          <ul ref={linksRef} className="mt-6 space-y-3">
            {navLinks.map((link) => (
              <li key={link.name} style={{ opacity: 0 }}>
                <Link
                  to={link.href}
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={bottomRef}
          className="pt-8 border-t border-dark-border text-center"
          style={{ opacity: 0 }}
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