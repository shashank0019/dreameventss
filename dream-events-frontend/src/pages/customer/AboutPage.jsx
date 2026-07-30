import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import { HiSparkles, HiChatBubbleLeftRight, HiOutlineClipboardDocumentCheck, HiTruck } from 'react-icons/hi2'

const PROCESS_STEPS = [
  {
    icon: HiChatBubbleLeftRight,
    title: '1. Free Consultation',
    description: 'We connect to discuss your vision, event themes, floral choices, venue dimensions, and color schemes.'
  },
  {
    icon: HiOutlineClipboardDocumentCheck,
    title: '2. Bespoke Concept Design',
    description: 'We draft layout choices and curate packages to match your preferences, preparing clear pricing estimates.'
  },
  {
    icon: HiTruck,
    title: '3. Venue Coordination',
    description: 'We work closely with your chosen venue managers to handle load-in logistics, schedules, and floor rules.'
  },
  {
    icon: HiSparkles,
    title: '4. Magic Installation',
    description: 'Our team styles backdrops, tables, arches, and custom props, delivering a fairytale look on your event day.'
  }
]

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Our Stylists" 
        description="Learn about Dream Events, our visual design philosophy, and step-by-step process for styling flawless weddings, corporate events, and parties." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Main Story Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-500">
                Behind the Scenes
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-dark-850 dark:text-brand-50 font-normal leading-tight">
                Our Story & Vision
              </h1>
              <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-sm md:text-base">
                Dream Events was born out of a simple passion: transforming blank canvas event spaces into high-end visual showcases. We noticed that planning decorations can be stressful for host organizers, so we designed a streamlined booking experience backed by curated, high-quality styling.
              </p>
              <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-sm md:text-base">
                Today, our team specializes in styling and decorating weddings, birthdays, and other custom events. Whether you select a pre-arranged package or request an entirely custom design, we devote the same rigorous standards of elegance and timeliness to your event.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                alt="Stylists setting up floral arches"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Core Values / Work Process */}
          <div className="border-t border-brand-200/50 dark:border-dark-800/50 pt-20">
            <SectionHeading 
              title="Our Step-by-Step Process" 
              subtitle="How We Style" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-3xl space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-100 dark:bg-dark-900 text-brand-500 dark:text-brand-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg text-dark-850 dark:text-brand-100 font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm text-dark-500 dark:text-dark-300 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
