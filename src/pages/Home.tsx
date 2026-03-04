import React from 'react'
import HeroSection from '../components/Layout/HeroSection'
import WhyusSection from '../components/Layout/WhyusSection'
import TeamSection from '../components/Layout/TeamSection'
import PricingSection from '../components/Layout/PricingSection'
import FAQSection from '../components/Layout/FAQSection'
import CTASection from '../components/Layout/CTASection'

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <WhyusSection/>
        <TeamSection/>
        <PricingSection/>
        <FAQSection/>
        <CTASection/>
    </div>
  )
}

export default Home