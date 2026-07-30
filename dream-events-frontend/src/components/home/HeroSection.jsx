import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-dark-900 text-white overflow-hidden pt-20">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-pulse-subtle"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 dark:from-dark-900/90 dark:via-dark-900/70 z-0" />

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-brand-400 font-semibold block"
        >
          Premium Event Decoration & Styling
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-wide"
        >
          Crafting Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 font-normal">
            Dream Celebrations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-dark-200 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          From luxury wedding backdrops and romantic lighting designs to themed birthday stylings, we transform venues into extraordinary experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Link
            to="/packages"
            className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold tracking-widest uppercase transition-all shadow-lg shadow-brand-500/20 text-center"
          >
            Explore Packages
          </Link>
          <Link
            to="/booking"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white rounded-xl text-sm font-semibold tracking-widest uppercase transition-all text-center"
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>

      {/* Decorative Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-50 to-transparent dark:from-dark-900 z-10 pointer-events-none" />
    </section>
  )
}
