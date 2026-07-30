import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { packageApi } from '../../api/packageApi'
import useFetch from '../../hooks/useFetch'
import SectionHeading from '../common/SectionHeading'
import LoadingSkeleton from '../common/LoadingSkeleton'
import PackageImageSlider from '../packages/PackageImageSlider'
import { formatPrice } from '../../utils/formatters'
import { PACKAGE_TIERS } from '../../utils/constants'

export default function FeaturedPackages() {
  const { data, loading, error } = useFetch(() => packageApi.getPackages({ size: 3, sort: 'newest' }))

  const packages = data?.content || []

  return (
    <section className="py-20 bg-brand-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Premium Decor Packages" 
          subtitle="Curated Styling Plans" 
        />

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : error ? (
          <div className="text-center py-8 text-rose-500">
            Failed to load packages. Please check connection and try again.
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-8 text-dark-500">
            No packages available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => {
              const tierBadge = PACKAGE_TIERS[pkg.tier] || { label: pkg.tier, color: 'bg-brand-100 text-brand-800' }
              const coverImg = pkg.images && pkg.images.length > 0 
                ? pkg.images[0].imageUrl 
                : '/images/about-philosophy.png'

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-[450px]"
                >
                  {/* Image with Tier Badge */}
                  <div className="h-48 overflow-hidden relative">
                    <PackageImageSlider images={pkg.images} packageName={pkg.name} />
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${tierBadge.color} z-10`}>
                      {tierBadge.label}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs text-brand-500 dark:text-brand-300 font-semibold tracking-wider uppercase block">
                        {pkg.category.name}
                      </span>
                      <h3 className="font-serif text-xl text-dark-800 dark:text-brand-100 font-normal line-clamp-1">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-300 font-light line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-6 border-t border-brand-100 dark:border-dark-700/50 pt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-dark-400">Starting From</span>
                        <span className="text-xl font-serif text-brand-500 font-normal">{formatPrice(pkg.price)}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="px-4 py-2 border border-brand-200 dark:border-dark-700 hover:bg-brand-50 dark:hover:bg-dark-750 text-xs font-semibold tracking-wider rounded-xl uppercase transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/booking?packageId=${pkg.id}`}
                          className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold tracking-wider rounded-xl uppercase transition-colors shadow-sm shadow-brand-500/10"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="px-8 py-3.5 bg-transparent border border-brand-400 dark:border-brand-500 hover:bg-brand-500 hover:text-white dark:text-brand-300 dark:hover:text-white rounded-xl text-xs tracking-widest uppercase font-semibold transition-all"
          >
            Browse All Packages
          </Link>
        </div>
      </div>
    </section>
  )
}
