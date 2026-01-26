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
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Show helper button after 4 seconds
  useEffect(() => {
    if (!isInView) return
    
    const timer = setTimeout(() => {
      setShowHelper(true)
    }, 4000)

    return () => clearTimeout(timer)
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

    const message = `NEW PROJECT INQUIRY

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Project Type: ${formData.projectType}
Budget: ${formData.budget}

MESSAGE:
${formData.message}

---
Reply to start conversation!`.trim()

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
                <div className="w-12 h-12 rounded-xl bg-oat/30 flex items-center justify-center flex-shrink-0 border border-charcoal/5">
                  <MessageCircle className="text-mocha" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-2">
                    Quick Response
                  </h3>
                  <p className="text-mocha font-light leading-relaxed">
                    We typically respond within 1 hour during business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-oat/30 flex items-center justify-center flex-shrink-0 border border-charcoal/5">
                  <Check className="text-mocha" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-2">
                    Free Consultation
                  </h3>
                  <p className="text-mocha font-light leading-relaxed">
                    Get expert advice and a detailed project quote at no cost.
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
            className="lg:col-span-7"
          >
            <div className="bg-white border border-charcoal/10 rounded-2xl p-8 shadow-lg">
              <div className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-charcoal text-sm font-medium mb-2">
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
                      className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-taupe/50 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-charcoal text-sm font-medium mb-2">
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
                  <label htmlFor="phone" className="block text-charcoal text-sm font-medium mb-2">
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
                    <label htmlFor="projectType" className="block text-charcoal text-sm font-medium mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 focus:bg-white"
                    >
                      <option value="">Select project type</option>
                      <option value="Website">Website</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Custom System">Custom System/Tool</option>
                      <option value="Not Sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-charcoal text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 focus:bg-white"
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
                  <label htmlFor="message" className="block text-charcoal text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    required
                    rows="4"
                    className="w-full bg-oat/20 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal text-sm placeholder-taupe/50 focus:border-mocha focus:ring-1 focus:ring-mocha/20 focus:outline-none transition-all duration-200 resize-none focus:bg-white"
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

      {/* "Confused?" Helper Button */}
      <AnimatePresence>
        {showHelper && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <AnimatePresence>
              {!isHelperExpanded ? (
                // Collapsed Button
                <motion.button
                  key="collapsed"
                  onClick={() => setIsHelperExpanded(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-charcoal text-milk px-6 py-4 rounded-full shadow-2xl border border-charcoal/10 hover:bg-mocha transition-colors duration-300"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Confused?</span>
                    <span className="text-xs opacity-75 font-light">Click me</span>
                  </div>
                </motion.button>
              ) : (
                // Expanded Card
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border border-charcoal/10 rounded-2xl shadow-2xl p-6 max-w-sm backdrop-blur-sm"
                  style={{ 
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsHelperExpanded(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-oat/30 transition-colors"
                  >
                    <X size={16} className="text-mocha" />
                  </button>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold text-charcoal pr-8">
                      Need Help?
                    </h3>
                    <p className="text-sm text-mocha font-light leading-relaxed">
                      If pricing or anything is confusing, don't worry! You can contact me directly on WhatsApp by filling in form above, or click the button below to chat now.
                    </p>
                    
                    <motion.button
                      onClick={openWhatsAppDirect}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop Blur when helper is expanded */}
      <AnimatePresence>
        {isHelperExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsHelperExpanded(false)}
            className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </section>
  )
}