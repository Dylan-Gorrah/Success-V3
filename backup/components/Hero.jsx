import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-taupe rounded-full opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content - Centered & Minimal */}
      <div className="relative max-w-5xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline - Bold & Direct */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-charcoal leading-[0.9] tracking-tight">
            We Build
            <br />
            <span className="text-mocha">Digital Products</span>
          </h1>
          
          {/* Subheadline - Clean & Concise */}
          <p className="text-xl md:text-2xl text-mocha leading-relaxed max-w-2xl mx-auto font-light">
            Websites. Systems. Apps. Built with precision and designed for growth.
          </p>
        </motion.div>

        {/* Single CTA - Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center bg-charcoal text-milk px-10 py-5 rounded-full font-semibold text-lg hover:bg-mocha transition-colors duration-300 group shadow-2xl"
          >
            Start a Project
            <motion.div
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={24} />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-20"
        >
          <motion.div
            className="w-6 h-10 border-2 border-taupe rounded-full mx-auto flex items-start justify-center p-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-2 bg-mocha rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}