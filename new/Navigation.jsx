import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth transition values based on scroll
  const isScrolled = scrollY > 20
  const blurAmount = Math.min(20 + (scrollY / 10), 40)
  const bgOpacity = Math.min(0.4 + (scrollY / 1000), 0.70)

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Positioned below the marquee (marquee is 36px tall)
      className="fixed top-[36px] left-0 right-0 z-50"
      style={{
        background: `rgba(251, 247, 244, ${bgOpacity})`,
        backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
        borderBottom: `1px solid rgba(229, 222, 210, ${Math.min(scrollY / 200, 0.6)})`,
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(35, 35, 35, 0.08)' 
          : '0 4px 16px rgba(35, 35, 35, 0.04)',
        transition: 'box-shadow 0.3s ease, border-bottom 0.3s ease',
      }}
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)',
          mixBlendMode: 'overlay',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-display font-bold text-charcoal tracking-tight relative"
            whileHover={{ scale: 1.05 }}
          >
            STUDIO
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-mocha hover:text-charcoal transition-colors duration-200 font-medium text-sm relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="relative bg-charcoal text-milk px-6 py-2.5 rounded-full hover:bg-mocha transition-all duration-200 font-medium text-sm shadow-md overflow-hidden border border-charcoal/5"
            >
              <span className="relative z-10">Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-charcoal relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 space-y-4 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-mocha hover:text-charcoal transition-colors duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block bg-charcoal text-milk px-6 py-2.5 rounded-full hover:bg-mocha transition-all duration-200 font-medium text-center shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
