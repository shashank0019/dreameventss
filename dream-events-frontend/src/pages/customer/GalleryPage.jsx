import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import ImagePopupModal from '../../components/common/ImagePopupModal'
import { galleryApi } from '../../api/galleryApi'
import { categoryApi } from '../../api/categoryApi'
import useFetch from '../../hooks/useFetch'
import { HiPlus } from 'react-icons/hi2'

export default function GalleryPage() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeZoomImg, setActiveZoomImg] = useState(null)

  // Fetch categories
  useEffect(() => {
    categoryApi.getCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

  // Fetch gallery items based on category
  const { data: items, loading, error, execute } = useFetch(
    () => galleryApi.getGallery(selectedCategory),
    true
  )

  // Refetch when category changes
  useEffect(() => {
    execute()
  }, [selectedCategory, execute])

  return (
    <>
      <SEO 
        title="Decoration Inspiration Gallery" 
        description="Browse high-resolution portfolio images of wedding backdrops, flower setups, and table stylings configured by Dream Events." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading 
            title="Inspiration Showcase" 
            subtitle="Our Work Portfolio" 
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 border-b border-brand-200/50 dark:border-dark-800/50 pb-6">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === ''
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700 text-dark-600 dark:text-dark-300 hover:bg-brand-105'
              }`}
            >
              All Designs
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white dark:bg-dark-800 border border-brand-200 dark:border-dark-700 text-dark-600 dark:text-dark-300 hover:bg-brand-105'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-brand-100 dark:bg-dark-700 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-rose-500 font-light">
              Failed to load gallery items. Please refresh and try again.
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-dark-500 font-light">
              No portfolio photos found in this category.
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveZoomImg(item)}
                    className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-sm hover:shadow-lg cursor-pointer bg-white dark:bg-dark-800 border border-brand-100/50 dark:border-dark-700/50"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || 'Decoration showcase'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Overlay Details */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 text-white">
                      <div className="absolute top-6 right-6 p-2 bg-brand-500 text-white rounded-full scale-75 group-hover:scale-100 transition-transform">
                        <HiPlus className="w-5 h-5" />
                      </div>
                      
                      <span className="text-[10px] uppercase tracking-widest text-brand-300 font-semibold mb-1">
                        {item.category?.name}
                      </span>
                      <p className="font-serif text-base font-light tracking-wide line-clamp-2">
                        {item.caption || 'Exquisite setup design'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lightbox Modal Popup */}
          <ImagePopupModal
            isOpen={!!activeZoomImg}
            imageUrl={activeZoomImg?.imageUrl}
            caption={activeZoomImg?.caption}
            onClose={() => setActiveZoomImg(null)}
          />

        </div>
      </div>
    </>
  )
}
