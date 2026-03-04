import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-20 bg-dark-bg relative overflow-hidden">
     

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
  
          
        <div className="text-center mb-10">
          <span className="text-primary font-black tracking-wider text-sm"> JOIN</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-4">
            Start now
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our training program is designed to guide you from registration to success. 
            Follow our simple steps to achieve your fitness goals.
          
          </p>
        </div>
          
          {/* CTA Button */}
          <Link 
            to="/pricing" 
            className="btn-primary inline-flex items-center gap-2 mx-auto"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection