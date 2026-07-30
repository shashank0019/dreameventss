import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { contactApi } from '../../api/contactApi'
import { getWhatsAppLink, getGeneralInquiryMessage } from '../../utils/whatsappHelper'

export default function WhatsAppButton() {
  const [number, setNumber] = useState('')

  useEffect(() => {
    contactApi.getContactInfo()
      .then((data) => {
        if (data && data.whatsappNumber) {
          setNumber(data.whatsappNumber)
        }
      })
      .catch(() => {
        // Fallback fallback default number
        setNumber('+15551234567')
      })
  }, [])

  if (!number) return null

  const whatsappUrl = getWhatsAppLink(number, getGeneralInquiryMessage())

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg cursor-pointer transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
        <span className="absolute w-full h-full rounded-full bg-emerald-500 opacity-20 animate-ping z-[-1]"></span>
      </motion.a>
    </motion.div>
  )
}
