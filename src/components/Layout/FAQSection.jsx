import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const leftTextRef = useRef(null)
  const faqItemsRef = useRef([])

  const faqs = [
    {
      question: 'What should I expect during my first session?',
      answer: 'Your first session includes a comprehensive fitness assessment, goal discussion, and an introductory workout. We\'ll evaluate your current fitness level, discuss your goals, and create a personalized plan. You\'ll also meet your coach and get familiar with our facility.'
    },
    {
      question: 'Do I need a gym membership?',
      answer: 'No, you don\'t need a separate gym membership. All our programs include full access to our facility during training sessions and open gym hours. Everything you need is provided in your plan.'
    },
    {
      question: 'How often should I train each week?',
      answer: 'We recommend 2-4 sessions per week depending on your goals and schedule. Most clients start with 2-3 sessions and adjust based on their progress and recovery. Your coach will help determine the optimal frequency for you.'
    },
    {
      question: 'Is nutrition coaching included?',
      answer: 'Yes, all our programs include nutrition guidance. You\'ll get personalized meal plans, grocery lists, and ongoing support to help you make sustainable dietary changes that complement your training.'
    },
    {
      question: 'Can I cancel or pause my plan anytime?',
      answer: 'Absolutely! We offer flexible plans that you can pause or cancel at any time with no hidden fees. Just give us 7 days notice before your next billing cycle.'
    },
    {
      question: 'How long will it take to see results?',
      answer: 'Most clients start noticing changes within 2-4 weeks, with significant results visible in 8-12 weeks. Everyone\'s journey is different, and we focus on sustainable progress rather than quick fixes.'
    }
  ]

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Left text appears from left
      gsap.fromTo(leftTextRef.current,
        { 
          opacity: 0, 
          x: -100
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      // FAQ items appear from left one after another
      gsap.fromTo(faqItemsRef.current,
        { 
          opacity: 0, 
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-dark-bg relative overflow-hidden" 
      id="faq"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN - Title & Description */}
          <div ref={leftTextRef} className="lg:sticky lg:top-32">
           <span className="text-primary font-black tracking-wider text-sm">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              If you're new here or wondering what to expect, these answers will guide 
              you through how coaching works, what's included, and how we tailor every 
              plan to your needs.
            </p>
            
            {/* Optional CTA */}
            <div className="mt-8">
              <p className="text-text-muted text-sm">
                Still have questions?{' '}
                <a href="#contact" className="text-primary hover:underline">
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - FAQ Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={el => faqItemsRef.current[index] = el}
                className="border-b border-dark-border last:border-b-0 hover:border-white transition-all duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span className="text-white font-semibold text-lg pr-8">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-dark-card flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'bg-primary ' : 'group-hover:bg-primary/20 '
                  }`}>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                </button>

                {/* Answer (with animation) */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-5 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FAQSection