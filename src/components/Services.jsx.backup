import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Database, Smartphone, Zap } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites',
    description: 'Fast, responsive, and built to convert.',
  },
  {
    icon: Database,
    title: 'Systems',
    description: 'Custom solutions that scale with your business.',
  },
  {
    icon: Smartphone,
    title: 'Apps',
    description: 'Intuitive mobile experiences users love.',
  },
  {
    icon: Zap,
    title: 'Emerging Tech',
    description: 'AI, automation, and cutting-edge solutions.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-32 px-6 bg-milk" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-charcoal mb-6 tracking-tight">
            What We Do
          </h2>
          <p className="text-xl text-mocha max-w-2xl mx-auto font-light">
            Four core offerings. One goal: Transform your business.
          </p>
        </motion.div>

        {/* Services Grid - Clean 4-Column */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 mb-6 bg-oat rounded-xl flex items-center justify-center group-hover:bg-taupe transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-mocha" size={28} />
                </motion.div>

                <h3 className="text-2xl font-display font-semibold text-charcoal mb-3">
                  {service.title}
                </h3>
                
                <p className="text-mocha leading-relaxed font-light">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
