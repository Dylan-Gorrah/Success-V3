import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen flex items-center px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-20 snap-section">
      {/* Floating Price Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-32 md:top-32 right-6 sm:right-10 md:right-24 lg:right-28 z-10 w-32 sm:w-40 md:w-48"
      >
        <div className="inline-flex flex-col bg-white border border-charcoal rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-charcoal px-3 py-1.5 text-center border-b border-charcoal/5">
            <p className="text-milk font-bold text-[11px] tracking-[0.25em] uppercase">From</p>
          </div>
          <div className="px-3.5 py-3 text-center bg-gradient-to-b from-white to-oat/20">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-display font-bold text-charcoal tracking-tight">R600</span>
            </div>
            <p className="text-[11px] text-taupe mt-3 font-light tracking-[0.25em]">Contact Now!</p>
          </div>
        </div>
      </motion.div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-taupe rounded-full opacity-[0.03] blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: F-Pattern Content (12 columns - full width now) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Main Headline - Left Aligned */}
              <div className="space-y-4 max-w-3xl pr-28 sm:pr-0">
                <motion.h1 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-charcoal leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  We Build
                </motion.h1>
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-mocha leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Digital Products
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl text-mocha leading-relaxed max-w-xl font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Websites. Systems. Apps. Built with precision and designed for growth.
                </motion.p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-charcoal text-milk px-10 py-5 rounded-full font-semibold text-lg hover:bg-mocha transition-all duration-300 group shadow-lg border border-charcoal/10"
              >
                Start a Project
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={22} strokeWidth={2.5} />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 10 }}
          transition={{ delay: 1.2 }}
          className="hidden md:block absolute left-1/2 top-[450px] transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            className="w-[1px] h-20 bg-gradient-to-b from-transparent via-taupe/40 to-transparent mx-auto mb-3"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-5 h-8 border border-taupe/40 rounded-full flex items-start justify-center p-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 bg-mocha rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}