import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { contactApi } from '../../api/contactApi'
import { NAV_LINKS } from '../../utils/constants'

export default function Footer() {
  const [contact, setContact] = useState(null)

  useEffect(() => {
    contactApi.getContactInfo()
      .then((data) => setContact(data))
      .catch(() => {
        setContact({
          email: 'info@dreamevents.com',
          phone: '+1 (555) 123-4567',
          address: '456 Luxury Way, Design District, NY 10013',
          instagramUrl: 'https://instagram.com/dreamevents',
          facebookUrl: 'https://facebook.com/dreamevents',
          whatsappNumber: '+15551234567'
        })
      })
  }, [])

  return (
    <footer className="bg-dark-800 text-dark-300 dark:bg-black border-t border-dark-700/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl tracking-wider text-white">DREAM EVENTS</h3>
          <p className="text-sm text-dark-400 max-w-sm">
            Bespoke event styling and high-end decoration packages. We transform corporate events, weddings, and parties into breathtaking visuals.
          </p>
          <div className="flex gap-4 pt-2">
            {contact?.instagramUrl && (
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-dark-700 hover:bg-brand-500 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
            )}
            {contact?.facebookUrl && (
              <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-dark-700 hover:bg-brand-500 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
            )}
            {contact?.whatsappNumber && (
              <a href={`https://wa.me/${contact.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-dark-700 hover:bg-brand-500 hover:text-white transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-white">Explore</h4>
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm hover:text-brand-400 transition-colors py-1">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact info metadata */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-white">Get in Touch</h4>
          {contact && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-brand-400 w-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-brand-400 w-4" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-400 w-4 mt-1" />
                <span className="leading-relaxed">{contact.address}</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-dark-700/30 pt-8 text-center text-xs text-dark-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} DREAM EVENTS. Crafted for perfection. All rights reserved.</p>
        <Link to="/admin/login" className="hover:text-brand-400 transition-colors text-dark-400 font-medium">Owner Portal &rarr;</Link>
      </div>
    </footer>
  )
}
