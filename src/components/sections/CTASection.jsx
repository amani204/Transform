import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useMarqueeDual, useFadeUp } from '../../hooks'

const CTASection = () => {
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)
  const marqueeText = Array(10).fill('TRANSFORM').join(' · ')
  useMarqueeDual(marqueeRef, { duration: 12 })
  useFadeUp(contentRef, { start: 'top 80%', y: 80 })
  return (
    <div
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
    </div>
  )
}

export default CTASection