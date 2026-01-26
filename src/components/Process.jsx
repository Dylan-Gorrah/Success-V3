import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery',
    description: 'We learn about your goals, audience, and vision.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Strategy',
    description: 'We plan the perfect solution tailored to your needs.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Build',
    description: 'We bring your vision to life with expert craftsmanship.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch',
    description: 'We deploy and support your success from day one.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
  },
]

function ProcessStep({ step, index, isEven }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image animations based on scroll
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isEven ? [100, 0, 0, -100] : [-100, 0, 0, 100]
  )
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  // Text animations
  const textX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isEven ? [-50, 0, 0, 50] : [50, 0, 0, -50]
  )
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const Icon = step.icon

  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-20 snap-section">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
          {/* Image Side */}
          <motion.div
            style={{
              x: imageX,
              opacity: imageOpacity,
              scale: imageScale,
            }}
            className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-charcoal/5">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            style={{
              x: textX,
              opacity: textOpacity,
            }}
            className={`space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
          >
            {/* Number */}
            <div className="text-8xl md:text-9xl font-display font-bold text-oat/20 leading-none">
              {step.number}
            </div>

            {/* Icon */}
            <motion.div
              className="w-16 h-16 rounded-xl bg-oat/30 flex items-center justify-center border border-charcoal/5"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="text-mocha" size={32} strokeWidth={1.5} />
            </motion.div>

            {/* Title */}
            <h3 className="text-5xl md:text-6xl font-display font-bold text-charcoal">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-xl text-mocha leading-relaxed font-light max-w-md">
              {step.description}
            </p>

            {/* Decorative Line */}
            <motion.div
              className="w-20 h-[2px] bg-charcoal/20"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="relative bg-milk snap-section">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-display font-bold text-charcoal mb-6 tracking-tight">
            How We Work
          </h2>
          <p className="text-xl text-mocha max-w-2xl mx-auto font-light">
            From concept to launch, we guide you every step.
          </p>
        </motion.div>
      </div>

      {/* Process Steps */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <ProcessStep 
            key={index} 
            step={step} 
            index={index} 
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  )
}