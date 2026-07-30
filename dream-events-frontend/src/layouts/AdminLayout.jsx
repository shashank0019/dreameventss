import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Content wrapper */}
      <div className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <AdminNavbar />
        
        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
