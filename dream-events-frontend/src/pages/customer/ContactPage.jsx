import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import { contactApi } from '../../api/contactApi'
import useFetch from '../../hooks/useFetch'
import { getWhatsAppLink, getGeneralInquiryMessage } from '../../utils/whatsappHelper'

export default function ContactPage() {
  const { data: contact, loading, error } = useFetch(contactApi.getContactInfo)

  const defaultContact = {
    email: 'bookings@dreamevents.com',
    phone: '+1 (555) 123-4567',
    address: '456 Luxury Way, Design District, NY 10013',
    whatsappNumber: '+15551234567',
    instagramUrl: 'https://instagram.com/dreamevents',
    facebookUrl: 'https://facebook.com/dreamevents',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617540455486!2d-73.98785312342345!3d40.74844047138307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
  }

  const activeContact = contact || defaultContact
  const waUrl = getWhatsAppLink(activeContact.whatsappNumber, getGeneralInquiryMessage())

  return (
    <>
      <SEO 
        title="Contact Our Design Team" 
        description="Connect with Dream Events designers. Find phone numbers, company emails, office locations, and dynamic Google maps directions." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionHeading 
            title="Let's Start Your Inquiry" 
            subtitle="Get In Touch" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Channels Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-white dark:bg-dark-800 p-8 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-sm space-y-8"
            >
              <h3 className="font-serif text-2xl text-dark-850 dark:text-brand-100 font-normal">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-100 dark:bg-dark-900 text-brand-500 rounded-xl mt-1">
                    <FaPhoneAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-dark-400 block">Phone Support</span>
                    <a href={`tel:${activeContact.phone}`} className="text-base font-semibold hover:text-brand-500 transition-colors">
                      {activeContact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-100 dark:bg-dark-900 text-brand-500 rounded-xl mt-1">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-dark-400 block">Email Us</span>
                    <a href={`mailto:${activeContact.email}`} className="text-base font-semibold hover:text-brand-500 transition-colors">
                      {activeContact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-100 dark:bg-dark-900 text-brand-500 rounded-xl mt-1">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-dark-400 block">Office Address</span>
                    <p className="text-sm text-dark-600 dark:text-dark-300 font-light leading-relaxed">
                      {activeContact.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-brand-100 dark:border-dark-700/50 flex gap-4">
                {activeContact.instagramUrl && (
                  <a href={activeContact.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-brand-100 hover:bg-brand-500 hover:text-white dark:bg-dark-900 dark:hover:bg-brand-500 transition-colors text-dark-600 dark:text-brand-300">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
                {activeContact.facebookUrl && (
                  <a href={activeContact.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-brand-100 hover:bg-brand-500 hover:text-white dark:bg-dark-900 dark:hover:bg-brand-500 transition-colors text-dark-600 dark:text-brand-300">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                )}
                {activeContact.whatsappNumber && (
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-brand-100 hover:bg-brand-500 hover:text-white dark:bg-dark-900 dark:hover:bg-brand-500 transition-colors text-dark-600 dark:text-brand-300">
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Redirection CTA */}
              <div className="pt-4">
                <Link
                  to="/booking"
                  className="w-full block py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-center text-xs tracking-widest uppercase font-semibold transition-all shadow-md shadow-brand-500/10"
                >
                  Submit Booking Request
                </Link>
              </div>

            </motion.div>

            {/* Google Maps Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 bg-white dark:bg-dark-800 p-4 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-sm h-[450px]"
            >
              {activeContact.googleMapsEmbedUrl ? (
                <iframe
                  title="Office Location Map"
                  src={activeContact.googleMapsEmbedUrl}
                  className="w-full h-full rounded-2xl border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full bg-brand-100 dark:bg-dark-900 rounded-2xl flex items-center justify-center text-dark-400">
                  Map coordinates not configured.
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </div>
    </>
  )
}
