import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { bookingApi } from '../../api/bookingApi'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { useToast } from '../../components/common/ToastProvider'
import { formatDate, formatDateTime } from '../../utils/formatters'
import { BOOKING_STATUSES } from '../../utils/constants'
import Pagination from '../../components/common/Pagination'
import ImagePopupModal from '../../components/common/ImagePopupModal'
import { HiCheck, HiXMark, HiMagnifyingGlass, HiEye, HiOutlineTrash } from 'react-icons/hi2'

export default function AdminBookingsPage() {
  const { showSuccess, showError } = useToast()
  
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const { page, size, setPage, goToPage } = usePagination(0, 8)

  const [bookings, setBookings] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeZoomImg, setActiveZoomImg] = useState(null)

  const fetchBookings = () => {
    setLoading(true)
    const params = {
      page,
      size,
      status: status || undefined,
      search: debouncedSearch || undefined
    }

    bookingApi.getBookings(params)
      .then((data) => {
        setBookings(data.content || [])
        setTotalPages(data.totalPages || 0)
      })
      .catch((err) => {
        showError(err.message || 'Failed to fetch bookings list.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchBookings()
  }, [page, size, status, debouncedSearch])

  useEffect(() => {
    goToPage(0)
  }, [status, debouncedSearch])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await bookingApi.updateStatus(id, newStatus)
      showSuccess(`Booking status set to ${newStatus.toLowerCase()}.`)
      fetchBookings()
    } catch (err) {
      showError(err.message || 'Failed to update status.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking request?')) return
    try {
      await bookingApi.deleteBooking(id)
      showSuccess('Booking request deleted.')
      fetchBookings()
    } catch (err) {
      showError(err.message || 'Failed to delete booking request.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
            Bookings Manager
          </h1>
          <p className="text-xs text-dark-400 mt-1">Manage, approve, and filter client requests.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-dark-800 p-4 rounded-2xl border border-brand-100 dark:border-dark-700/50 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search name, phone, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-brand-200 dark:border-dark-700/60 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
          />
          <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 w-4 h-4" />
        </div>

        {/* Status selector */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-brand-200 dark:border-dark-700/60 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-brand-100 dark:border-dark-700/50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center animate-pulse text-dark-400">Loading bookings list...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-dark-400 text-sm font-light">
            No booking requests match your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
              <thead>
                <tr className="border-b border-brand-100 dark:border-dark-700/50 text-dark-400 text-xs uppercase tracking-wider font-semibold bg-gray-50 dark:bg-dark-900/55">
                  <th className="py-4 px-6 font-medium">Client Info</th>
                  <th className="py-4 px-6 font-medium">Date & Guests</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Package</th>
                  <th className="py-4 px-6 font-medium">Reference</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100/50 dark:divide-dark-700/50">
                {bookings.map((booking) => {
                  const statusInfo = BOOKING_STATUSES[booking.status] || { label: booking.status, color: 'bg-gray-100 text-gray-800' }
                  return (
                    <tr key={booking.id} className="text-dark-750 dark:text-dark-250 align-top">
                      
                      {/* Client */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-dark-900 dark:text-brand-100">{booking.clientName}</div>
                        <div className="text-xs text-dark-400 mt-0.5">{booking.email}</div>
                        <div className="text-xs text-dark-400 mt-0.5">{booking.phone}</div>
                      </td>

                      {/* Date & Guests */}
                      <td className="py-4 px-6">
                        <div className="font-medium">{formatDate(booking.eventDate)}</div>
                        <div className="text-xs text-dark-400 mt-0.5">{booking.guestCount} guests</div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-xs md:text-sm">
                        <div className="line-clamp-2 max-w-[150px]">{booking.location}</div>
                      </td>

                      {/* Package details */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-dark-900 dark:text-brand-200">{booking.packageName}</div>
                        {booking.customNotes && (
                          <div className="text-xs text-dark-400 mt-1 max-w-[180px] line-clamp-2" title={booking.customNotes}>
                            Notes: {booking.customNotes}
                          </div>
                        )}
                      </td>

                      {/* Image Reference */}
                      <td className="py-4 px-6">
                        {booking.referenceImageUrl ? (
                          <button
                            onClick={() => setActiveZoomImg({ imageUrl: booking.referenceImageUrl, caption: `Reference Image from ${booking.clientName}` })}
                            className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-dark-900 text-brand-500 border border-brand-200 dark:border-dark-700 flex items-center gap-1 text-xs"
                          >
                            <HiEye className="w-3.5 h-3.5" /> Preview
                          </button>
                        ) : (
                          <span className="text-xs text-dark-400">None</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1">
                        {booking.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'APPROVED')}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg inline-flex"
                            title="Approve Booking"
                          >
                            <HiCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {booking.status === 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                            className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg inline-flex"
                            title="Mark as Completed"
                          >
                            <HiCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                            className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg inline-flex"
                            title="Cancel Booking"
                          >
                            <HiXMark className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg inline-flex"
                          title="Delete Request"
                        >
                          <HiOutlineTrash className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Lightbox for reference uploads */}
      <ImagePopupModal
        isOpen={!!activeZoomImg}
        imageUrl={activeZoomImg?.imageUrl}
        caption={activeZoomImg?.caption}
        onClose={() => setActiveZoomImg(null)}
      />
    </div>
  )
}
