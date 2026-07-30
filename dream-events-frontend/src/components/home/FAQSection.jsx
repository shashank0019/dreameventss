import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiMinus } from 'react-icons/hi2'
import SectionHeading from '../common/SectionHeading'

const FAQS = [
  {
    question: 'How far in advance should I book my decoration setup?',
    answer: 'We recommend booking at least 3 to 6 months in advance, especially during the wedding season (spring/summer). This ensures we can lock in materials and schedule dedicated stylists for your event.'
  },
  {
    question: 'Do you supply fresh flowers or high-quality silk alternatives?',
    answer: 'We supply both! You can customize packages to incorporate fresh seasonal flowers, premium realistic artificial silk flowers, or a hybrid layout that maintains a luxury look while managing budget considerations.'
  },
  {
    question: 'Can I request customizations for a pre-configured pricing package?',
    answer: 'Absolutely! Our pre-configured packages (Bronze, Silver, Gold, Platinum) serve as templates. During consultation, we can swap elements, add backdrops, or scale centerpieces to perfectly fit your venue.'
  },
  {
    question: 'Do you handle the venue setup and the teardown post-event?',
    answer: 'Yes! Punctual setup styling and late-night teardown removal are included in all packages. We handle the labor and logistics directly so you can enjoy your event without stress.'
  }
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="FAQ" 
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx
            return (
              <div 
                key={idx}
                className="border border-brand-100 dark:border-dark-700/50 rounded-2xl overflow-hidden bg-brand-50 dark:bg-dark-900 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-serif text-base md:text-lg text-dark-850 dark:text-brand-100 font-medium">
                    {faq.question}
                  </span>
                  <span className="ml-4 flex-shrink-0 text-brand-500">
                    {isOpen ? <HiMinus className="w-5 h-5" /> : <HiPlus className="w-5 h-5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm md:text-base font-light text-dark-600 dark:text-dark-300 leading-relaxed border-t border-brand-100/50 dark:border-dark-800/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
