// src/hooks/useGsapAnimations.js
// ─────────────────────────────────────────────────────────────────────────────
// Shared GSAP animation utilities for TRANSFORM
// Import only what you need — each hook auto-cleans up via gsap.context / kill
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// 1. useFadeUp
//    Scroll-triggered fade + slide-up. Works on a single element or children.
//
//    useFadeUp(ref)                         → animates ref.current
//    useFadeUp(ref, { stagger: 0.15 })      → animates ref.current.children
//    useFadeUp(ref, { start: 'top 75%' })   → custom scroll trigger start
// ─────────────────────────────────────────────────────────────────────────────
export const useFadeUp = (ref, {
  start    = 'top 80%',
  delay    = 0,
  stagger  = 0,
  duration = 0.8,
  y        = 40,
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      const target = stagger ? ref.current.children : ref.current
      gsap.fromTo(target,
        { y, opacity: 0 },
        {
          y: 0, opacity: 1, duration, delay, stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. useFadeFrom
//    Scroll-triggered fade + slide from a direction.
//
//    useFadeFrom(ref, { from: 'left' })
//    useFadeFrom(ref, { from: 'right', distance: 80 })
// ─────────────────────────────────────────────────────────────────────────────
export const useFadeFrom = (ref, {
  from     = 'left',
  distance = 60,
  start    = 'top 85%',
  delay    = 0,
  duration = 0.9,
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      const axis  = from === 'left' || from === 'right' ? 'x' : 'y'
      const sign  = from === 'right' || from === 'bottom' ? distance : -distance
      gsap.fromTo(ref.current,
        { [axis]: sign, opacity: 0 },
        {
          [axis]: 0, opacity: 1, duration, delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. useStaggerCards
//    Animates an array of card refs in after loading completes.
//    cardRefs must be a useRef([]) whose .current is filled via
//    ref={el => cardRefs.current[i] = el}
//
//    useStaggerCards(cardRefs, isLoading)
// ─────────────────────────────────────────────────────────────────────────────
export const useStaggerCards = (cardRefs, isLoading) => {
  useEffect(() => {
    if (isLoading) return
    const valid = cardRefs.current.filter(Boolean)
    if (!valid.length) return
    gsap.fromTo(valid,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
  }, [isLoading])
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. useMarquee
//    Infinite seamless horizontal scroll.
//    Your JSX must render the text TWICE inside the ref div so the loop is
//    invisible. The div should have style={{ width: 'max-content' }}.
//
//    useMarquee(marqueeRef)
//    useMarquee(marqueeRef, { duration: 18 })   → slower
// ─────────────────────────────────────────────────────────────────────────────
export const useMarquee = (ref, { duration = 12 } = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const tween = gsap.to(ref.current, {
      xPercent: -50,
      duration,
      ease: 'none',
      repeat: -1,
    })
    return () => tween.kill()
  }, [])
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. useFloating
//    Idle "bobbing" animation — great for hero cards, images, badges.
//
//    useFloating(cardRef)
//    useFloating(cardRef, { distance: 14, duration: 2.5, delay: 1 })
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 6. useHeroEntrance
//    Full cinematic page-load timeline for HeroSection.
//    Pass all the refs the hero uses.
// ─────────────────────────────────────────────────────────────────────────────
export const useHeroEntrance = ({
  sectionRef,
  bgRef,
  overlayRef,
  scanlineRef,
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
      // Scanline sweep
      gsap.fromTo(scanlineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.1 }
      )
      gsap.to(scanlineRef.current, { opacity: 0, duration: 0.3, delay: 0.7 })

      // Title lines clip in
      tl.fromTo(line1Ref.current,    { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.9 }, 0.5)
      tl.fromTo(line2Ref.current,    { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.9 }, 0.68)
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 18 },     { opacity: 1, y: 0,   duration: 0.7 }, 1.0)
      tl.fromTo(buttonsRef.current,  { opacity: 0, y: 22 },     { opacity: 1, y: 0,   duration: 0.7 }, 1.15)
      tl.fromTo(guaranteeRef.current,{ opacity: 0 },            { opacity: 1,         duration: 0.5 }, 1.35)

      // Card slides in from right
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

// ─────────────────────────────────────────────────────────────────────────────
// 7. useNavbarScroll
//    Handles the navbar: entrance animations + scroll-collapse to mini bar.
// ─────────────────────────────────────────────────────────────────────────────
export const useNavbarScroll = ({ navRef, logoRef, linksRef, ctaRef, menuBtnRef }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial state
      gsap.set(navRef.current, {
        width: '80%', left: '10%', xPercent: 0, skewX: -20,
        backgroundColor: 'rgba(18, 18, 18, 0.3)',
        backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
        marginTop: '3rem',
        border: '1px solid rgba(218, 252, 68, 1)',
      })
      gsap.set(menuBtnRef.current, { opacity: 0, pointerEvents: 'none' })

      // Entrance
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

      // Scroll collapse → mini centered bar
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -80px',
        onEnter: () => {
          const tl = gsap.timeline()
          tl.to([linksRef.current.children, ctaRef.current], {
            opacity: 0, duration: 0.25, ease: 'power2.in',
          })
          tl.to(navRef.current, {
            width: 'auto', left: '50%', xPercent: -50, skewX: 0, marginTop: '1rem',
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)',
            border: '1px solid rgba(255,255,255,0.08)',
            duration: 0.5, ease: 'power3.inOut',
          }, '-=0.1')
          tl.to(menuBtnRef.current, {
            opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out',
          }, '-=0.1')
        },
        onLeaveBack: () => {
          const tl = gsap.timeline()
          tl.to(menuBtnRef.current, {
            opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'power2.in',
          })
          tl.to(navRef.current, {
            width: '80%', left: '10%', xPercent: 0, skewX: -20, marginTop: '3rem',
            backgroundColor: 'rgba(18, 18, 18, 0.3)',
            backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(218, 252, 68, 1)',
            duration: 0.5, ease: 'power3.inOut',
          }, '-=0.1')
          tl.to([linksRef.current.children, ctaRef.current], {
            opacity: 1, duration: 0.4, ease: 'power2.out',
          })
        },
      })
    }, navRef)

    return () => ctx.revert()
  }, [])
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. useMobileMenu
//    Clip-path circle reveal for mobile/scrolled menu.
//
//    useMobileMenu(isOpen, { menuRef, linksRef })
// ─────────────────────────────────────────────────────────────────────────────
export const useMobileMenu = (isOpen, { menuRef, linksRef }) => {
  useEffect(() => {
    if (!menuRef?.current) return
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 95% 5%)',
        duration: 0.8, ease: 'power4.inOut',
      })
      gsap.fromTo(linksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 95% 5%)',
        duration: 0.6, ease: 'power4.inOut',
      })
    }
  }, [isOpen])
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. useModalDrawer
//    Slide-in drawer from the right (ExerciseModal).
//    Returns handleClose() which plays the exit animation before calling onClose.
//
//    const { handleClose } = useModalDrawer({ overlayRef, drawerRef, onClose })
// ─────────────────────────────────────────────────────────────────────────────
export const useModalDrawer = ({ overlayRef, drawerRef, onClose }) => {
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(drawerRef.current,  { x: '100%' },  { x: '0%',   duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleClose = () => {
    gsap.to(drawerRef.current,  { x: '100%', duration: 0.4, ease: 'power3.in' })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, delay: 0.1,
      ease: 'power2.in', onComplete: onClose,
    })
  }

  return { handleClose }
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. useSpringPop
//     Scale-in with spring ease — used for social icons in Footer.
//     Targets all <a> or .pop-item elements inside the ref.
//
//     useSpringPop(socialsRef)
//     useSpringPop(socialsRef, { stagger: 0.12, delay: 0.4 })
// ─────────────────────────────────────────────────────────────────────────────
export const useSpringPop = (ref, {
  stagger = 0.1,
  delay   = 0.3,
  start   = 'top 90%',
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      const targets = ref.current.querySelectorAll('a, .pop-item')
      if (!targets.length) return
      gsap.fromTo(targets,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5,
          ease: 'back.out(1.7)', stagger, delay,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
}