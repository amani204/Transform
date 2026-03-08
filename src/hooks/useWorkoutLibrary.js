
import { useEffect } from 'react'
import gsap from 'gsap'

// useLibraryHero 

export const useLibraryHero = ({ heroRef, titleRef, subtitleRef, statsRef, statusRef }, usingMock) => {
  useEffect(() => {
    if (!heroRef?.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(heroRef.current?.children?.[0],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      tl.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )
      tl.fromTo(statsRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      )
      tl.fromTo(statusRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [usingMock])
}

// useExerciseGrid 

export const useExerciseGrid = (cardRefs, isLoading, exercises) => {
  useEffect(() => {
    if (isLoading) return
    const valid = cardRefs.current.filter(Boolean)
    if (!valid.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(valid,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.05 }
      )
    })

    cardRefs.current = []
    return () => ctx.revert()
  }, [isLoading, exercises])
}

// useFilterBarEntrance

export const useFilterBarEntrance = (ref) => {
  useEffect(() => {
    if (!ref?.current) return
    gsap.fromTo(ref.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
    )
  }, [])
}
