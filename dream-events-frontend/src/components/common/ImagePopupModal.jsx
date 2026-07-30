import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiXMark } from 'react-icons/hi2'

export default function ImagePopupModal({ isOpen, imageUrl, caption, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[85vh] bg-transparent flex flex-col items-center justify-center z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            {/* Showcase Image */}
            <img
              src={imageUrl}
              alt={caption || 'Enlarged view'}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Caption */}
            {caption && (
              <p className="mt-4 text-center text-white/90 font-serif text-lg tracking-wide max-w-lg">
                {caption}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
