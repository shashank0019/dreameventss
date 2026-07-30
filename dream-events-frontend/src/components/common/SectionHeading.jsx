import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  const isLeft = align === 'left'

  return (
    <div className={`mb-12 flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.2em] font-medium text-brand-500 mb-2 block"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-serif text-dark-800 dark:text-brand-50 font-normal leading-tight"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-[2px] bg-brand-400 mt-4 rounded-full"
      />
    </div>
  )
}
