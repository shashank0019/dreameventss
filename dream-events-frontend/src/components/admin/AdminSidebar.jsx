import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-dark-800 text-white h-screen p-4 flex flex-col gap-4">
      <div className="font-serif text-lg border-b border-gray-700 pb-2">Dream Admin</div>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/packages">Packages</Link>
      <Link to="/admin/gallery">Gallery</Link>
      <Link to="/admin/bookings">Bookings</Link>
      <Link to="/admin/services">Services</Link>
      <Link to="/admin/testimonials">Testimonials</Link>
      <Link to="/admin/settings">Settings</Link>
    </aside>
  )
}
