import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

// Protected Route Gate
import ProtectedRoute from './ProtectedRoute'

// Customer Pages
import HomePage from '../pages/customer/HomePage'
import ServicesPage from '../pages/customer/ServicesPage'
import PackagesPage from '../pages/customer/PackagesPage'
import PackageDetailsPage from '../pages/customer/PackageDetailsPage'
import GalleryPage from '../pages/customer/GalleryPage'
import AboutPage from '../pages/customer/AboutPage'
import ContactPage from '../pages/customer/ContactPage'
import BookingPage from '../pages/customer/BookingPage'
import BookingSuccessPage from '../pages/customer/BookingSuccessPage'
import NotFoundPage from '../pages/customer/NotFoundPage'

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminPackagesPage from '../pages/admin/AdminPackagesPage'
import AdminGalleryPage from '../pages/admin/AdminGalleryPage'
import AdminBookingsPage from '../pages/admin/AdminBookingsPage'
import AdminTestimonialsPage from '../pages/admin/AdminTestimonialsPage'
import AdminServicesPage from '../pages/admin/AdminServicesPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Customer Routes under MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/success" element={<BookingSuccessPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      {/* Admin Protected Routes under AdminLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/packages" element={<AdminPackagesPage />} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
