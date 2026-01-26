import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
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
          <div className="hidden md:flex items-center space-x-6">
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
            
            {/* Phone Contact Section */}
            <div className="flex items-center space-x-3 pl-6 border-l border-charcoal/20">
              <a
                href="tel:0677020221"
                className="flex items-center space-x-2 text-mocha hover:text-charcoal transition-colors duration-200 group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">0677020221</span>
              </a>
              <a
                href="https://wa.me/0677020221"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} className="hover:scale-110 transition-transform" />
              </a>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-charcoal text-milk px-6 py-2.5 rounded-full hover:bg-mocha transition-all duration-200 font-medium text-sm shadow-md overflow-hidden border border-charcoal/5"
            >
              <span className="relative z-10">Let's Talk</span>
            </button>
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
            
            {/* Mobile Phone Contact Section */}
            <div className="flex items-center justify-between py-3 border-t border-charcoal/20">
              <a
                href="tel:0677020221"
                className="flex items-center space-x-2 text-mocha hover:text-charcoal transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone size={18} />
                <span className="font-medium text-sm">0677020221</span>
              </a>
              <a
                href="https://wa.me/0677020221"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
            
            <button
              onClick={() => {
                setIsModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
              className="block bg-charcoal text-milk px-6 py-2.5 rounded-full hover:bg-mocha transition-all duration-200 font-medium text-center shadow-md"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>

    {/* Modal */}
    {isModalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      >
        {/* Blur Background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-6 shadow-2xl border border-charcoal/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-mocha hover:text-charcoal transition-colors"
          >
            <X size={24} />
          </button>
          
          {/* Modal Content */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-display font-bold text-charcoal">
              Let's Talk
            </h3>
            <p className="text-mocha">
              Ready to start your next project? Get in touch with us and let's create something amazing together.
            </p>
            
            {/* Contact Options */}
            <div className="space-y-4">
              <a
                href="tel:0677020221"
                className="flex items-center justify-center space-x-3 text-charcoal hover:text-mocha transition-colors p-3 rounded-lg border border-charcoal/10 hover:border-charcoal/20"
              >
                <Phone size={20} />
                <span className="font-medium">0677020221</span>
              </a>
              
              <a
                href="https://wa.me/0677020221"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 text-green-600 hover:text-green-700 transition-colors p-3 rounded-lg border border-green-600/20 hover:border-green-600/30"
              >
                <MessageCircle size={20} />
                <span className="font-medium">Chat on WhatsApp</span>
              </a>
            </div>
            
            <p className="text-sm text-taupe">
              We'll get back to you within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    )}
    </>
  )
}