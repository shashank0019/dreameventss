import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'
import { testimonialApi } from '../../api/testimonialApi'
import useFetch from '../../hooks/useFetch'
import SectionHeading from '../common/SectionHeading'

export default function TestimonialsSlider() {
  const { data: testimonials, loading, error } = useFetch(testimonialApi.getTestimonials)
  const [index, setIndex] = useState(0)

  const items = testimonials || []

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse h-32 max-w-xl mx-auto bg-white rounded-3xl" />
      </div>
    )
  }

  if (error || items.length === 0) return null

  const current = items[index]

  return (
    <section className="py-20 bg-brand-50 dark:bg-dark-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <SectionHeading 
          title="Reviews from Happy Clients" 
          subtitle="Love Letters" 
        />

        <div className="relative glass-card p-8 md:p-12 rounded-3xl space-y-6 max-w-2xl mx-auto min-h-[250px] flex flex-col justify-center">
          <FaQuoteLeft className="w-10 h-10 text-brand-300 mx-auto opacity-40" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-dark-700 dark:text-dark-200 font-serif italic text-base md:text-lg font-light leading-relaxed">
                "{current.reviewText}"
              </p>

              <div className="flex justify-center gap-1 text-yellow-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
              </div>

              <div className="pt-2">
                <h4 className="font-serif text-brand-600 dark:text-brand-300 font-semibold text-sm">
                  {current.clientName}
                </h4>
                {current.eventType && (
                  <span className="text-[10px] uppercase tracking-widest text-dark-400 block mt-1">
                    {current.eventType}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white dark:bg-dark-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white rounded-xl shadow-sm text-brand-500 dark:text-brand-300 border border-brand-100 dark:border-dark-700/50 transition-colors"
              aria-label="Previous Testimonial"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white dark:bg-dark-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white rounded-xl shadow-sm text-brand-500 dark:text-brand-300 border border-brand-100 dark:border-dark-700/50 transition-colors"
              aria-label="Next Testimonial"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
