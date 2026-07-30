import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaRegCheckCircle } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { packageApi } from '../../api/packageApi'
import { contactApi } from '../../api/contactApi'
import useFetch from '../../hooks/useFetch'
import { formatPrice } from '../../utils/formatters'
import { PACKAGE_TIERS } from '../../utils/constants'
import { getWhatsAppLink, getBookingInquiryMessage } from '../../utils/whatsappHelper'

export default function PackageDetailsPage() {
  const { id } = useParams()
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [whatsappNumber, setWhatsappNumber] = useState('')

  // Fetch package details
  const { data: pkg, loading, error } = useFetch(
    () => packageApi.getPackageById(id),
    true
  )

  // Fetch related packages
  const { data: related, loading: relatedLoading } = useFetch(
    () => pkg ? packageApi.getRelatedPackages(id, 3) : Promise.resolve([]),
    !!pkg
  )

  // Fetch contact settings for whatsapp
  useEffect(() => {
    contactApi.getContactInfo()
      .then((data) => {
        if (data && data.whatsappNumber) setWhatsappNumber(data.whatsappNumber)
      })
      .catch(() => setWhatsappNumber('+15551234567'))
  }, [])

  // Reset active image index when ID changes
  useEffect(() => {
    setActiveImageIdx(0)
  }, [id])

  if (loading) {
    return (
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="h-[400px] bg-brand-100 dark:bg-dark-700 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-10 bg-brand-100 dark:bg-dark-700 rounded-full w-2/3" />
              <div className="h-6 bg-brand-100 dark:bg-dark-700 rounded-full w-1/3" />
              <div className="h-32 bg-brand-100 dark:bg-dark-700 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="py-24 text-center min-h-screen flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-serif text-rose-500 mb-4">Package Not Found</h2>
          <Link to="/packages" className="px-6 py-3 bg-brand-500 text-white rounded-xl">Back to Packages</Link>
        </div>
      </div>
    )
  }

  const tierBadge = PACKAGE_TIERS[pkg.tier] || { label: pkg.tier, color: 'bg-brand-100 text-brand-850' }
  const images = pkg.images && pkg.images.length > 0 
    ? pkg.images 
    : [{ imageUrl: '/images/about-philosophy.png', caption: 'Fallback' }]

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  const whatsappInquiryUrl = getWhatsAppLink(
    whatsappNumber, 
    getBookingInquiryMessage(pkg.name, 'Valued Client', new Date().toLocaleDateString())
  )

  return (
    <>
      <SEO 
        title={`${pkg.name} - Decor Package`} 
        description={pkg.description} 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Image Showcase Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIdx}
                    src={images[activeImageIdx].imageUrl}
                    alt={pkg.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Left/Right navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 hover:bg-white text-dark-800 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 hover:bg-white text-dark-800 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails grid */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIdx === idx ? 'border-brand-500 scale-95 shadow-sm' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img.imageUrl} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Metadata and Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${tierBadge.color}`}>
                  {tierBadge.label}
                </span>
                <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold block mt-2">
                  {pkg.category.name}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-dark-850 dark:text-brand-50 font-normal leading-tight">
                  {pkg.name}
                </h1>
              </div>

              <div className="text-2xl font-serif text-brand-500 border-b border-brand-200/50 dark:border-dark-800/50 pb-4">
                {formatPrice(pkg.price)}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-dark-800 dark:text-brand-200 text-sm uppercase tracking-wider">
                  Package Overview
                </h3>
                <p className="text-dark-600 dark:text-dark-300 font-light leading-relaxed text-sm md:text-base">
                  {pkg.description}
                </p>
              </div>

              {/* Actions Box */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-brand-200/50 dark:border-dark-800/50">
                <Link
                  to={`/booking?packageId=${pkg.id}`}
                  className="flex-1 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-center text-xs tracking-widest uppercase font-semibold transition-all shadow-md shadow-brand-500/10"
                >
                  Book Setup Now
                </Link>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-center text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Chat Inquiry
                </a>
              </div>
            </div>

          </div>

          {/* Related packages preview */}
          {related && related.length > 0 && (
            <div className="mt-20 border-t border-brand-200/50 dark:border-dark-800/50 pt-16">
              <h2 className="font-serif text-2xl md:text-3xl text-dark-850 dark:text-brand-100 mb-8 font-normal text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((relPkg) => {
                  const relCover = relPkg.images && relPkg.images.length > 0 
                    ? relPkg.images[0].imageUrl 
                    : '/images/about-philosophy.png'
                  return (
                    <Link
                      key={relPkg.id}
                      to={`/packages/${relPkg.id}`}
                      className="group flex flex-col bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <img src={relCover} alt={relPkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-serif text-base text-dark-800 dark:text-brand-100 font-medium group-hover:text-brand-500 transition-colors line-clamp-1">
                          {relPkg.name}
                        </h4>
                        <span className="text-sm font-serif text-brand-500">{formatPrice(relPkg.price)}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
