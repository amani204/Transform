
// Reusable scroll-triggered reveal animations:
// buttons/elements sliding from left, right, up + text from left and up

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// useSlideIn Slide an element in from left, right, or up on scroll.

export const useSlideIn = (ref, {
  from     = 'left',
  distance = 60,
  start    = 'top 85%',
  delay    = 0,
  duration = 0.8,
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      const isHorizontal = from === 'left' || from === 'right'
      const axis  = isHorizontal ? 'x' : 'y'
      const value = from === 'right' || from === 'down' ? distance : -distance

      gsap.fromTo(ref.current,
        { [axis]: value, opacity: 0 },
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

// useTextReveal
// Reveals text children (words/lines) — stagger from left or up.
// Wrap each word/line in a <span> inside the ref element.

export const useTextReveal = (ref, {
  from     = 'up',
  distance = 30,
  stagger  = 0.06,
  start    = 'top 85%',
  delay    = 0,
  duration = 0.7,
} = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      const children = ref.current.children
      if (!children.length) return

      const isHorizontal = from === 'left' || from === 'right'
      const axis  = isHorizontal ? 'x' : 'y'
      const value = from === 'right' || from === 'down' ? distance : -distance

      gsap.fromTo(children,
        { [axis]: value, opacity: 0 },
        {
          [axis]: 0, opacity: 1, duration, delay, stagger,
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

//useFadeUp Simple fade + slide up. Pass stagger to animate ref.current.children.
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

// useSlideInFaq Stagger-slides an array of FAQ items from left on scroll.

export const useSlideInFaq = ({ sectionRef, faqItemsRef }) => {
  useEffect(() => {
    if (!sectionRef?.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(faqItemsRef.current.filter(Boolean),
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])
}

// useButtonPulse Pulses a button when allFilled is true, stops when false or submitted.
export const useButtonPulse = ({ btnRef, pulseRef, allFilled, submitted }) => {
  useEffect(() => {
    if (!btnRef?.current) return

    if (pulseRef.current) {
      pulseRef.current.kill()
      pulseRef.current = null
    }

    if (allFilled && !submitted) {
      gsap.set(btnRef.current, { scale: 1 })
      pulseRef.current = gsap.to(btnRef.current, {
        scale: 1.04, duration: 0.7,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    } else {
      gsap.set(btnRef.current, { scale: 1 })
    }

    return () => {
      if (pulseRef.current) {
        pulseRef.current.kill()
        pulseRef.current = null
      }
    }
  }, [allFilled, submitted])
}

//shakeElement Shake an element on invalid submit.

export const shakeElement = (el) => {
  if (!el) return
  gsap.fromTo(el,
    { x: -10 },
    { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
  )
}

// fadeOutElement Fade out + slide up an element, then call onComplete.
export const fadeOutElement = (el, onComplete) => {
  if (!el) return
  gsap.to(el, {
    opacity: 0, y: -20, duration: 0.4,
    ease: 'power2.in', onComplete,
  })
}