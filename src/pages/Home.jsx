import { Hero, Programs, Team, CTA, FAQ, Pricing } from '../components/sections'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  
  useEffect(() => {
    // Check if we need to scroll to a section
    if (location.state?.scrollTo) {
      const element = document.querySelector(location.state.scrollTo)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100) // Small delay to ensure page is loaded
      }
      // Clear the state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return (
    <main>
      <Hero />
      <Programs />
      <Team />
      <Pricing/>
      <CTA />
      <FAQ />
    </main>
  )
}
export default Home