import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Check, MessageCircle, X } from 'lucide-react'

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
  const [showHelper, setShowHelper] = useState(false)
  const [isHelperExpanded, setIsHelperExpanded] = useState(false)
  
  const ref = useRef(null)
  const helperTimerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const startHelperTimer = () => {
    if (helperTimerRef.current || showHelper) return
    helperTimerRef.current = setTimeout(() => {
      setShowHelper(true)
      helperTimerRef.current = null
    }, 5500)
  }

  const clearHelperTimer = () => {
    if (helperTimerRef.current) {
      clearTimeout(helperTimerRef.current)
      helperTimerRef.current = null
    }
  }

  useEffect(() => {
    return () => clearHelperTimer()
  }, [])

  useEffect(() => {
    if (isInView && !showHelper) {
      startHelperTimer()
    } else if (!isInView) {
      clearHelperTimer()
    }
  }, [isInView, showHelper])

  const handleFormFocus = () => {
    startHelperTimer()
  }

  const handleFormBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearHelperTimer()
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const safeValue = (value, fallback = 'Not provided') => (value?.trim() ? value : fallback)

    const message = `*NEW PROJECT REQUEST*
------------------------------

👤 *Founder Details*
• Full Name: ${safeValue(formData.name)}
• Email Address: ${safeValue(formData.email)}
• Phone Number: ${safeValue(formData.phone)}

📁 *Project Info*
• Project Type: ${safeValue(formData.projectType, 'Let\'s discuss')}
• Budget Range: ${safeValue(formData.budget, 'Let\'s discuss')}

📝 *Project Details*
${safeValue(formData.message, 'No notes yet — excited to share live.')}

------------------------------
Sent via Bread & Butter Projects Form`.trim()

    const whatsappNumber = '27677020221'
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappURL, '_blank')
      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const openWhatsAppDirect = () => {
    const message = "Hi! I'm interested in your services and would like to discuss a project."
    const whatsappNumber = '27677020221'
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-milk overflow-hidden snap-section" ref={ref}>
      <div className="relative max-w-7xl mx-auto">
        {/* Highlight Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="max-w-3xl mx-auto bg-[#dfdde2] border border-white/50 rounded-2xl px-8 py-7 shadow-[0_35px_80px_rgba(15,15,15,0.18)] text-center">
            <p className="text-xs uppercase tracking-[0.6em] text-taupe">Want to see our work?</p>
            <p className="text-base text-charcoal mt-3">
              Talk to us and we’ll spin up a <span className="font-semibold text-mocha">free</span> demo of your idea by tomorrow. Just browsing our talent?
            </p>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-display font-bold text-charcoal mb-6 tracking-tight">
            Let's Talk
          </h2>
          <p className="text-xl text-mocha max-w-2xl mx-auto font-light">
            Fill out form and we'll respond within an hour.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT: Empty Space / Info (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-oat/40 flex items-center justify-center flex-shrink-0 border border-charcoal/10">
                  <MessageCircle className="text-mocha" size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-1">
                    Quick Response
                  </h3>
                  <p className="text-mocha/80 text-sm font-light leading-relaxed">
                    We typically respond within 1 hour.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-oat/40 flex items-center justify-center flex-shrink-0 border border-charcoal/10">
                  <Check className="text-mocha" size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-1">
                    Free Consultation
                  </h3>
                  <p className="text-mocha/80 text-sm font-light leading-relaxed">
                    Receive a demo of your idea by tomorrow—free.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-charcoal/10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-mocha">
                <Check className="w-4 h-4 text-charcoal flex-shrink-0" strokeWidth={2.5} />
                <span className="font-light">No spam, ever</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-mocha">
                <Check className="w-4 h-4 text-charcoal flex-shrink-0" strokeWidth={2.5} />
                <span className="font-light">Response within 1 hour</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-mocha">
                <Check className="w-4 h-4 text-charcoal flex-shrink-0" strokeWidth={2.5} />
                <span className="font-light">Free demo by tomorrow</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Sleek Form (7 columns) */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            onSubmit={handleSubmit}
            onFocusCapture={handleFormFocus}
            onBlurCapture={handleFormBlur}
            className="lg:col-span-7"
          >
            <div className="bg-[#dfdde2] text-charcoal border border-white/50 rounded-2xl p-8 shadow-[0_40px_90px_rgba(10,10,10,0.25)]">
              <div className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-charcoal/80 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-white/50 border border-charcoal/20 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-charcoal/40 focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-charcoal/80 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-taupe/50 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-charcoal/80 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 123 456 7890"
                    required
                    className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-taupe/50 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 focus:bg-white"
                  />
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-charcoal/80 text-sm font-medium mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/60 border border-charcoal/20 rounded-lg px-4 py-3 text-charcoal text-sm focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:outline-none transition-all duration-200"
                    >
                      <option value="">Select project type</option>
                      <option value="Website">Website</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Custom System">Custom System/Tool</option>
                      <option value="Not Sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-charcoal/80 text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-white/60 border border-charcoal/20 rounded-lg px-4 py-3 text-charcoal text-sm focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:outline-none transition-all duration-200"
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
                  <label htmlFor="message" className="block text-charcoal/80 text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project goals and dreams."
                    required
                    rows="4"
                    className="w-full bg-white/50 border border-charcoal/20 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-charcoal/40 focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full bg-charcoal text-milk px-6 py-4 rounded-lg font-semibold text-sm hover:bg-mocha transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg border border-charcoal/5"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send size={16} />
                        </motion.div>
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={16} strokeWidth={2} />
                        <span>Send via WhatsApp</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>

      {/* "Confused?" Helper Button & Modal */}
      <AnimatePresence>
        {showHelper && !isHelperExpanded && (
          <motion.button
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => setIsHelperExpanded(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="fixed bottom-8 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-white/80 text-charcoal shadow-lg border border-charcoal/10 backdrop-blur"
          >
            <div className="w-9 h-9 rounded-full bg-charcoal/5 border border-charcoal/10 flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-charcoal/70">Need clarity?</p>
              <p className="text-sm font-semibold">Confused? Click me</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHelperExpanded && (
          <motion.div
            key="helper-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-charcoal/45 backdrop-blur-md"
            onClick={() => setIsHelperExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white/90 border border-white/40 rounded-3xl shadow-2xl p-8 backdrop-blur-xl"
            >
              <button
                onClick={() => setIsHelperExpanded(false)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors"
              >
                <X size={16} className="text-charcoal" />
              </button>

              <div className="space-y-5">
                <div className="inline-flex gap-3">
                  <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] bg-charcoal/5 text-charcoal/70 border border-charcoal/10">24/7</span>
                  <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] bg-charcoal/5 text-charcoal/70 border border-charcoal/10">Replies in ~10 min</span>
                </div>
                <h3 className="text-3xl font-display font-semibold text-charcoal">
                  Hey,👋
                </h3>
                <p className="text-base text-mocha leading-relaxed font-light">
                  If anything's unclear or you just want to chat about pricing, I'm here to help! Just click the button below to message me on WhatsApp.
                </p>

                <motion.button
                  onClick={openWhatsAppDirect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-2xl font-semibold text-base transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}