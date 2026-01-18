import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery',
    description: 'We learn about your goals, audience, and vision.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Strategy',
    description: 'We plan the perfect solution tailored to your needs.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Build',
    description: 'We bring your vision to life with expert craftsmanship.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch',
    description: 'We deploy and support your success from day one.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="py-32 px-6 bg-milk" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-charcoal mb-6 tracking-tight">
            How We Work
          </h2>
          <p className="text-xl text-mocha max-w-2xl mx-auto font-light">
            From concept to launch, we guide you every step.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-taupe/40 to-transparent z-0" />
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Large Number Background */}
                  <div className="text-6xl font-display font-bold text-oat/30 mb-4 leading-none">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-oat flex items-center justify-center mb-6 group-hover:bg-taupe transition-colors duration-300"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-mocha" size={28} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-mocha leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}