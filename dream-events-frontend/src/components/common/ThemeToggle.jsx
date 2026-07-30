import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { HiSun, HiMoon } from 'react-icons/hi2'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-brand-100 hover:bg-brand-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-brand-500 dark:text-brand-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <HiSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <HiMoon className="w-5 h-5" />
      )}
    </motion.button>
  )
}
