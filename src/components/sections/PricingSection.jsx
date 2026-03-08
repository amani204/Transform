import { useRef } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { useFadeUp } from '../../hooks'

const PricingSection = () => {
  const sectionRef = useRef(null)
  const cardsWrapperRef = useRef(null)
  useFadeUp(sectionRef, { start: 'top 80%', y: 50 })
  useFadeUp(cardsWrapperRef, { stagger: 0.2, start: 'top 70%', y: 100 })
  const programs = [
    {
      name: 'Starter',
      price: 89,
      period: '/mo',
      description: 'Perfect for beginners looking to build consistency and confidence.',
      features: [
        '8 training sessions / month',
        'Gym access',
        'Progress tracking',
        'Technique coaching',
        
      ],
      cta: 'Get Started',
      popular: false,
      borderColor: 'border border-white/20',
    },
    {
      name: 'Pro',
      price: 189,
      period: '/mo',
      description: 'Gentle, structured recovery to get confidence and balance again.',
      features: [
        '12 training sessions',
        'Personalized workout program',
        'Nutrition guidance',
        'PMonthly progress reviews',
        'Priority class booking'
      ],
      cta: 'Get Started',
      popular: true,
      borderColor: 'border border-primary',
      badge: 'Most Popular'
    },
    {
      name: 'Elite',
      price: 329,
      period: '/mo',
      description: 'Workouts + nutrition designed ',
      features: [
        'Unlimited sessions',
        'Fully personalized training plan',
        'Nutrition coaching',
        'Weekly 1-on-1 coaching',
        'Priority support'
      ],
      cta: 'Get Started',
      popular: false,
      borderColor: 'border border-white/20',
      textColor: 'text-white/90'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-dark-bg relative overflow-hidden" 
      id="pricing"
    >
      <div className="container-custom relative z-10">

        {/* Programs Title */}
        <div className="text-center mb-10">
          <span className="text-primary font-black tracking-wider text-sm">PRICING</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
            Signature Programs
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose the program that fits your goals, lifestyle, and pace. Every plan includes 
            personalized workouts, nutrition guidance, and weekly support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsWrapperRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4  mt-12">
          {programs.map((program, index) => {
            return (
              <div
                key={index}
                className={`bg-dark-card relative ${program.borderColor} ${
                  program.popular ? 'p-10' : 'p-8'
                }`}
              >
                {/* Popular Badge */}
                {program.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className=" bg-primary text-black text-xs font-bold px-4 py-1 scale-x-75">
                    Most Popular
                    </span>
                  </div>
                )}

                {/* Program Name */}
                <h3 className="text-xl font-bold text-primary mb-8 ">
                  {program.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">
                    ${program.price}
                  </span>
                  <span className="text-text-muted ml-2">
                    {program.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-6">
                  {program.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  to="/contact"
                  className={` group w-[90%]
                    transition-all duration-300 flex items-center justify-center gap-2  ${
                  program.popular ? 'btn-primary' : 'btn-secondary' }`}
                >
                  <span>{program.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  
                </button>
              </div>
            )
          })}
        </div>
        </div>
    </section>
  )
}

export default PricingSection