import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// useFooterEntrance Animates brand block, nav links, social icons, and copyright bar on scroll.

export const useFooterEntrance = ({ brandRef, linksRef, socialsRef, bottomRef }) => {
  useEffect(() => {
    const triggers = []

    // Brand slides from left
    triggers.push(
      gsap.fromTo(brandRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: brandRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      ).scrollTrigger
    )

    // Nav links stagger from right
    triggers.push(
      gsap.fromTo(linksRef.current.children,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      ).scrollTrigger
    )

    // Social icons spring pop
    const socials = socialsRef.current.querySelectorAll('a')
    triggers.push(
      gsap.fromTo(socials,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5,
          ease: 'back.out(1.7)', stagger: 0.1, delay: 0.3,
          scrollTrigger: { trigger: socialsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      ).scrollTrigger
    )

    // Copyright bar fades up
    triggers.push(
      gsap.fromTo(bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5,
          scrollTrigger: { trigger: bottomRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      ).scrollTrigger
    )

    return () => triggers.forEach(t => t?.kill())
  }, [])
}
