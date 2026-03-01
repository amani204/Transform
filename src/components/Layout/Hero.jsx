import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'
import hero from '../../assets/hero.jpg'
const HeroSection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const guaranteeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )

      // Subtitle fade in
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Buttons slide up
      gsap.fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      )

      // Guarantee fade in
      gsap.fromTo(guaranteeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src= {hero}
          alt="Fitness Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 container-custom text-center pt-20"
      >
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
        >
          Transform Your Fitness Journey with Expert Guidance
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Unlock your potential with personalized training programs designed by experienced coaches. Achieve your fitness goals faster and more effectively than ever before.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/exercises" 
            className="btn-primary inline-flex items-center justify-center gap-2 group"
          >
            Try for Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a 
            href="#pricing" 
            className="btn-secondary inline-flex items-center justify-center"
          >
            See Pricing
          </a>
        </div>

        {/* 30-Day Money-Back Guarantee */}
        <div 
          ref={guaranteeRef}
          className="flex items-center justify-center gap-2 text-text-secondary"
        >
          <ShieldCheck className="w-5 h-5 text-orange-primary" />
          <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection