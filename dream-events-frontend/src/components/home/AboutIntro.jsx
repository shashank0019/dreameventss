import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../common/SectionHeading'

export default function AboutIntro() {
  return (
    <section className="py-20 bg-brand-50 dark:bg-dark-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md h-[450px]">
              {/* Back Decorative card */}
              <div className="absolute inset-0 border border-brand-300 dark:border-brand-700/30 rounded-3xl translate-x-4 translate-y-4 z-0" />
              {/* Main Image */}
              <img
                src="/images/about-philosophy.png"
                alt="Luxury wedding setup decoration"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl z-10 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <SectionHeading 
              title="Transforming Spaces, Creating Memories" 
              subtitle="Our Philosophy" 
              align="left" 
            />
            
            <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-base">
              At <strong>Dream Events</strong>, we believe every celebration tells a unique story. From intimate birthday parties to grand weddings, our goal is to style backdrops, tables, and ambient setups that reflect your personality and style.
            </p>
            
            <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-base">
              We handle every detail from design concept to installation, blending romantic floral arrangements, modern structures, and warm lighting setups to captivate your guests and form a premium atmosphere.
            </p>

            <div className="pt-4 flex gap-4">
              <Link
                to="/about"
                className="px-6 py-3.5 bg-brand-100 hover:bg-brand-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-brand-600 dark:text-brand-300 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all"
              >
                Read Our Story
              </Link>
              <Link
                to="/gallery"
                className="px-6 py-3.5 bg-transparent text-dark-800 dark:text-brand-300 border border-brand-200 dark:border-dark-700 hover:bg-brand-50 dark:hover:bg-dark-800 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
