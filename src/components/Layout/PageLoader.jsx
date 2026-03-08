import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LETTERS = 'TRANSFORM'.split('')

const PageLoader = ({ onComplete }) => {
  const panelTopRef = useRef(null)
  const panelBotRef = useRef(null)
  const lettersRef  = useRef([])
  const lineRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete })

    // ── Initial states ─────────────────────────────────────────────────────
    gsap.set(lettersRef.current, { y: 60, opacity: 0 })
    gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(panelTopRef.current, { yPercent: 0 })
    gsap.set(panelBotRef.current, { yPercent: 0 })

    // ── 1. Letters slam in fast, staggered ────────────────────────────────
    tl.to(lettersRef.current, {
      y: 0, opacity: 1,
      duration: 0.45,
      stagger: 0.04,
      ease: 'power4.out',
    }, 0)

    // ── 2. Orange line snaps under logo ───────────────────────────────────
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power3.inOut',
    }, 0.35)

    // ── 3. Hold briefly ───────────────────────────────────────────────────
    tl.to({}, { duration: 0.35 })

    // ── 4. Screen splits hard ─────────────────────────────────────────────
    tl.to(panelTopRef.current, {
      yPercent: -100,
      duration: 0.55,
      ease: 'power4.inOut',
    }, '>')
    tl.to(panelBotRef.current, {
      yPercent: 100,
      duration: 0.55,
      ease: 'power4.inOut',
    }, '<')

    return () => tl.kill()
  }, [])

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">

      {/* Top panel */}
      <div
        ref={panelTopRef}
        className="absolute top-0 left-0 w-full"
        style={{ height: '50vh', background: '#0a0a0a' }}
      />

      {/* Bottom panel */}
      <div
        ref={panelBotRef}
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '50vh', background: '#0a0a0a' }}
      />

      {/* Logo — sits in the center gap between panels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">

        {/* Letters */}
        <div className="flex items-end" style={{ gap: '0.03em' }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              style={{
                display: 'inline-block',
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Orange accent line */}
        <div
          ref={lineRef}
          style={{
            width: 'clamp(180px, 35vw, 420px)',
            height: '2px',
            background: '#ff6400',
          }}
        />

      </div>
    </div>
  )
}

export default PageLoader