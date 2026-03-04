import { useEffect, useRef } from 'react'
import { Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WhyusSection = () => {
  const sectionLeftRef = useRef(null)
  const sectionRightRef = useRef(null)
  const countersRef = useRef(null)

  // Counter animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters when they come into view
      ScrollTrigger.create({
        trigger: countersRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Members Transformed Counter
          gsap.to(countersRef.current.querySelector('.member-counter'), {
            innerHTML: 250,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: 'power2.out'
          })

          // Retention Rate Counter
          gsap.to(countersRef.current.querySelector('.retention-counter'), {
            innerHTML: 94,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: 'power2.out',
            onUpdate: function() {
              this.targets()[0].innerHTML = Math.floor(this.targets()[0].innerHTML) + '%'
            }
          })

          // Google Rating Counter
          gsap.to(countersRef.current.querySelector('.feedback-counter'), {
            innerHTML: 4.9,
            duration: 2,
            snap: { innerHTML: 0.1 },
            ease: 'power2.out',
            onUpdate: function() {
              this.targets()[0].innerHTML = this.targets()[0].innerHTML.toFixed(1)
            }
          })

          // Faster Progress Counter
          gsap.to(countersRef.current.querySelector('.progress-counter'), {
            innerHTML: 2.5,
            duration: 2,
            snap: { innerHTML: 0.1 },
            ease: 'power2.out',
            onUpdate: function() {
              this.targets()[0].innerHTML = this.targets()[0].innerHTML.toFixed(1) + 'x'
            }
          })
        },
        once: true // Only animate once
      })

      // Fade in animation for the whole section
      gsap.fromTo(sectionLeftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionLeftRef.current,
            start: 'top 80%',
          }
        }
      )




       gsap.fromTo(sectionRightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRightRef.current,
            start: 'top 80%',
          }
        }
      )



      
    }, sectionLeftRef, sectionRightRef, countersRef)

   
  
     

    return () => ctx.revert()
  }, [])

  return (
    <section id='features'
      
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Top Row - Two Paragraphs */}
        <div  className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Paragraph */}
          <div ref={sectionLeftRef} className="text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              Beyond the Workout
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              At TRANSFORM, we believe fitness is more than just lifting weights. 
              It's about building confidence, creating community, and becoming the 
              best version of yourself. Every journey starts with a single step, 
              and we're here to guide you through every rep, every mile, and every milestone.
            </p>
            
          </div>
          </div>

          {/* Right Paragraph */}
          <div   className="grid md:grid-cols-2 gap-12 mb-16">
          <div className='hidden md:block'></div>
          <div ref={sectionRightRef} className="text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              Proven Results
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              From life-changing transformations to athletic achievements, our members 
              accomplish results they never thought possible. With expert coaching, 
              state-of-the-art equipment, and a supportive community, you'll have 
              everything you need to succeed.
            </p>
          </div>
          </div>

        {/* Counter Grid */}
        <div 
          ref={countersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16"
        >
          {/* Counter 1: Members Transformed */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center gap-1">
              <span className="member-counter">0</span>
              <span>+</span>
            </div>
            <p className="text-text-secondary font-medium mb-1">Members Transformed</p>
            <p className="text-text-muted text-sm">From first-timers to competitive athletes</p>
          </div>

          {/* Counter 2: Retention Rate */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center gap-1">
              <span className="retention-counter">0</span>
              
            </div>
            <p className="text-text-secondary font-medium mb-1">Retention Rate</p>
            <p className="text-text-muted text-sm">One of the highest in Algeria</p>
          </div>

          {/* Counter 3: Google Rating */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center gap-1">
              <span className="feedback-counter">0</span>
             <span>★</span> 
            
            </div>
            <p className="text-text-secondary font-medium mb-1">Google Rating</p>
            <p className="text-text-muted text-sm">From 300+ verified member reviews</p>
          </div>

          {/* Counter 4: Faster Progress */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center gap-1">
              <span className="progress-counter">0</span>
              <span>x</span>
              
            </div>
            <p className="text-text-secondary font-medium mb-1">Faster Results</p>
            <p className="text-text-muted text-sm">vs working out alone</p>
          </div>
        </div>

        {/* Member Count Badge */}
        <div className="text-center mt-10 text-white">
          <div className="inline-flex items-center gap-3 bg-dark-card px-6 py-3 rounded-full border border-primary/20">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-text-primary font-medium">
              Join <span className="text-primary font-bold">1,500+</span> members transforming their lives
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}


export default WhyusSection