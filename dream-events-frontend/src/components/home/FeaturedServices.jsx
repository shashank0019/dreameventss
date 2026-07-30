import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { serviceApi } from '../../api/serviceApi'
import useFetch from '../../hooks/useFetch'
import SectionHeading from '../common/SectionHeading'
import LoadingSkeleton from '../common/LoadingSkeleton'

export default function FeaturedServices() {
  const { data: services, loading, error } = useFetch(serviceApi.getServices)

  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Bespoke Visual Styling" 
          subtitle="What We Offer" 
        />

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : error ? (
          <div className="text-center py-8 text-rose-500">
            Failed to load services. Please check connection and try again.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 3).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-brand-50 dark:bg-dark-900 border border-brand-100 dark:border-dark-700/50 shadow-sm hover:shadow-md transition-all flex flex-col h-[400px]"
              >
                {/* Service image with hover zoom */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-50/100 to-transparent dark:from-dark-900/100 bottom-0 h-12" />
                </div>

                {/* Service Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-normal text-dark-800 dark:text-brand-100">
                      {service.title}
                    </h3>
                    <p className="text-sm text-dark-600 dark:text-dark-300 font-light line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/services"
                      className="text-xs uppercase tracking-widest text-brand-500 dark:text-brand-300 font-semibold group-hover:text-brand-600 dark:group-hover:text-white transition-colors"
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs tracking-widest uppercase font-semibold transition-all shadow-md shadow-brand-500/20"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
