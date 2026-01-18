import { motion } from 'framer-motion'

const marqueeItems = [
  'Trusted by 50+ Businesses',
  'From R600',
  'Flexible Pricing',
  'Business Cards',
  'QR Codes',
  'Get More Clients',
  'Premium Marketing',
  'Fast Delivery',
  'Premium Quality',
  'SEO Optimized',
  'Mobile-First Design',
  'Expert Support',
]

export default function ScrollingMarquee() {
  // Duplicate items for seamless loop
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-charcoal text-milk overflow-hidden border-b border-white/10">
      <div className="relative flex">
        <motion.div
          className="flex gap-12 py-3 px-6 whitespace-nowrap"
          animate={{
            x: [0, -50 * marqueeItems.length - 12 * marqueeItems.length], // Calculate total width
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3"
            >
              <span className="text-sm font-light tracking-wide">
                {item}
              </span>
              {/* Separator Dot */}
              <span className="w-1 h-1 bg-milk/30 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
