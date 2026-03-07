import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Users, TrendingUp, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import hero from '../../assets/hero.jpg'

gsap.registerPlugin(ScrollTrigger)

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
 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      gsap.fromTo(bgRef.current,
        { scale: 1.08 }, // Starts slightly zoomed in
        { scale: 1, duration: 2.2, ease: 'power2.out' }
      )

      // Overlay darkens
      gsap.fromTo(overlayRef.current,
        { opacity: 0.3 }, // Starts lighter
        { opacity: 0.72, duration: 1.8, ease: 'power2.inOut' }
      )

      // Title line 1 — slides up with clip
      tl.fromTo(line1Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9 },
        0.5
      )

      // Title line 2 — offset stagger
      tl.fromTo(line2Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9 },
        0.68
      )

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.0
      )

      // 7Buttons
      tl.fromTo(buttonsRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.15
      )

      // Guarantee
      tl.fromTo(guaranteeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.35
      )

      
      tl.fromTo(cardRef.current,
        { opacity: 0, x: 60, rotateY: 8 },  // Starts right, rotated
        { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out' },  // Slides to position, straightens
        0.7
      )

      // 10. Floating idle animation on card (subtle bob)
      gsap.to(cardRef.current, {
        y: -10, // Moves up 10px
        duration: 3, 
        repeat: -1, // Loops forever
        yoyo: true,  // Goes up AND down
        ease: 'sine.inOut',
        delay: 1.8
      })

      // bg moves slower than content
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
    <section
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

          {/* LEFT — Text */}
          <div className="text-left">

            {/* Title — each line clips independently */}
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
              style={{ opacity: 0 }}
            >
              Discover proven workouts, track your progress, and get guidance
              from experienced coaches — all in one place.
            </p>

  {/* Buttons */}
  <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-8" style={{ opacity: 0 }}>
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
          block: 'start'  // aligns to top of section
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
              style={{ opacity: 0 }}
            >
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* RIGHT — Schedule Card */}
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
    </section>
  )
}

export default HeroSection