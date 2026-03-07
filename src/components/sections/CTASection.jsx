import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Marquee effect with (Two text spans)
      const marqueeTrack = marqueeRef.current
      gsap.to(marqueeTrack, {
        xPercent: -50,
        duration: 12,
        ease: 'none',
        repeat: -1,
      })
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const marqueeText = Array(10).fill('TRANSFORM').join(' · ')

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-dark-bg relative overflow-hidden"
    >
      {/* Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-3 border-b border-white/10 z-10">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {[marqueeText, marqueeText].map((text, i) => (
            <span
              key={i}
              className="text-sm font-black tracking-[0.3em] text-white/20 uppercase px-6"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10 pt-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
          style={{ opacity: 0 }}
        >
          <div className="text-center mb-10">
            <span className="text-primary font-black tracking-wider text-sm">
              JOIN
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
              Start Your Transformation Today
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Join Transform and start training with structured programs, expert
              coaching, and our complete workout library.
            </p>
          </div>

    
          <Link
            to="/workoutLibrary"
            className="btn-primary inline-flex items-center gap-2 mx-auto group"
          ><span>Explore Workouts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection