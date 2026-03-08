// src/hooks/useMarquee.js
// Two variants of infinite horizontal marquee

import { useEffect } from 'react'
import gsap from 'gsap'

// ── useMarqueeDual ────────────────────────────────────────────────────────────
// For the TWO-SPAN pattern — render your text twice inside the ref div:
//
//   <div ref={marqueeRef} style={{ width: 'max-content' }}>
//     <span>{text}</span>
//     <span>{text}</span>
//   </div>
//
// Animates xPercent: 0 → -50 so the loop is perfectly seamless.
//
// Usage:
//   useMarqueeDual(marqueeRef)
//   useMarqueeDual(marqueeRef, { duration: 18 })   → slower
// ─────────────────────────────────────────────────────────────────────────────
export const useMarqueeDual = (ref, { duration = 12 } = {}) => {
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

// ── useMarqueeHalf ────────────────────────────────────────────────────────────
// For a SINGLE element whose natural width is already double the visible area
// (e.g. width: max-content with lots of repeated text).
// Moves by exactly half its own width so the seam is invisible.
//
// Usage:
//   useMarqueeHalf(marqueeRef)
//   useMarqueeHalf(marqueeRef, { duration: 20 })
// ─────────────────────────────────────────────────────────────────────────────
export const useMarqueeHalf = (ref, { duration = 15 } = {}) => {
  useEffect(() => {
    if (!ref?.current) return
    const el    = ref.current
    const halfW = el.scrollWidth / 2

    const tween = gsap.to(el, {
      x: -halfW,
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % halfW),
      },
    })
    return () => tween.kill()
  }, [])
}
