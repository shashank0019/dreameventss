import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Events Styled' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '6+', label: 'Years Experience' },
  { value: '15+', label: 'Decoration Themes' }
]

export default function StatsCounter() {
  return (
    <section className="relative py-16 bg-brand-500 text-white overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-400 rounded-full filter blur-3xl opacity-30 -translate-x-12 -translate-y-12" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-600 rounded-full filter blur-3xl opacity-30 translate-x-12 translate-y-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="space-y-1"
            >
              <div className="font-serif text-4xl md:text-5xl font-semibold tracking-wide">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
