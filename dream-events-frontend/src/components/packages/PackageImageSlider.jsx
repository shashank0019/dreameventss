import React, { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

export default function PackageImageSlider({ images, packageName }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const fallbackUrl = '/images/about-philosophy.png'

  if (!images || images.length === 0) {
    return (
      <img
        src={fallbackUrl}
        alt={packageName}
        className="w-full h-full object-cover"
      />
    )
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0].imageUrl}
        alt={packageName}
        className="w-full h-full object-cover"
      />
    )
  }

  const handlePrev = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-full group/slider overflow-hidden">
      {/* Current Image */}
      <img
        src={images[currentIdx].imageUrl}
        alt={`${packageName} - Slide ${currentIdx + 1}`}
        className="w-full h-full object-cover transition-all duration-300"
      />

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-opacity opacity-0 group-hover/slider:opacity-100 focus:outline-none z-10"
        aria-label="Previous image"
      >
        <HiChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-opacity opacity-0 group-hover/slider:opacity-100 focus:outline-none z-10"
        aria-label="Next image"
      >
        <HiChevronRight className="w-4 h-4" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${idx === currentIdx ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
