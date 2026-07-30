import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Curved background panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-gradient-to-r from-brand-900 via-brand-800 to-dark-900 text-white p-8 md:p-16 text-center shadow-xl overflow-hidden"
        >
          {/* Decorative blur spheres */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 rounded-full filter blur-3xl -translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full filter blur-3xl translate-x-12 translate-y-12" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-400 font-semibold">
              Bring Your Vision to Life
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
              Ready to Design Your Dream Celebration?
            </h2>
            <p className="text-brand-100 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
              Connect with our decoration specialists to obtain a custom styling quote or request one of our pre-configured packages.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold tracking-wider rounded-xl uppercase text-xs transition-all shadow-md shadow-brand-500/20"
              >
                Inquire About Dates
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border border-white/20 hover:border-white hover:bg-white/10 text-white font-semibold tracking-wider rounded-xl uppercase text-xs transition-all"
              >
                Send Us a Message
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
