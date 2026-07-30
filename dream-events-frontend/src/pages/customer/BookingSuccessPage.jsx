import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaWhatsapp, FaHome, FaImages } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import { contactApi } from '../../api/contactApi'
import { getWhatsAppLink, getGeneralInquiryMessage } from '../../utils/whatsappHelper'

export default function BookingSuccessPage() {
  const [whatsappNumber, setWhatsappNumber] = useState('')

  useEffect(() => {
    contactApi.getContactInfo()
      .then((data) => {
        if (data && data.whatsappNumber) setWhatsappNumber(data.whatsappNumber)
      })
      .catch(() => setWhatsappNumber('+15551234567'))
  }, [])

  const waUrl = getWhatsAppLink(whatsappNumber, getGeneralInquiryMessage())

  return (
    <>
      <SEO 
        title="Booking Request Successful" 
        description="Your event decoration booking request has been received. We will respond shortly." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="glass-card p-8 md:p-12 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-lg bg-white/80 dark:bg-dark-800/80 space-y-6"
          >
            {/* Victory Badge icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block text-emerald-500 mb-2"
            >
              <FaCheckCircle className="w-16 h-16 mx-auto" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
                Request Submitted!
              </h1>
              <p className="text-sm text-dark-500 dark:text-dark-300 font-light leading-relaxed">
                Thank you for choosing Dream Events. Our design team is reviewing your event date, theme requests, and setup requirements.
              </p>
            </div>

            <p className="text-xs text-brand-500 dark:text-brand-300 font-semibold tracking-wider uppercase bg-brand-100 dark:bg-dark-900 py-2.5 px-4 rounded-xl">
              An email confirmation has been sent
            </p>

            {/* Quick Actions List */}
            <div className="pt-6 border-t border-brand-100 dark:border-dark-700/50 space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10"
              >
                <FaWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/"
                  className="py-3 bg-brand-100 hover:bg-brand-200 dark:bg-dark-900 dark:hover:bg-dark-750 text-brand-600 dark:text-brand-300 rounded-xl font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <FaHome className="w-3.5 h-3.5" />
                  Home
                </Link>
                <Link
                  to="/gallery"
                  className="py-3 bg-brand-100 hover:bg-brand-200 dark:bg-dark-900 dark:hover:bg-dark-750 text-brand-600 dark:text-brand-300 rounded-xl font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <FaImages className="w-3.5 h-3.5" />
                  Gallery
                </Link>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </>
  )
}
