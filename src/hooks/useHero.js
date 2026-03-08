import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

//useHeroEntrance Drives the entire HeroSection entrance sequence + parallax on scroll.

export const useHeroEntrance = ({
  sectionRef,
  bgRef,
  overlayRef,
  line1Ref,
  line2Ref,
  subtitleRef,
  buttonsRef,
  guaranteeRef,
  cardRef,
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // BG zoom in
      gsap.fromTo(bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 2.2, ease: 'power2.out' }
      )
      // Overlay darkens
      gsap.fromTo(overlayRef.current,
        { opacity: 0.3 },
        { opacity: 0.72, duration: 1.8, ease: 'power2.inOut' }
      )
      // Title lines clip up
      tl.fromTo(line1Ref.current,     { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.9 }, 0.5)
      tl.fromTo(line2Ref.current,     { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.9 }, 0.68)
      tl.fromTo(subtitleRef.current,  { opacity: 0, y: 18 },     { opacity: 1, y: 0,   duration: 0.7 }, 1.0)
      tl.fromTo(buttonsRef.current,   { opacity: 0, y: 22 },     { opacity: 1, y: 0,   duration: 0.7 }, 1.15)
      tl.fromTo(guaranteeRef.current, { opacity: 0 },            { opacity: 1,         duration: 0.5 }, 1.35)

      // Card slides in from right with subtle 3D tilt
      tl.fromTo(cardRef.current,
        { opacity: 0, x: 60, rotateY: 8 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out' },
        0.7
      )

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])
}

// useFloating Idle bobbing loop — great for hero cards, badges, floating images.
export const useFloating = (ref, {
  distance = 10,
  duration = 3,
  delay    = 1.8,
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const tween = gsap.to(ref.current, {
      y: -distance,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })
    return () => tween.kill()
  }, [])
}
