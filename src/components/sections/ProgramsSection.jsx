import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import program images
import yogaImg from '../../assets/programs/yoga.jpg'
import strengthImg from '../../assets/programs/strength.jpg'
import cardioImg from '../../assets/programs/cardio.jpg'

gsap.registerPlugin(ScrollTrigger)

const ProgramsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

       gsap.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
      
      // Cards appear one after another
      gsap.fromTo(cardsRef.current,
        { 
          opacity: 0, 
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const programs = [
    {
      title: 'Yoga',
      description: 'Build flexibility, balance, and inner focus with personalized yoga sessions designed for you.',
      image: yogaImg,
      alt: 'A muscular man smiling while performing a hanging leg raise on gymnastic rings in a bright fitness studio.'
    },
    {
      title: 'Strength Training',
      description: 'Transform your body with targeted strength programs that maximize muscle growth.',
      image: strengthImg,
      alt: 'A shirtless man intensely using battle ropes in a gym, with another man in the background.'
    },
    {
      title: 'Cardio',
      description: 'Boost your stamina and burn calories efficiently with dynamic cardio workouts.',
      image: cardioImg,
      alt: 'A man with defined abs holding onto a vertical pole in a gym, looking to the side.'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-dark-bg relative overflow-hidden"
      id="programs"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <span className="text-primary font-black tracking-wider text-sm">PROGRAMS</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
            Our Training Programs
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
           Our training programs are designed to empower individuals at all skill levels. 
            We have the right programs for you.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {programs.map((program, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-125 overflow-hidden mb-6">
                <img
                  src={program.image}
                  alt={program.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Title overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-primary">{program.title}</h3>
                </div>
              </div>

              {/* Content (visible always) */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {program.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {program.description}
              </p>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link  className="btn-primary inline-flex items-center gap-2">
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection