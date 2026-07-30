import React from 'react'
import { Link } from 'react-router-dom'
import { bookingApi } from '../../api/bookingApi'
import useFetch from '../../hooks/useFetch'
import { formatPrice, formatDate } from '../../utils/formatters'
import { BOOKING_STATUSES } from '../../utils/constants'
import { HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineFolderOpen, HiOutlineInboxStack } from 'react-icons/hi2'

export default function AdminDashboardPage() {
  const { data: stats, loading, error } = useFetch(bookingApi.getDashboardStats)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-dark-850 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 dark:bg-dark-850 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12 text-rose-500 font-light">
        Failed to load dashboard metrics. Check connection.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div>
        <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
          Dashboard Overview
        </h1>
        <p className="text-xs text-dark-400 mt-1">Real-time statistics for Dream Events.</p>
      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-brand-100 dark:border-dark-700/50 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-dark-400 uppercase font-semibold block">Total Revenue</span>
            <span className="text-2xl font-serif text-brand-500 font-normal">
              {formatPrice(stats.totalRevenue)}
            </span>
          </div>
          <div className="p-3 bg-brand-50 dark:bg-dark-900 text-brand-500 rounded-xl">
            <HiOutlineCurrencyDollar className="w-6 h-6" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-brand-100 dark:border-dark-700/50 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-dark-400 uppercase font-semibold block">Total Bookings</span>
            <span className="text-2xl font-serif text-dark-800 dark:text-brand-100 font-normal">
              {stats.totalBookings}
            </span>
          </div>
          <div className="p-3 bg-brand-50 dark:bg-dark-900 text-brand-500 rounded-xl">
            <HiOutlineInboxStack className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-brand-100 dark:border-dark-700/50 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-dark-400 uppercase font-semibold block">Pending Requests</span>
            <span className="text-2xl font-serif text-amber-500 font-normal">
              {stats.pendingBookings}
            </span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-xl">
            <HiOutlineCalendar className="w-6 h-6" />
          </div>
        </div>

        {/* Total Packages */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-brand-100 dark:border-dark-700/50 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-dark-400 uppercase font-semibold block">Active Packages</span>
            <span className="text-2xl font-serif text-dark-800 dark:text-brand-100 font-normal">
              {stats.totalPackages}
            </span>
          </div>
          <div className="p-3 bg-brand-50 dark:bg-dark-900 text-brand-500 rounded-xl">
            <HiOutlineFolderOpen className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-brand-100 dark:border-dark-700/50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-lg text-dark-850 dark:text-brand-100 font-normal">Recent Requests</h3>
          <Link to="/admin/bookings" className="text-xs text-brand-500 hover:text-brand-600 font-semibold uppercase tracking-wider">
            View All &rarr;
          </Link>
        </div>

        {stats.recentBookings && stats.recentBookings.length === 0 ? (
          <div className="text-center py-8 text-dark-400 text-sm">
            No booking requests have been received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 dark:border-dark-700/50 text-dark-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Package</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100/50 dark:divide-dark-700/50">
                {stats.recentBookings?.map((booking) => {
                  const statusInfo = BOOKING_STATUSES[booking.status] || { label: booking.status, color: 'bg-gray-100 text-gray-800' }
                  return (
                    <tr key={booking.id} className="text-dark-750 dark:text-dark-250">
                      <td className="py-4.5">
                        <div className="font-medium">{booking.clientName}</div>
                        <div className="text-xs text-dark-400 mt-0.5">{booking.email}</div>
                      </td>
                      <td className="py-4.5">{formatDate(booking.eventDate)}</td>
                      <td className="py-4.5">{booking.packageName}</td>
                      <td className="py-4.5">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4.5 text-right">
                        <Link
                          to="/admin/bookings"
                          className="text-xs text-brand-500 hover:text-brand-600 font-semibold"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
