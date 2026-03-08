import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Users, TrendingUp, Star } from 'lucide-react'
import { useHeroEntrance, useFloating } from '../../hooks'
import hero from '../../assets/hero.jpg'

const HeroSection = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const guaranteeRef = useRef(null)
  const cardRef = useRef(null)
 

  useHeroEntrance({
  sectionRef, bgRef, overlayRef,
  line1Ref, line2Ref, subtitleRef,
  buttonsRef, guaranteeRef, cardRef,
})
useFloating(cardRef, { distance: 10, duration: 3, delay: 1.8 })
  const stats = [
    { icon: Users, value: '500+', label: 'Active Members' },
    { icon: TrendingUp, value: '94%', label: 'Success Rate' },
    { icon: Star, value: '4.9', label: 'Google Rating' }
  ]

  const scheduleItems = [
    { name: 'HIIT', coach: 'with Sofia', time: '10:00 AM', spots: '3 spots left', full: false },
    { name: 'Yoga', coach: 'with James', time: '2:00 PM', spots: '8 spots left', full: false },
    { name: 'Strength', coach: 'with Ethan', time: '5:30 PM', spots: 'Full', full: true },
  ]

  return (
    <div
      id="home"
      ref={sectionRef}
      className="pt-50 pb-10 relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={hero}
          alt="Fitness Background"
          className="w-full h-full object-cover"
         style={{ willChange: 'transform' }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black" />

        {/* Vignette edges */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
          }}
        />

        
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="text-left">

            {/* Title */}
            <div ref={titleRef} className="overflow-hidden mb-2">
              <h1
                ref={line1Ref}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
               
              >
                Expert Coaches.
              </h1>
            </div>
            <div className="overflow-hidden mb-6">
              <h1
                ref={line2Ref}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
              >
                Powerful Results.
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl leading-relaxed"
            >
              Discover proven workouts, track your progress, and get guidance
              from experienced coaches — all in one place.
            </p>

  {/* Buttons */}
  <div ref={buttonsRef} className="flex flex-col sm:flex-row mb-8" >
  <Link
    to="/workoutLibrary"
    className="btn-primary inline-flex items-center justify-center gap-2 group"
  >
    <span>Explore Workouts</span>
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Link>
  <a 
    href="#pricing" 
    onClick={(e) => {
      e.preventDefault()
      const pricingSection = document.querySelector('#pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        })
      }
    }}
    className="btn-secondary inline-flex items-center justify-center"
  >
    <span>See Pricing</span>
  </a>
</div>

            {/* Guarantee */}
            <div
              ref={guaranteeRef}
              className="flex items-center gap-2 text-text-secondary"
            >
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* Schedule Card */}
          <div
            ref={cardRef}
            style={{
              opacity: 0,
              background: 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '2rem',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">
                  Today's Schedule
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Up Next</h3>
              </div>
              {/* Live dot */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-ping bg-primary"
                />
                <span className="text-xs text-text-secondary tracking-widest uppercase">Live</span>
              </div>
            </div>

            {/* Schedule rows */}
            <div className="space-y-1">
              {scheduleItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4"
                  style={{
                    borderBottom: i < scheduleItems.length - 1
                      ? '1px solid rgba(255,255,255,0.06)'
                      : 'none',
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Index number */}
                    <span
                      className="text-xs font-black tabular-nums text-text-secondary"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-white font-bold text-sm">{item.name}</p>
                      <p className="text-text-secondary text-xs">{item.coach}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-white/80" >{item.time}</p>
                    <p
                      className="text-xs"
                      style={{ color: item.full ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)' }}
                    >
                      {item.spots}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default HeroSection