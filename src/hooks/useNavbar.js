
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// useNavbarScroll Handles entrance animations and scroll-collapse behaviour.
export const useNavbarScroll = ({ navRef, logoRef, linksRef, menuBtnRef }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial state — wide skewed bar
      gsap.set(navRef.current, {
        width: '80%', left: '10%', skewX: -20,
        backgroundColor: 'rgba(18, 18, 18, 0.3)',
        backdropFilter: 'blur(15px)',
        marginTop: '3rem',
        border: '1px solid rgba(218, 252, 68, 1)',
      })
      gsap.set(menuBtnRef.current, { opacity: 0, pointerEvents: 'none' })

      // Entrance
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      )
      gsap.fromTo(linksRef.current.children, //wave effect
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
     

      // Scroll → collapse to mini centered bar
      ScrollTrigger.create({
        trigger: document.body, // What element triggers this?
        start: 'top -80px',
        onEnter: () => {  // What happens when scrolling down
          const tl = gsap.timeline() // Creates a timeline (sequence of animations)
          // Fade out links
          tl.to([linksRef.current.children], {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          })
          // Transform navbar
          tl.to(navRef.current, {
            width: 'auto', left: '50%', xPercent: -50, skewX: -20, marginTop: '1rem',
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(0px)',
            border: '1px solid rgba(255,255,255,0.08)',
            duration: 0.5, ease: 'power3.inOut',
          }, '-=0.1')
          tl.to(menuBtnRef.current, {
            opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out',
          }, '-=0.1')
        },
        onLeaveBack: () => { // What happens when scrolling up
          const tl = gsap.timeline()
          // Hide mobile button
          tl.to(menuBtnRef.current, {
            opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'power2.in',
          })
          // Restore navbar to original state
          tl.to(navRef.current, {
            width: '80%', left: '10%', xPercent: 0, skewX: -20, marginTop: '3rem',
            backgroundColor: 'rgba(18, 18, 18, 0.3)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(218, 252, 68, 1)',
            duration: 0.5, ease: 'power3.inOut',
          }, '-=0.1')
          // Fade links back in
          tl.to([linksRef.current.children], {
            opacity: 1, duration: 0.4, ease: 'power2.out',
          })
        },
      })
    }, navRef)

    return () => ctx.revert()
  }, [])
}

// useMobileMenu Clip-path circle reveal for mobile / scrolled fullscreen menu.

export const useMobileMenu = (isOpen, { menuRef, linksRef }) => {
  useEffect(() => {
    if (!menuRef?.current) return
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 95% 5%)', // Expands from top-right (huge circle covering entire screen)
        duration: 0.8, ease: 'power4.inOut',
      })
      gsap.fromTo(linksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 95% 5%)', //tiny circle at top-right
        duration: 0.6, ease: 'power4.inOut',
      })
    }
  }, [isOpen])
}
