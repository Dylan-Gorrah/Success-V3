import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Globe, Database, Smartphone, Zap } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites',
    description: 'Built to convert visitors into customers',
    points: [
      'Fast loading speeds that keep people engaged',
      'Mobile-first design that works everywhere',
      'SEO optimized so people can find you',
      'Easy to update and manage yourself',
    ],
  },
  {
    icon: Database,
    title: 'Business Systems',
    description: 'Automate tasks and save time',
    points: [
      'Custom dashboards for your team',
      'Connect your tools and automate workflows',
      'Data tracking that makes sense',
      'Scales as your business grows',
    ],
  },
  {
    icon: Smartphone,
    title: 'Apps',
    description: 'Mobile experiences people love',
    points: [
      'Intuitive design that feels natural',
      'Works offline when you need it',
      'Fast, smooth, and reliable',
      'Updates easily without app stores',
    ],
  },
  {
    icon: Zap,
    title: 'Digital Marketing',
    description: 'Get found and get customers',
    points: [
      'SEO that brings organic traffic',
      'Ad campaigns that actually convert',
      'Content that resonates with your audience',
      'Analytics that show real results',
    ],
  },
]

// Firefly Particle Component (Desktop Only)
function FireflyParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate 15 fireflies with random positions and animation delays
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-oat/40 blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
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
  )
}

// Floating Bubble Component (Mobile Only)
function FloatingBubble() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(163, 147, 130, 0.4) 0%, rgba(163, 147, 130, 0) 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-20%' })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll position for fade effect
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height
      
      // Calculate how much of the section is visible
      let progress = 0
      
      if (rect.top > windowHeight) {
        // Section is below viewport
        progress = 0
      } else if (rect.bottom < 0) {
        // Section is above viewport
        progress = 0
      } else if (rect.top > 0 && rect.bottom < windowHeight) {
        // Section is fully in viewport
        progress = 1
      } else if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // Section is larger than viewport
        progress = 1
      } else if (rect.top > 0) {
        // Section is entering from bottom
        progress = (windowHeight - rect.top) / (windowHeight * 0.3)
      } else {
        // Section is exiting from top
        progress = rect.bottom / (windowHeight * 0.3)
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Blur Overlay - Only shown on desktop when hovering */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="hidden md:block fixed inset-0 z-40 bg-charcoal/30"
            style={{ top: 0 }}
            onClick={() => setHoveredIndex(null)}
          />
        )}
      </AnimatePresence>

      <section 
        id="services" 
        ref={ref}
        className="relative py-32 px-6 overflow-hidden transition-all duration-700"
        style={{
          backgroundColor: `rgb(${35 + (216 * (1 - scrollProgress))}, ${35 + (212 * (1 - scrollProgress))}, ${35 + (209 * (1 - scrollProgress))})`,
          // Morphs from #232323 (charcoal) to #FBF7F4 (milk)
        }}
      >
        {/* Background Animations */}
        <FireflyParticles />
        <FloatingBubble />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
            style={{
              color: scrollProgress > 0.5 ? '#232323' : '#FBF7F4',
              transition: 'color 0.5s ease',
            }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl max-w-2xl mx-auto font-light opacity-80">
              Services that grow your business, one solution at a time.
            </p>
          </motion.div>

          {/* Services Grid - Desktop: 4 columns, Mobile: Dual View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    group relative cursor-pointer
                    ${isHovered ? 'md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center md:p-6' : ''}
                  `}
                  style={{
                    pointerEvents: hoveredIndex !== null && !isHovered ? 'none' : 'auto',
                  }}
                >
                  {/* Mobile: Dual View Layout */}
                  <div className="md:hidden bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Left: Icon + Title */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-oat/20 rounded-xl flex items-center justify-center">
                          <Icon className="text-oat" size={24} />
                        </div>
                      </div>
                      
                      {/* Right: Title */}
                      <div>
                        <h3 className="text-2xl font-display font-semibold text-milk mb-1">
                          {service.title}
                        </h3>
                        <p className="text-oat/80 text-sm font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Description Points */}
                    <div className="space-y-2 pl-16">
                      {service.points.map((point, i) => (
                        <p key={i} className="text-oat/90 text-sm leading-relaxed flex items-start">
                          <span className="text-taupe mr-2 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: Card with Hover Expansion */}
                  <motion.div
                    className={`
                      hidden md:block
                      ${isHovered 
                        ? 'bg-milk shadow-2xl scale-100' 
                        : 'bg-white/5 backdrop-blur-sm shadow-sm hover:bg-white/8'
                      }
                      p-8 rounded-2xl border transition-all duration-300
                      ${isHovered ? 'border-taupe/30' : 'border-white/10'}
                    `}
                    animate={isHovered ? { 
                      scale: 1.05,
                      y: -10,
                    } : {
                      scale: 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`
                        w-14 h-14 mb-6 rounded-xl flex items-center justify-center transition-colors duration-300
                        ${isHovered ? 'bg-charcoal' : 'bg-oat/20'}
                      `}
                      animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon 
                        className={isHovered ? 'text-milk' : 'text-oat'} 
                        size={28} 
                      />
                    </motion.div>

                    <h3 className={`
                      text-2xl font-display font-semibold mb-2 transition-colors duration-300
                      ${isHovered ? 'text-charcoal' : 'text-milk'}
                    `}>
                      {service.title}
                    </h3>
                    
                    <p className={`
                      leading-relaxed font-light mb-6 transition-colors duration-300
                      ${isHovered ? 'text-mocha' : 'text-oat/80'}
                    `}>
                      {service.description}
                    </p>

                    {/* Show points only on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 border-t border-taupe/20 pt-6"
                        >
                          {service.points.map((point, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-mocha text-sm leading-relaxed flex items-start"
                            >
                              <span className="text-taupe mr-2 flex-shrink-0 font-bold">•</span>
                              <span>{point}</span>
                            </motion.p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
