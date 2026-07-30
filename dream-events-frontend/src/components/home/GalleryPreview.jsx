import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { galleryApi } from '../../api/galleryApi'
import useFetch from '../../hooks/useFetch'
import SectionHeading from '../common/SectionHeading'
import LoadingSkeleton from '../common/LoadingSkeleton'

export default function GalleryPreview() {
  const { data: items, loading, error } = useFetch(() => galleryApi.getGallery())

  const previewItems = items?.slice(0, 6) || []

  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Captured Moments" 
          subtitle="Our Decoration Portfolio" 
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-brand-100 dark:bg-dark-700 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-rose-500">
            Failed to load gallery preview. Please check connection.
          </div>
        ) : previewItems.length === 0 ? (
          <div className="text-center py-8 text-dark-500">
            No gallery images seeded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || 'Gallery preview'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-brand-300 font-semibold mb-1">
                    {item.category?.name}
                  </span>
                  <p className="font-serif text-sm font-light leading-snug line-clamp-2">
                    {item.caption || 'Bespoke design theme'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs tracking-widest uppercase font-semibold transition-all shadow-md shadow-brand-500/20"
          >
            Explore Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
