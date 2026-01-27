import { motion, useScroll, useTransform } from 'framer-motion'

import { useRef } from 'react'

const slides = [
  {
    number: '01',
    title: 'Discovery',
    summary: 'We meet you where you are, listen to every pain point, and map the opportunity.',
    detail: 'Stakeholder workshops, user interviews, and quick audits show us exactly where to focus first.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1200&fit=crop',
  },
  {
    number: '02',
    title: 'Strategy',
    summary: 'We turn messy notes into a crisp product plan with timelines, budgets, and KPIs.',
    detail: 'Roadmaps, wireframes, and technical architecture give everyone a clear north star.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop',
  },
  {
    number: '03',
    title: 'Build',
    summary: 'Designers and engineers pair up to ship delightful, fast, and reliable experiences.',
    detail: 'We work in tight sprints, demo constantly, and keep you looped in with live previews.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=1200&fit=crop',
  },
  {
    number: '04',
    title: 'Launch',
    summary: 'We train your team, monitor analytics, and fine tune the experience post‑launch.',
    detail: 'Rollouts, handover docs, and rapid iteration make sure momentum never dips.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&h=1200&fit=crop',
  },
]

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function ProcessSlide({ slide }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end center'] })
  const floatY = useParallax(scrollYProgress, 120)
  const textX = useTransform(scrollYProgress, [0, 0.7, 1], [80, 5, 0])

  return (
    <section
      ref={ref}
      className="relative h-[85vh] sm:h-screen snap-start flex items-center px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-row items-start gap-4 sm:gap-6 md:grid md:grid-cols-12 md:gap-10 md:items-center">
        <div className="relative w-32 sm:w-48 h-[220px] sm:h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/20 bg-charcoal/5 shadow-2xl md:w-full md:col-span-6">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover scale-[1.02] saturate-[1.1] contrast-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-transparent" />
          <motion.h2
            style={{ y: floatY }}
            className="absolute top-6 right-6 text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            {slide.number}
          </motion.h2>
        </div>

        <motion.div
          style={{ x: textX }}
          className="flex-1 md:col-span-6 md:self-start space-y-4 md:space-y-5 text-left"
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.6em] text-taupe">
            <span className="w-6 h-[1px] bg-taupe/60" />Meet the moment
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
            {slide.title}
          </h3>
          <p className="text-base sm:text-lg text-mocha font-light">
            {slide.summary}
          </p>
          <p className="text-sm sm:text-base text-mocha/90 font-light border-l-2 border-oat pl-4">
            {slide.detail}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Process() {
  const sectionRef = useRef(null)

  return (
    <section id="process" ref={sectionRef} className="relative bg-milk py-16 sm:py-24">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.6em] text-taupe"
        >
          How we work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-display font-bold text-charcoal mt-4"
        >
          A snapshot of our build process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-mocha font-light mt-4"
        >
          Scroll to follow the same beats we run with every launch—from first chat through ship day.
        </motion.p>
      </div>

      <div className="snap-y snap-mandatory space-y-12">
        {slides.map((slide) => (
          <ProcessSlide key={slide.number} slide={slide} />
        ))}
      </div>
    </section>
  )
}