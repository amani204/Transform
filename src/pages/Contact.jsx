import { useState, useEffect, useRef } from 'react'
import { useFadeUp, useButtonPulse,shakeElement, fadeOutElement} from '../hooks'
import { ArrowUpRight, Mail, User, MessageSquare } from 'lucide-react'
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const btnRef = useRef(null)
  const pulseRef = useRef(null) 

  const allFilled = form.name.trim() && form.email.trim() && form.message.trim()
  useFadeUp(contentRef, { stagger: 0.15, start: 'top 75%', y: 30, duration: 0.7 })
  useButtonPulse({ btnRef, pulseRef, allFilled, submitted })
  

  // Validation
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) {
      e.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email'
    }
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

   const handleSubmit = () => {
  const e = validate()
  if (Object.keys(e).length) {
    setErrors(e)
    shakeElement(contentRef.current)
    return
  }
  if (pulseRef.current) {
    pulseRef.current.kill()
    pulseRef.current = null
  }
  fadeOutElement(contentRef.current, () => setSubmitted(true))
}

  
  if (submitted) {
    return (
      <div ref={sectionRef} id="contact" className="min-h-screen bg-dark-bg flex items-center py-24">
        <ThankYou />
      </div>
    )
  }

  return (
    <div  ref={sectionRef} className="min-h-screen bg-dark-bg flex items-center py-24">
      <div className="py-20 container-custom max-w-2xl mx-auto px-6">
        <div ref={contentRef} className="space-y-8">

          {/* Header */}
          <div className="space-y-4">
            <span className="block text-primary font-black tracking-[0.2em] text-sm uppercase">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Contact us
            </h1>
          </div>

          {/* Fields */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-text-secondary text-xs font-black uppercase mb-2">
                <User className="w-3.5 h-3.5" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent border-b-2 border-dark-border focus:border-primary text-white py-3 outline-none transition-colors duration-300"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-text-secondary text-xs font-black uppercase mb-2">
                <Mail className="w-3.5 h-3.5" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b-2 border-dark-border focus:border-primary text-white py-3 outline-none transition-colors duration-300"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-text-secondary text-xs font-black uppercase mb-2">
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows={4}
                className="w-full bg-transparent border-b-2 border-dark-border focus:border-primary text-white py-3 outline-none resize-none transition-colors duration-300"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
          </div>

          {/* Button */}
          <button
            ref={btnRef}
            onClick={handleSubmit}
            style={{ willChange: 'transform' }}
            className={`
              inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-widest text-sm
              transition-colors duration-300 border-2
              ${allFilled
                ? 'bg-primary text-black border-primary hover:bg-primary/90 cursor-pointer'
                : 'bg-transparent text-white/30 border-white/20 cursor-not-allowed'
              }
            `}
          >
            {allFilled ? 'Send Message' : 'Fill all fields'}
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  )
}

// Thank You screen 
const ThankYou = () => {
  const ref = useRef(null)
  useFadeUp(ref, { stagger: 0.15, y: 30, duration: 0.7 })
  

  return (
    <div ref={ref} className="container-custom max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
      <div className="w-16 h-16 border-2 border-primary flex items-center justify-center" style={{ opacity: 0 }}>
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold text-white" style={{ opacity: 0 }}>Thank you.</h2>
      <p className="text-text-secondary text-lg" style={{ opacity: 0 }}>
        We got your message and will be in touch soon.
      </p>
    </div>
  )
}

export default Contact