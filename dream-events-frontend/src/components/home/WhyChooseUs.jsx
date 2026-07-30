import React from 'react'
import { motion } from 'framer-motion'
import { HiSparkles, HiShieldCheck, HiOutlineClock, HiCurrencyDollar } from 'react-icons/hi2'
import SectionHeading from '../common/SectionHeading'

const BENEFITS = [
  {
    icon: HiSparkles,
    title: 'Bespoke Design Concepts',
    description: 'We believe every celebration should be one-of-a-kind. Whether it is a wedding, birthday milestone, corporate gathering, or any other custom event, we style it to reflect your personal vision.'
  },
  {
    icon: HiShieldCheck,
    title: 'End-to-End Execution',
    description: 'We handle everything from the initial layout design and venue styling to post-event teardown and cleanup, ensuring a completely stress-free experience.'
  },
  {
    icon: HiOutlineClock,
    title: 'Punctual Setup Execution',
    description: 'Our dedicated coordination team works seamlessly with venue managers to ensure that every detail of your event setup is completed flawlessly and on schedule.'
  },
  {
    icon: HiCurrencyDollar,
    title: 'No Hidden Charges',
    description: 'We provide completely transparent, upfront package pricing so you know exactly what is included in your billing with no unexpected surprises.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose Dream Events"
          subtitle="Our Standards"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-brand-50 dark:bg-dark-900 border border-brand-100 dark:border-dark-700/50 rounded-3xl text-center space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-100 dark:bg-dark-800 text-brand-500 dark:text-brand-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-dark-850 dark:text-brand-100 font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-sm text-dark-500 dark:text-dark-300 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
