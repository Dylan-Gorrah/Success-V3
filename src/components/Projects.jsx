import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Smartphone } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    client: 'RetailCo',
    result: '150% sales increase',
    aesthetic: 'Clean minimalism with bold product photography. Crisp whites, subtle shadows, instant-loading.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=800&fit=crop', // Mobile screenshot
    link: 'https://example.com/retailco',
  },
  {
    id: 2,
    title: 'Business Management System',
    client: 'TechStart Inc',
    result: '20 hours saved weekly',
    aesthetic: 'Dark mode dashboard with data visualization. Premium glass cards, smooth animations, efficient.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop',
    link: 'https://example.com/techstart',
  },
  {
    id: 3,
    title: 'Mobile Fitness App',
    client: 'FitLife',
    result: '50K+ downloads',
    aesthetic: 'Energetic gradients with motivational UI. Bright colors, large typography, gamified progress.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop',
    link: 'https://example.com/fitlife',
  },
  {
    id: 4,
    title: 'Real Estate Portal',
    client: 'PropertyHub',
    result: 'Delivered on time',
    aesthetic: 'Luxury aesthetic with elegant serif fonts. Spacious layouts, high-res imagery, sophisticated.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=800&fit=crop',
    link: 'https://example.com/propertyhub',
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)
  const hasEnteredView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isSectionVisible = useInView(sectionRef, { amount: 0.4 })

  useEffect(() => {
    if (!isSectionVisible || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isSectionVisible, isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }
  
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  const getProject = (offset) => {
    return projects[(currentIndex + offset + projects.length) % projects.length]
  }

  const currentProject = projects[currentIndex]
  const prevProject = getProject(-1)
  const nextProject = getProject(1)

  return (
    <section
      id="projects"
      className="py-14 sm:py-16 md:py-20 px-4 md:px-6 bg-oat/30 snap-section"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasEnteredView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-charcoal mb-3 md:mb-5 tracking-tight">
            Selected Work
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-mocha max-w-2xl mx-auto font-light">
            Real projects. Real results. Click to view live.
          </p>
        </motion.div>

        {/* Desktop: Carousel + Phone Mockup Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-center">
          {/* Left: Carousel (Smaller, 8 columns) */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              {/* Previous Preview */}
              <motion.a
                href={prevProject.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsAutoPlaying(false)}
                onMouseEnter={() => setHoveredCard('prev')}
                onMouseLeave={() => setHoveredCard(null)}
                className="w-32 flex-shrink-0 cursor-pointer group"
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ 
                  opacity: hoveredCard === 'prev' ? 1 : 0.4,
                  scale: hoveredCard === 'prev' ? 1 : 0.9,
                  x: hoveredCard === 'prev' ? -8 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-24">
                    <img
                      src={prevProject.image}
                      alt={prevProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === 'prev' ? 1 : 0 }}
                      className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ExternalLink size={14} className="text-milk" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>

              {/* Main Card */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.a
                    key={currentIndex}
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsAutoPlaying(false)}
                    onMouseEnter={() => setHoveredCard('current')}
                    onMouseLeave={() => setHoveredCard(null)}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="block bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: hoveredCard === 'current' ? 1 : 0, y: hoveredCard === 'current' ? 0 : 20 }}
                        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="inline-flex items-center gap-2 bg-milk text-charcoal px-5 py-2.5 rounded-full font-semibold shadow-xl">
                          <span>View Live</span>
                          <ArrowRight size={18} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-xs text-taupe mb-1 font-semibold tracking-wider uppercase">
                        {currentProject.client}
                      </p>
                      <h3 className="text-2xl font-display font-bold text-charcoal mb-2 group-hover:text-mocha transition-colors">
                        {currentProject.title}
                      </h3>
                      <p className="text-sm text-mocha font-light mb-3">
                        {currentProject.result}
                      </p>
                      {/* Aesthetic Description */}
                      <p className="text-xs text-taupe/80 leading-relaxed italic border-l-2 border-oat pl-3">
                        {currentProject.aesthetic}
                      </p>
                    </div>
                  </motion.a>
                </AnimatePresence>
              </div>

              {/* Next Preview */}
              <motion.a
                href={nextProject.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsAutoPlaying(false)}
                onMouseEnter={() => setHoveredCard('next')}
                onMouseLeave={() => setHoveredCard(null)}
                className="w-32 flex-shrink-0 cursor-pointer group"
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ 
                  opacity: hoveredCard === 'next' ? 1 : 0.4,
                  scale: hoveredCard === 'next' ? 1 : 0.9,
                  x: hoveredCard === 'next' ? 8 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-24">
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === 'next' ? 1 : 0 }}
                      className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ExternalLink size={14} className="text-milk" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            </div>
            
            {/* Desktop Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-6 bg-charcoal' : 'w-2 bg-taupe'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Right: Phone Mockup (4 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasEnteredView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative mx-auto w-56">
                {/* Phone Bezel */}
                <div className="relative bg-charcoal rounded-[3rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-charcoal rounded-b-3xl z-10"></div>
                  
                  {/* Screen */}
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={currentProject.mobileImage}
                        alt={`${currentProject.title} mobile`}
                        className="w-full h-full object-cover object-top"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* Phone Label */}
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 text-sm text-mocha">
                    <Smartphone size={16} />
                    <span className="font-light">Mobile Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet: Compact Carousel */}
        <div className="lg:hidden">
          <div className="max-w-md mx-auto space-y-4">
            <AnimatePresence mode="wait">
              <motion.a
                key={currentIndex}
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <p className="text-[11px] text-taupe font-semibold uppercase tracking-[0.3em]">
                    {currentProject.client}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-charcoal">
                    {currentProject.title}
                  </h3>
                  <p className="text-base text-mocha font-light">
                    {currentProject.result}
                  </p>
                  <p className="text-sm text-taupe/80 leading-relaxed italic">
                    {currentProject.aesthetic}
                  </p>
                </div>
              </motion.a>
            </AnimatePresence>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-6 bg-charcoal' : 'w-2 bg-taupe'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
            <p className="text-center text-xs text-mocha/70 mt-3">
              Swipe the card or use the arrows
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}