import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Globe, Database, Smartphone, Zap } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites',
    description: 'Turn browsers into buyers with a site that actually works',
    points: [
      'Loads fast so visitors stick around',
      'Looks great on phones, tablets, and computers',
      'Shows up on Google when people search',
      'Easy for you to update without calling us',
    ],
  },
  {
    icon: Database,
    title: 'Business Systems',
    description: 'Stop doing repetitive tasks and let software handle it',
    points: [
      'See everything important in one place',
      'Your tools talk to each other automatically',
      'Track what matters without spreadsheet headaches',
      'Grows with you as your business expands',
    ],
  },
  {
    icon: Smartphone,
    title: 'Apps',
    description: 'Put your business in your customers\' pockets',
    points: [
      'Simple to use, no learning curve',
      'Still works even without internet',
      'Runs smoothly, no freezing or crashing',
      'Roll out changes instantly to everyone',
    ],
  },
  {
    icon: Zap,
    title: 'Digital Marketing',
    description: 'Get more customers finding and choosing you',
    points: [
      'Rank higher on Google for free traffic',
      'Run ads that make money, not just spend it',
      'Posts and content people actually want to read',
      'See exactly what\'s working and what\'s not',
    ],
  },
]

// Firefly Particles Component (Desktop Only)
function FireflyParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-oat/30 blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
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
          background: 'radial-gradient(circle, rgba(163, 147, 130, 0.4) 0%, transparent 70%)',
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <>
      {/* Blur Overlay + Detail Card - Desktop Only */}
      <AnimatePresence>
        {hoveredService !== null && (
          <>
            {/* Blur Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block fixed inset-0 z-40 backdrop-blur-md bg-charcoal/40"
              onClick={() => setHoveredService(null)}
            />

            {/* Detail Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="hidden md:block fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="bg-milk rounded-3xl shadow-2xl p-10 max-w-lg w-full pointer-events-auto">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mb-6"
                >
                  {(() => {
                    const Icon = services[hoveredService].icon
                    return <Icon className="text-milk" size={32} />
                  })()}
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl font-display font-bold text-charcoal mb-3">
                  {services[hoveredService].title}
                </h3>

                {/* Description */}
                <p className="text-mocha text-lg mb-6 font-light">
                  {services[hoveredService].description}
                </p>

                {/* Points */}
                <div className="space-y-3 border-t border-taupe/20 pt-6">
                  {services[hoveredService].points.map((point, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="text-mocha leading-relaxed flex items-start"
                    >
                      <span className="text-taupe mr-3 flex-shrink-0 font-bold">•</span>
                      <span>{point}</span>
                    </motion.p>
                  ))}
                </div>

                {/* Close hint */}
                <p className="text-center text-taupe/60 text-sm mt-8 font-light">
                  Click anywhere to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section 
        id="services" 
        ref={ref}
        className="relative pt-24 pb-16 sm:py-32 px-4 sm:px-6 bg-charcoal overflow-hidden snap-section"
      >
        {/* Background Animations */}
        <FireflyParticles />
        <FloatingBubble />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-milk mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-oat/90 max-w-2xl mx-auto font-light">
              Services that grow your business, one solution at a time.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Mobile: Dual View Card */}
                  <div className="md:hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-oat/20 rounded-xl flex items-center justify-center">
                          <Icon className="text-oat" size={24} />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <div>
                        <h3 className="text-2xl font-display font-semibold text-milk mb-1">
                          {service.title}
                        </h3>
                        <p className="text-oat/80 text-sm font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="space-y-2 pl-12 sm:pl-16">
                      {service.points.map((point, i) => (
                        <p key={i} className="text-oat/90 text-sm leading-relaxed flex items-start">
                          <span className="text-taupe mr-2 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: Simple Hover Card */}
                  <motion.div
                    className="hidden md:block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 cursor-pointer group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setHoveredService(index)}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 bg-oat/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-oat/30 transition-colors">
                      <Icon className="text-oat group-hover:text-milk transition-colors" size={28} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-semibold text-milk mb-3">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-oat/80 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Click hint */}
                    <p className="text-taupe/60 text-sm mt-6 font-light group-hover:text-taupe transition-colors">
                      Click to learn more →
                    </p>
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