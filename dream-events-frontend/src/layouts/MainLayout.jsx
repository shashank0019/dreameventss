import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-50 text-dark-800 dark:bg-dark-900 dark:text-dark-100 transition-colors duration-300">
      {/* Dynamic Glassmorphism Nav bar */}
      <Navbar />
      
      {/* Central Screen Body */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Premium Footer */}
      <Footer />
      
      {/* Sticky Floating WhatsApp Helper */}
      <WhatsAppButton />
    </div>
  )
}
