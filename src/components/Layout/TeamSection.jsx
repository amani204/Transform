import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import gsap from 'gsap'
import JamesCarter from '../../assets/trainers/boy1.jpg'
import EthanBrooks from '../../assets/trainers/boy2.jpg'
import SofiaRamirez  from '../../assets/trainers/girl1.jpg'
import MarcusJohnson from '../../assets/trainers/boy6.jpg'
import LucasWard  from '../../assets/trainers/boy7.jpg'
import EmmaRoberts from '../../assets/trainers/girl2.jpg'
import AlexRodriguez  from '../../assets/trainers/boy8.jpg'


import person1Img from '../../assets/testimonials/person1Img.jpg'
import person2Img from '../../assets/testimonials/person2Img.jpg'
import person3Img from '../../assets/testimonials/person3Img.jpg'
import person4Img from '../../assets/testimonials/person4Img.jpg'
import person5Img from '../../assets/testimonials/person5Img.jpg'
import person6Img from '../../assets/testimonials/person6Img.jpg'


const TeamSection = () => {
  const marqueeRef = useRef(null)
  const sectionRef = useRef(null)

  const trainers = [
    {
      name: 'James Carter',
      role: 'Personal Trainer',
      image: JamesCarter,

    },
    {
      name: 'Ethan Brooks',
      role: 'Strength Coach',
      image: EthanBrooks,
   
    },
    {
      name: 'Sofia Ramirez ',
      role: 'Head Coach',
      image: SofiaRamirez ,
 
    },
    {
      name: 'Marcus Johnson',
      role: 'Nutritionist',
      image: MarcusJohnson,
     
    },
    {
      name: 'Lucas Ward',
      role: 'Wellness Coach',
      image: LucasWard,
 
    },
    {
      name: 'Alex Rodriguez',
      role: 'Fitness Specialist',
      image: AlexRodriguez,
  
    },
    {
      name: 'Emma Roberts',
      role: 'Yoga Instructor',
      image: EmmaRoberts,
    
    },
  
  ]


  const testimonials = [
    {
      
      role: 'Account Executive',
      quote: 'I\'ve tried gyms, apps, and diets — nothing compares to this program. The structure and personal attention made all the difference.',
      image: person1Img
    },
    {
      
      role: 'Software Engineer',
      quote: 'Lost 30lbs in 4 months. The coaches actually care about your progress, not just collecting membership fees.',
      image: person2Img
    },
    {
     
      role: 'Marketing Director',
      quote: 'The nutrition coaching changed my relationship with food. I finally understand what my body needs.',
      image: person3Img
    },
    {
     
      role: 'Small Business Owner',
      quote: 'After 40, I thought getting fit was impossible. This team proved me wrong. Stronger now than in my 20s.',
      image: person4Img
    },
    {
     
      role: 'Teacher',
      quote: 'The community here keeps me coming back. It\'s not just a gym, it\'s my second family.',
      image: person5Img
    },
    {
     
      role: 'Construction Manager',
      quote: 'From back pain to deadlifting 400lbs. The recovery focus here is unmatched.',
      image: person6Img
    },
    
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current
      const marqueeWidth = marquee.scrollWidth / 2 

      gsap.to(marquee, {
        x: -marqueeWidth,
        duration: 50,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
        }
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
    
      ref={sectionRef}
      className="section-padding bg-dark-bg relative overflow-hidden"
      id="team"
    >
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          {/* Left side - Text */}
          <div className="max-w-xl ">
            <span className="badge mb-4">TEAM</span>
            <h2 className="section-title mb-4">Join our team</h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Meet our dedicated coaches and trainers. Each expert brings years 
              of experience to help you achieve your fitness goals. From strength 
              training to nutrition, we've got you covered.
            </p>
          </div>

          {/* Right side - Buttons */}
          <div className="flex gap-4">
            <Link to="/pricing" className="btn-primary inline-flex items-center gap-2">
              Join Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-secondary">
              About Us
            </Link>
          </div>
        </div>

        {/* ===== SCROLLABLE TRAINER CARDS ===== */}
        <div className="mb-16">
         
          <div className="flex justify-end mb-4">
            <span className="text-sm text-text-muted flex items-center gap-2">
              <Users className="w-4 h-4" /> Scroll for more trainers →
            </span>
          </div>

       =
          <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            <div className="flex gap-6 w-max">
              {trainers.map((trainer, index) => (
                <div
                  key={index}
                  className="w-70 group cursor-pointer"
               >
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/280x320?text=${trainer.name}`
                      }}
                    />
                  
                    <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-text-muted font-medium mb-2">
                    {trainer.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

     {/* INFINITE MARQUEE */}
        <div className="py-8 border-y border-dark-border">
          
          <div className="relative w-full overflow-hidden">
           
            <div className="absolute left-0 top-0 w-32 h-full bg-linear-to-r from-dark-surface to-transparent z-20" />
            <div className="absolute right-0 top-0 w-32 h-full bg-linear-to-l from-dark-surface to-transparent z-20" />

            
            <div 
              ref={marqueeRef}
              className="flex gap-6 items-center"
              style={{ width: 'fit-content' }}
            >
            
              {testimonials.map((person, index) => (
                <div
                  key={`test-1-${index}`}
                  className="w-100 h-125 shrink-0 group relative overflow-hidden rounded-2xl"
                >
              
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${person.name}`
                    }}
                  />
                  
              
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70" />
                  
                
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-white text-lg leading-relaxed mb-4">
                      "{person.quote}"
                    </p>
                    <div>
                      <p className="text-text-secondary font-medium">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-orange-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20" />
                </div>
              ))}

              {testimonials.map((person, index) => (
                <div
                  key={`test-2-${index}`}
                  className="w-100 h-125 shrink-0 group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${person.name}`
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-white text-lg leading-relaxed mb-4">
                      "{person.quote}"
                    </p>
                    <div>
                    
                      <p className="text-text-secondary font-medium">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-2 border-orange-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection

     