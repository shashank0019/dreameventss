import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '../../utils/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-nav py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl tracking-wider font-semibold text-brand-500">
            DREAM EVENTS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm tracking-widest font-medium transition-colors uppercase ${
                  isActive 
                    ? 'text-brand-500 font-semibold' 
                    : 'text-dark-600 dark:text-dark-300 hover:text-brand-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
          
          {/* Theme Toggler */}
          <ThemeToggle />

          {/* Quick Book CTA Button */}
          <Link
            to="/booking"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs tracking-wider uppercase font-semibold transition-all shadow-sm shadow-brand-500/20"
          >
            Inquire Now
          </Link>
        </div>

        {/* Mobile menu controllers */}
        <div className="flex items-center md:hidden gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-dark-600 dark:text-dark-300 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-dark-800 rounded-xl transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-brand-100 dark:border-dark-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-3 px-4 rounded-xl text-sm font-medium tracking-wider uppercase transition-all ${
                      isActive 
                        ? 'bg-brand-500 text-white shadow-sm' 
                        : 'text-dark-600 dark:text-dark-300 hover:bg-brand-50 dark:hover:bg-dark-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link
                to="/booking"
                className="mt-4 w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-center text-xs tracking-widest uppercase font-semibold transition-all"
              >
                Inquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
