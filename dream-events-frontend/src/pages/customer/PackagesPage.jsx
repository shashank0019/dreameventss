import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import Pagination from '../../components/common/Pagination'
import PackageImageSlider from '../../components/packages/PackageImageSlider'
import { packageApi } from '../../api/packageApi'
import { categoryApi } from '../../api/categoryApi'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { formatPrice } from '../../utils/formatters'
import { PACKAGE_TIERS } from '../../utils/constants'
import { HiMagnifyingGlass, HiAdjustmentsHorizontal } from 'react-icons/hi2'

export default function PackagesPage() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const debouncedSearch = useDebounce(search, 400)
  
  const { page, size, setPage, goToPage } = usePagination(0, 6)
  const [packages, setPackages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch categories once
  useEffect(() => {
    categoryApi.getCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

  // Fetch packages on filters changes
  useEffect(() => {
    setLoading(true)
    setError(null)
    
    const params = {
      page,
      size,
      sort,
      search: debouncedSearch || undefined,
      category: selectedCategory || undefined
    }

    packageApi.getPackages(params)
      .then((data) => {
        setPackages(data.content || [])
        setTotalPages(data.totalPages || 0)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, size, sort, debouncedSearch, selectedCategory])

  // Reset page when category or search changes
  useEffect(() => {
    goToPage(0)
  }, [selectedCategory, debouncedSearch])

  return (
    <>
      <SEO 
        title="Event Decoration Packages" 
        description="Choose from our Silver, Gold, Bronze, and Platinum decoration packages tailored for weddings, birthday parties, and corporate affairs." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading 
            title="Choose a Decoration Package" 
            subtitle="Curated Packages Tiers" 
          />

          {/* Filters Bar */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700/60 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm shadow-sm"
                />
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
              </div>

              {/* Sorting & Adjustments */}
              <div className="flex gap-3 w-full md:w-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full md:w-48 px-4 py-3 rounded-2xl bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700/60 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm shadow-sm"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Alphabetical: A-Z</option>
                </select>
              </div>

            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-brand-200/50 dark:border-dark-800/50 pb-4">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === ''
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700 text-dark-600 dark:text-dark-300 hover:bg-brand-100 dark:hover:bg-dark-750'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700 text-dark-600 dark:text-dark-300 hover:bg-brand-100 dark:hover:bg-dark-750'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Listings */}
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <div className="text-center py-12 text-rose-500">
              Failed to load packages. Please try again.
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12 text-dark-500 font-light">
              No packages match your search criteria. Try adjusting your filters.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, i) => {
                  const tierBadge = PACKAGE_TIERS[pkg.tier] || { label: pkg.tier, color: 'bg-brand-100 text-brand-850' }
                  const coverImg = pkg.images && pkg.images.length > 0 
                    ? pkg.images[0].imageUrl 
                    : '/images/about-philosophy.png'

                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group flex flex-col bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-[450px]"
                    >
                      {/* Image */}
                      <div className="h-48 overflow-hidden relative">
                        <PackageImageSlider images={pkg.images} packageName={pkg.name} />
                        <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${tierBadge.color} z-10`}>
                          {tierBadge.label}
                        </span>
                      </div>

                      {/* Info body */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-xs text-brand-500 dark:text-brand-300 font-semibold tracking-wider uppercase block">
                            {pkg.category.name}
                          </span>
                          <h3 className="font-serif text-xl text-dark-850 dark:text-brand-100 font-normal line-clamp-1">
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
                              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold tracking-wider rounded-xl uppercase transition-colors shadow-sm"
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

              {/* Paged Control numbers */}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}

        </div>
      </div>
    </>
  )
}
