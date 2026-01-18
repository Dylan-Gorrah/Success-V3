import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Check, Sparkles, Zap, MessageCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shineCount, setShineCount] = useState(0)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Floating particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 5 + Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: 0.4 + Math.random() * 0.4,
  }))

  // Shine animation trigger
  useEffect(() => {
    if (!isInView) return
    
    const firstShine = setTimeout(() => {
      setShineCount(1)
    }, 500)

    const interval = setInterval(() => {
      setShineCount(prev => prev + 1)
    }, 6000)

    return () => {
      clearTimeout(firstShine)
      clearInterval(interval)
    }
  }, [isInView])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const message = `🌟 NEW PROJECT INQUIRY

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
💼 Project Type: ${formData.projectType}
💰 Budget: ${formData.budget}

📝 MESSAGE:
${formData.message}

---
Reply to start the conversation! ✨`.trim()

    const whatsappNumber = '27677020221'
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappURL, '_blank')
      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section id="contact" className="relative py-32 md:py-40 lg:py-48 px-6 bg-charcoal overflow-hidden" ref={ref}>
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-oat/15 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.15, 0.4, 0.15],
              scale: [particle.scale, particle.scale * 1.5, particle.scale],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header - Top Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 lg:mb-32"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-milk mb-8 tracking-tight">
            Let's Talk
          </h2>
          
          {/* Playful Badge with Shine */}
          <motion.div
            key={shineCount}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-12 relative overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-mocha animate-pulse" />
            <span className="text-sm text-oat font-light relative z-10">Just browsing our talent, right?</span>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ width: '50%', transform: 'skewX(-20deg)' }}
            />
          </motion.div>

          {/* Yellow Special Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 backdrop-blur-sm border-2 border-yellow-400/40 p-5 rounded-2xl max-w-xl mx-auto overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-yellow-400/10 rounded-2xl"
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                </motion.div>
                <h3 className="font-display font-bold text-yellow-400 text-base drop-shadow-lg">
                  Tomorrow Morning Special
                </h3>
              </div>
              <p className="text-milk text-sm font-light leading-relaxed">
                Chat with us today, wake up to a <span className="text-yellow-400 font-semibold">free working Draft</span>. 
                We'll whip up your first demo, consultation, and design idea. 
                <span className="text-yellow-400 font-semibold"> All free.</span> No catch.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Grid - Industry Standard Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* LEFT: Minimal Message Card (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl"
              whileHover={{ scale: 1.02, borderColor: 'rgba(229, 222, 210, 0.25)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 w-11 h-11 bg-oat/20 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MessageCircle className="w-5 h-5 text-oat" />
                </motion.div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-milk font-display font-semibold text-lg">
                    Don't Be Shy
                  </h3>
                  <p className="text-oat/90 leading-relaxed font-light text-sm">
                    Confused about the price for your idea? We'll discuss it and explain everything. 
                    No pressure, just clarity.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Professional Form (7 columns) */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7"
          >
            <div className="space-y-5">
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-oat text-xs font-semibold uppercase tracking-widest mb-1">
                  Get in Touch
                </h3>
                <p className="text-oat/60 text-xs font-light">
                  Fill out the form and we'll respond within an hour
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-oat/90 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-2.5 text-charcoal text-sm placeholder-taupe/40 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-oat/90 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-2.5 text-charcoal text-sm placeholder-taupe/40 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-oat/90 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+27 123 456 7890"
                  required
                  className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-2.5 text-charcoal text-sm placeholder-taupe/40 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Project Type & Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-oat/90 text-sm font-medium mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-2.5 text-charcoal text-sm focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Select project type</option>
                    <option value="Website">Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Custom System">Custom System/Tool</option>
                    <option value="Not Sure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-oat/90 text-sm font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-2.5 text-charcoal text-sm focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200"
                  >
                    <option value="">Let's discuss</option>
                    <option value="R600 - R2,000">R600 - R2,000</option>
                    <option value="R2,000 - R5,000">R2,000 - R5,000</option>
                    <option value="R5,000 - R10,000">R5,000 - R10,000</option>
                    <option value="R10,000+">R10,000+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-oat/90 text-sm font-medium mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  required
                  rows="4"
                  className="w-full bg-white/95 border border-oat/30 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-taupe/40 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-milk text-charcoal px-6 py-3.5 rounded-lg font-semibold text-sm hover:bg-oat transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} />
                      <span>Send via WhatsApp</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Trust Indicators - Horizontal Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-24 lg:mt-32 text-xs text-oat/60"
        >
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-mocha flex-shrink-0" />
            <span>No spam, ever</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-oat/20" />
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-mocha flex-shrink-0" />
            <span>Response within 1 hour</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-oat/20" />
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-mocha flex-shrink-0" />
            <span>Free demo by tomorrow</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}