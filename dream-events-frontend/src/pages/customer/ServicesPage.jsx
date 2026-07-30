import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import useFetch from '../../hooks/useFetch'
import { serviceApi } from '../../api/serviceApi'

export default function ServicesPage() {
  const { data: services, loading, error } = useFetch(serviceApi.getServices)

  return (
    <>
      <SEO 
        title="Our Decoration Services" 
        description="Explore our visual event styling offerings, including wedding backdrops, customized table settings, fairy light installations, and organic balloon arches." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Bespoke Decoration Services" 
            subtitle="What We Customize" 
          />

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : error ? (
            <div className="text-center py-12 text-rose-500 font-light">
              Failed to load services. Please check connection and refresh.
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-dark-500 font-light">
              No services have been configured yet.
            </div>
          ) : (
            <div className="space-y-16">
              {services.map((service, i) => {
                const isEven = i % 2 === 0
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col lg:flex-row gap-12 items-center bg-white dark:bg-dark-800 p-8 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-sm ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Visual Card */}
                    <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden relative shadow-md">
                      <img
                        src={service.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Description Text */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <h3 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
                        {service.title}
                      </h3>
                      <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-base">
                        {service.description}
                      </p>
                      
                      <div className="pt-2 flex flex-wrap gap-4">
                        <Link
                          to={`/booking`}
                          className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs tracking-widest uppercase font-semibold transition-all shadow-md shadow-brand-500/15"
                        >
                          Book Custom Decor
                        </Link>
                        <Link
                          to="/contact"
                          className="px-6 py-3.5 bg-transparent border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-750 text-dark-800 dark:text-brand-300 rounded-xl text-xs tracking-widest uppercase font-semibold transition-all"
                        >
                          Ask a Question
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
