import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-taupe rounded-full opacity-[0.03] blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
          {/* LEFT: F-Pattern Content (8 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Main Headline - Left Aligned */}
            <div className="space-y-4">
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-charcoal leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                We Build
              </motion.h1>
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-mocha leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Digital Products
              </motion.h1>
            </div>
            
            {/* Subheadline - Left Aligned */}
            <motion.p 
              className="text-xl md:text-2xl text-mocha leading-relaxed max-w-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Websites. Systems. Apps. Built with precision and designed for growth.
            </motion.p>

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

          {/* RIGHT: SOTD Score Box (4 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4 flex justify-end"
          >
            <motion.div 
              className="inline-flex flex-col bg-white border border-charcoal/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -4 }}
            >
              {/* Top Section */}
              <div className="bg-charcoal px-8 py-4 text-center border-b border-charcoal/5">
                <motion.p 
                  className="text-milk font-bold text-sm tracking-[0.2em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  SOTD
                </motion.p>
              </div>
              
              {/* Bottom Section */}
              <div className="px-12 py-8 text-center bg-gradient-to-b from-white to-oat/20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="flex items-baseline justify-center gap-1"
                >
                  <span className="text-6xl font-display font-bold text-charcoal tracking-tight">
                    7.87
                  </span>
                  <span className="text-2xl font-light text-mocha mb-1">
                    /10
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs text-taupe mt-3 font-light tracking-wide"
                >
                  Site of the Day
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-6 lg:left-0"
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
